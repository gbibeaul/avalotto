/**
 * This is the exact same contract as Lotto.sol with the exception that the winner of the draw is hardcoded to be 1,2,3
 * This contract is never meant to be used in production, it is only meant to be used for testing purposes.
 */

interface ITreasury {
    function payWinnings(uint256 _amount, address payable _winner, string calldata _assetType) external returns (bool);
}
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract LottoWinnerMock {
    // administration
    address trustedParty;
    address payable treasury;

    uint256 jackpot;
    uint256 ticketValue;
    uint256 amountOfDraws = 0;
    uint256 nextDraw;

    // information about current state
    bytes32 sealedSeed;
    bool seedSet = false;
    bool betsClosed = false;
    bool winnerFound = false;

    uint256 storedBlockNumber;

    // bets are stored as the uint256 representation of their keccak256 uint256(keccak256(abi.encodePacked(_numbers)))
    mapping(uint256 => address[]) bets;
    mapping(address => uint256[][]) playerBets;
    mapping(uint256 => uint256[3]) previousDraws;

    uint256[] placedBets = new uint256[](0);

    event Draw(uint256[3] numbers);
    event jackpotUpdated(uint256 jackpot);

    /**
     * @dev Sets who is the initial trusted party. This is the party responsible for placing the seed. They are not able to bet for draws.
     */
    constructor(
        address _trustedParty,
        address payable _treasury,
        uint256 _ticketValue
    ) {
        trustedParty = _trustedParty;
        treasury = _treasury;
        ticketValue = _ticketValue;
        nextDraw = block.timestamp + 1 weeks;
    }

    /**
     * @dev Modifier used to ensure actions are taken by the trusted party
     */
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
  PUBLIC GETTERS
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
    PAYOUT ACTIONS
 */
    function payoutAllWinners(uint256 amount, uint256 hashedWinners)
        public
        betsClosedActions
        onlyTrustedParty
    {
        for (
            uint256 i = 0;
            i < bets[bets[hashedWinners].length - 1].length;
            i++
        ) {
            payable(bets[bets[hashedWinners].length - 1][i]).transfer(amount);
        }
    }

    function payTreasury(uint256 amount) public betsClosedActions {
        treasury.transfer(amount);
    }

    /**
    BETTING ACTIONS
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

        console.log(treasury);

        treasury.transfer(msg.value);
        jackpot += (msg.value - (msg.value / 30));

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

    /**
    lOTTERY ACTRIONS
 */

    /**
     * @dev Function that grabs mathematically a digit at index from a uint256.
     * @param _number _number The value to grab the digit from
     * @param _index _index The index of the digit to grab
     * @return uint256 The digit at index
     * @notice This function is a helper to generate loto numbers
     */
    function getDigit(uint256 _number, uint256 _index)
        private
        pure
        returns (uint256)
    {
        if (_index == 0) {
            return _number % 10;
        }
        return ((_number % 10**(_index + 1)) / (10**_index)) | 0;
    }

    /**
     * @param _sealedSeed The seed to use for the next draw
     * @notice This function is used to set the seed for the next draw. It is only available to the trusted party.
     * once the seed is set, bets are closed to ensure fairness. We store the block number + one as later we will use this block's hash to generate pseudo random numbers.
     * block number + 1 ensures is used as a level of enthropy, ensuring the trusted party can't predict the next draw.
     */
    function setSealedSeed(bytes32 _sealedSeed) public onlyTrustedParty {
        require(!seedSet);
        require(!betsClosed);
        betsClosed = true;
        sealedSeed = _sealedSeed;
        storedBlockNumber = block.number + 1;
        seedSet = true;
    }

    /**
     * this function is mocked. Never use it in this state in a live contract on mainnet
     */
    function _getLotteryResults() private pure returns (uint256[3] memory) {
        return [uint256(1), uint256(2), uint256(3)];
    }

    function reveal(bytes32 _seed)
        public
        onlyTrustedParty
        returns (uint256[3] memory)
    {
        require(seedSet);
        require(storedBlockNumber < block.number);
        require(_seed == sealedSeed);

        // uint256 random = uint256(
        //     keccak256(abi.encodePacked(_seed, blockhash(storedBlockNumber)))
        // );

        uint256[3] memory _drawNumbers = _getLotteryResults();

        previousDraws[amountOfDraws] = _drawNumbers;
        amountOfDraws++;
        emit Draw(_drawNumbers);

        winnerFound =
            bets[uint256(keccak256(abi.encodePacked(_drawNumbers)))].length > 0;

        if (winnerFound) {
            uint256 _numberOfWinners = bets[
                uint256(keccak256(abi.encodePacked(_drawNumbers)))
            ].length;

            // the rest of the jackpot is divided equally among the winners
            uint256 _amountForEachWinner = jackpot / _numberOfWinners;

            for (uint256 i = 0; i < _numberOfWinners; i++) {
                address winner = bets[
                    uint256(keccak256(abi.encodePacked(_drawNumbers)))
                ][i];
                ITreasury(treasury).payWinnings(
                    _amountForEachWinner,
                    payable(winner),
                    "AVAX"
                );
            }

            jackpot = 0;
            return _drawNumbers;
        }

        seedSet = false;
        betsClosed = false;
        nextDraw = block.number + 1 weeks;

        return _drawNumbers;
    }
}
