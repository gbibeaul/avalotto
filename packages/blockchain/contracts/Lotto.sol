pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Lotto {
  struct LastDraw {
    address [] winners;
    uint256 jackpot;
    uint256 drawTime;
    uint256[3] numbers;
    bytes32 sealedSeed;
  }

  // administration
  address trustedParty;
  address payable treasury;  

  uint256 jackpot;

  // information about current state
  bytes32 sealedSeed;
  bool seedSet = false;
  bool betsClosed = false;
  uint256 storedBlockNumber;

  // information about last draw
  LastDraw lastDraw;
  
  mapping (uint256 => address[]) bets;
  event Draw (uint256[3] numbers);

  /**
    * @dev Sets who is the initial trusted party. This is the party responsible for placing the seed. They are not able to bet for draws.
   */
  constructor(address _trustedParty, address payable _treasury) {
    trustedParty = _trustedParty;
    treasury = _treasury;
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
    require(!betsClosed, 'Bets are closed');
    _;
  }

  /**
    * @dev Modifier to be added to any function only to be taken by the trusted party
   */
  modifier betsClosedActions() {
    require(msg.sender == trustedParty, "This action can only be taken when the bets are closed");
    require(betsClosed, 'Bets are not closed');
    _;
  }


 /**
  PUBLIC GETTERS
  */
  function getLastDraw() public view returns (LastDraw memory) {
    return lastDraw;
  }

  function getLastDrawNumbers() public view returns (uint256[3] memory) {
    return lastDraw.numbers;
  }

  function getAmountOfBetForNumbers(uint256[3] memory _numbers) public view returns (uint256) {
    return bets[uint256(keccak256(abi.encodePacked(_numbers)))].length;
  }



/**
    PAYOUT ACTIONS
 */ 
  function payoutAllWinners(uint256 amount) public betsClosedActions {
    for (uint256 i = 0; i < bets[uint256(keccak256(abi.encodePacked(lastDraw.numbers)))].length; i++) {
      payable(bets[uint256(keccak256(abi.encodePacked(lastDraw.numbers)))][i]).transfer(amount);
    }
  }

  function payTreasury(uint256 amount) public betsClosedActions {
    treasury.transfer(amount);
  }


/**
    BETTING ACTIONS
 */ 
  function bet(uint256[3] memory _numbers) public payable betsOpened {
    require(msg.value == 1 ether, "Bet must be 1 avax");
    require(_numbers[0] != _numbers[1] && _numbers[0] != _numbers[2] && _numbers[1] != _numbers[2], "Each number must be unique");
    require(_numbers[0] >= 0 && _numbers[0] <= 99, "Number 1 must be between 0 and 99");
    require(_numbers[1] >= 0 && _numbers[1] <= 99, "Number 2 must be between 0 and 99");
    require(_numbers[2] >= 0 && _numbers[2] <= 99, "Number 3 must be between 0 and 99");

    jackpot += msg.value;
    bets[uint256(keccak256(abi.encodePacked(_numbers)))].push(msg.sender);
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
  function getDigit(uint256 _number, uint256 _index) private pure returns (uint256) {
    if(_index == 0) {
      return _number % 10;
    } 
    return ((_number % 10 ** (_index + 1)) / (10 ** _index)) | 0;
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



  function _getLotteryResults(uint _random) private pure returns (uint256[3] memory) {
    uint256 _currentIndex = 0;

    uint256 _num1 = (getDigit(_random, _currentIndex) * 10) + getDigit(_random, _currentIndex + 1);
    _currentIndex += 2;
    uint256 _num2 = (getDigit(_random, _currentIndex) * 10) + getDigit(_random, _currentIndex + 1);
    _currentIndex += 2;
    while(_num1 == _num2) {
      _num2 = (getDigit(_random, _currentIndex) * 10) + getDigit(_random, _currentIndex + 1);
      _currentIndex += 2;
    }
    uint256 _num3 = (getDigit(_random, _currentIndex) * 10) + getDigit(_random, _currentIndex + 1);
    while(_num3 == _num1 || _num3 == _num2) {
      _num3 = (getDigit(_random, _currentIndex) * 10) + getDigit(_random, _currentIndex + 1);
    }
    return [_num1, _num2, _num3];
  } 

  function _executePayment() public onlyTrustedParty {
    payTreasury(jackpot / 20);
    payoutAllWinners((jackpot / 20) * 19);

  }


  function reveal(bytes32 _seed) public onlyTrustedParty {
    require(seedSet);
    require(storedBlockNumber < block.number);
    require(_seed == sealedSeed);

    uint256 random = uint256(
      keccak256(abi.encodePacked(_seed, blockhash(storedBlockNumber)))
    );

    lastDraw.numbers = _getLotteryResults(random);
    lastDraw.sealedSeed = _seed;
    lastDraw.jackpot = jackpot;
    lastDraw.winners = bets[uint256(keccak256(abi.encodePacked(lastDraw.numbers)))];
    jackpot = 0;


    emit Draw(lastDraw.numbers);

    seedSet = false;
    betsClosed = false;
  }


}
