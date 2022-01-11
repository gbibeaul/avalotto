pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./GamebitAuthorizations.sol";

contract Treasury {
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
            gamebitAuth.isAuthorizedGame(msg.sender),
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
        require(msg.value >= _amount, "Not enough funds");
        _;
    }

    function getFunds() public view returns (uint256) {
        return address(this).balance;
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
        msgValue(_amount)
    {
        treasuryFunds += _profits;
        authorizedGameFunds[msg.sender] += _amount;
        emit ProfitTaken(ProfitType.PLAY_FEE, _profits, msg.sender);
        // todo call distributeGamingIncentive
    }

    /**
        This allows a contract to distribute the winnings of a single bet
        @notice The games need to be previously authorized to act on behalf of the treasury. Treasury profits were taken on acceptPlay
     */
    function distributePlayWinnings(uint256 _winning, address payable _winner)
        public
        authForPlay
        approvedGame
        enoughGameFunds(_winning)
    {
        _winner.transfer(_winning);
        authorizedGameFunds[msg.sender] -= _winning;
    }

    /**
        Allows a game to send funds when it's in a session. Profits are sent the session ends.
        @notice this is a security risk. We'll need to implement security in the infra to limit game sessions to a time limit or something.
     */
    function takeGameSessionBet(uint256 _bet) public payable authForGameSession approvedGame msgValue(_bet) {
        authorizedGameFunds[msg.sender] += _bet;
    }

        /**
        This allows a contract to distribute the profits from a play session. 
        @notice The games need to be previously authorized to act on behalf of the treasury

     */
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

    // GAMEBIT FUNCTIONS 

    /**
        @dev This will allow the infrastructure to pay the treasury for oracle and rng requests
     */

    function receiveRngPayment() public payable approvedGame {
        treasuryFunds += rngFee;
        emit ProfitTaken(ProfitType.RNG_FEE, rngFee, msg.sender);
    }

    function receiveOraclePayment(address _game) public payable {
        treasuryFunds += rngFee;
        emit ProfitTaken(ProfitType.ORACLE_FEE, rngFee, _game);
    }
}

interface ITreasury {
    function getFundsAVAXAmount() external view returns (uint256);

    function receiveRngPayment() external payable;

    function sendAvax(
        uint256 _amount,
        address payable _sendTo,
        string calldata _assetType
    ) external returns (bool);

    function takeGameSessionBet(uint256 _bet) external payable;

    function payGameSessionWinnings(
        uint256 _winning,
        uint256 _profits,
        address payable _winner
    ) external payable returns (bool);

    function acceptPlay(uint256 _amount, uint256 _profits)
        external
        payable
        returns (bool);

    function distributePlayWinnings(uint256 _winning, address payable _winner)
        external
        returns (bool);
}
