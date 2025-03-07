pragma solidity ^0.8.0;

import "../Authorization/IGamebitAuthorizations.sol";

contract GamebitTreasury {
    uint256 rngFee;
    uint256 treasuryFunds;
    IGamebitAuthorization gamebitAuth;
    mapping(address => bool) authorizedGames;
    mapping(address => uint256) authorizedGameFunds;
    event GameFundsReceived(address _game, uint256 _amount);
    event GameBalanceChanged(address _game, uint256 _amount);
    event ProfitTaken(ProfitType _type, uint256 _amount, address _game);

    /**
        RNG => simple fee for requesting an RNG
        ORACLE => fee for requesting an oracle API call
        GAME_SESSION_FEE => Good for games session like poker hands, dice, etc. Game fee is paid at the end of the session.
        PLAY_FEE => Fee for a 1 time action in a game, attack, buy lotto ticket, NFT scratch etc.
        PROTOCOL_FEE => Fee for adding games or such to the protocol. Misc fee.
     */

    enum ProfitType {
        RNG_FEE,
        ORACLE_FEE,
        GAME_SESSION_FEE,
        PLAY_FEE,
        PROTOCOL_FEE
    }

    constructor(address _gamebitAuthorizations, uint256 _rngFee) {
        rngFee = _rngFee;
        gamebitAuth = IGamebitAuthorization(_gamebitAuthorizations);
    }

    modifier approvedGame() {
        require(
            gamebitAuth.isGameAuthorized(msg.sender),
            "Only Gamebit approved contract can use this action"
        );
        _;
    }

    modifier authForPlay() {
        require(
            gamebitAuth.isGamePlayProfitAuthorized(msg.sender),
            "This contract is not authorized to accept plays"
        );
        _;
    }

    modifier authForGameSession() {
        require(
            gamebitAuth.isGameGameProfitAuthorized(msg.sender),
            "This contract is not authorized to start game sessions"
        );
        _;
    }

    modifier staffOrGovernance() {
        require(
            gamebitAuth.isStaffOrGovApproved(msg.sender),
            "Only staff or governance can use this action"
        );
        _;
    }

    modifier enoughGameFunds(uint256 _amount) {
        require(
            authorizedGameFunds[msg.sender] >= _amount,
            "This game does not have enough funds"
        );
        _;
    }

    modifier meetsProfiThreshold(uint256 _amount) {
        require(
            gamebitAuth.isAmountEnoughProfit(msg.sender, _amount),
            "This profit does not meet the threshold agreed upon"
        );
        _;
    }

    modifier msgValue(uint256 _amount) {
        require(msg.value < _amount, "Not enough funds");
        _;
    }

    function getFunds() public view returns (uint256) {
        return address(this).balance;
    }

    function getGameFunds(address _game) public view returns (uint256) {
        return authorizedGameFunds[_game];
    }

    // INTERNAL FUNCTIONS

    // todo hook up games sending the token to players on plays and game sessions
    function distributeGamingIncentive() internal {}

    // STAFF FUNCTIONS

    /**
        @dev allows the treasury to initiate an external payment when initiated by the staff or governance
     */
    function pay(uint256 _amount, address payable _sendTo)
        public
        staffOrGovernance
        returns (bool)
    {
        require(_amount > 0, "amount must be over 0");
        _sendTo.transfer(_amount);
        return true;
    }

    // GAME FUNCTIONS

    // authForPlay
    // approvedGame

    /**
        This allows a contract to send a play/bet to the treasury. 
        @notice The profits are taken on the bet, not on the jackpot of a session. Contracts call distributePlayWinnings to pay winners
     */
    function acceptPlay(uint256 _amount, uint256 _profits)
        public
        payable
        authForPlay
        approvedGame
        meetsProfiThreshold(_amount)
        msgValue(_amount + _profits)
        returns (bool)
    {
        treasuryFunds += _profits;
        authorizedGameFunds[msg.sender] += _amount;
        emit ProfitTaken(ProfitType.PLAY_FEE, _profits, msg.sender);
        return true;
        // todo call distributeGamingIncentive
    }

    function distributePlayWinnings(uint256 _winning, address payable _winner)
        public
        authForPlay
        approvedGame
        enoughGameFunds(_winning)
    {
        _winner.transfer(_winning);
        authorizedGameFunds[msg.sender] -= _winning;
    }

    function takeGameSessionBet(uint256 _bet)
        public
        payable
        authForGameSession
        approvedGame
        msgValue(_bet)
    {
        authorizedGameFunds[msg.sender] += _bet;
    }

    function payGameSessionWinnings(
        uint256 _winning,
        uint256 _profits,
        address payable _winner
    )
        public
        payable
        authForGameSession
        approvedGame
        enoughGameFunds(_winning + _profits)
        meetsProfiThreshold(_profits)
        msgValue(_winning + _profits)
    {
        treasuryFunds += _profits;
        _winner.transfer(_winning);
        authorizedGameFunds[msg.sender] -= _winning + _profits;
        // todo call distributeGamingIncentive
        emit ProfitTaken(ProfitType.GAME_SESSION_FEE, _profits, msg.sender);
    }

    function receiveRngPayment() public payable approvedGame {
        // TODO: URGENT GB DECREASE GAME FUNDS
        treasuryFunds += rngFee;
        authorizedGameFunds[msg.sender] -= rngFee;
        emit ProfitTaken(ProfitType.RNG_FEE, rngFee, msg.sender);
    }

    function receiveOraclePayment(address _game) public payable {
        treasuryFunds += rngFee;
        authorizedGameFunds[msg.sender] -= rngFee;
        emit ProfitTaken(ProfitType.ORACLE_FEE, rngFee, _game);
    }
}
