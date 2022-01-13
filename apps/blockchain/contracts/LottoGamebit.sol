pragma solidity ^0.8.10;

import "./Infra.sol";
import "./Game.sol";

contract LottoGamebit is Game {
    address trustedParty;
    uint256 jackpot;
    uint256 ticketValue;
    uint256 amountOfDraws = 0;
    uint256 nextDraw;
    uint256 protocolFeePercen;

    bool betsClosed = false;
    bool winnerFound = false;

    // bets are stored as the uint256 representation of their keccak256 uint256(keccak256(abi.encodePacked(_numbers)))
    mapping(uint256 => address[]) bets;
    mapping(address => uint256[][]) playerBets;
    mapping(uint256 => uint256[3]) previousDraws;

    uint256[] placedBets = new uint256[](0);

    event Draw(uint256[3] numbers);
    event jackpotUpdated(uint256 jackpot);

    constructor(
        address _treasury,
        address _gamitAuth,
        address _gamebitInfra,
        address _trustedParty,
        uint256 _ticketValue,
        uint256 _drawDaysInterval,
        uint256 _protocolFeePercen
    ) Game(_treasury, _gamitAuth, _gamebitInfra) {
        trustedParty = _trustedParty;
        ticketValue = _ticketValue;
        nextDraw = block.timestamp + (_drawDaysInterval * 1 days);
        protocolFeePercen = _protocolFeePercen;
    }

    modifier onlyTrustedParty() {
        require(msg.sender == trustedParty);
        _;
    }

    /**
     * @dev modifier to be added to any action taken by a better party
     */
    modifier betsOpened() {
        require(msg.sender != trustedParty, "Trusted party can't bet");
        require(!betsClosed, "Bets are closed");
        _;
    }

    /**
     * @dev Modifier to be added to any function only to be taken by the trusted party
     */
    modifier betsClosedActions() {
        require(
            msg.sender == trustedParty,
            "This action can only be taken when the bets are closed"
        );
        require(betsClosed, "Bets are not closed");
        _;
    }

    /**
     * PUBLIC GETTERS
     */
    function getLastDrawNumbers() public view returns (uint256[3] memory) {
        return previousDraws[amountOfDraws - 1];
    }

    function getAmountOfBetForNumbers(uint256[3] memory _numbers)
        public
        view
        returns (uint256)
    {
        return bets[uint256(keccak256(abi.encodePacked(_numbers)))].length;
    }

    function getCurrentJackpot() public view returns (uint256) {
        return jackpot;
    }

    function getBets() public view returns (uint256[][] memory) {
        return playerBets[msg.sender];
    }

    function getNextDrawTime() public view returns (uint256) {
        return nextDraw;
    }

    function getTicketPrice() public view returns (uint256) {
        return ticketValue;
    }

    /**
     * BETTING ACTIONS
     */
    function bet(uint256[][] memory _bets) public payable betsOpened {
        require(
            msg.value / _bets.length == ticketValue,
            "Bet not the right value avax"
        );
        // loop on each bet to validate it
        for (uint256 i = 0; i < _bets.length; i++) {
            require(_bets[i].length == 3, "Each bet must have 3 numbers");
            require(
                _bets[i][0] < 100 && _bets[i][0] >= 0,
                "Number 1 must be between 0 and 99"
            );
            require(
                _bets[i][1] < 100 && _bets[i][1] >= 0,
                "Number 2 must be between 0 and 99"
            );
            require(
                _bets[i][2] < 100 && _bets[i][2] >= 0,
                "Number 3 must be between 0 and 99"
            );
        }

        treasury.transfer(msg.value);
        uint256 fee = (msg.value * protocolFeePercen) / 100;
        jackpot += msg.value - fee;

        // loop on each bet to store it
        for (uint256 i = 0; i < _bets.length; i++) {
            placedBets.push(uint256(keccak256(abi.encodePacked(_bets[i]))));
            playerBets[msg.sender].push(_bets[i]);
            bets[uint256(keccak256(abi.encodePacked(_bets[i])))].push(
                msg.sender
            );
        }

        emit jackpotUpdated(jackpot);
    }
}
