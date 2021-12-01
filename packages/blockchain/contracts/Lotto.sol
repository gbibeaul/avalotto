pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Lotto {
  struct LastDraw {
    address[] winners;
    uint256[3] numbers;
    uint jackpot;
    bytes32 sealedSeed;
  }
  bytes32 sealedSeed;
  bool seedSet = false;
  bool betsClosed = false;
  uint256 storedBlockNumber;
  address trustedParty;
  LastDraw lastDraw;
  
  mapping (uint256 => address[]) bets;
  event Draw (uint256[3] numbers);

  /**
    * @dev Sets who is the initial trusted party. This is the party responsible for placing the seed. They are not able to bet for draws.
   */
  constructor(address _trustedParty) {
    trustedParty = _trustedParty;
  }

  /** 
    * @dev Modifier used to ensure actions are taken by the trusted party
   */
  modifier onlyTrustedParty() {
    require(msg.sender == trustedParty);
    _;
  }

  modifier betsOpend() {
    require(!betsClosed);
    _;
  }

  function getLastDraw() public view returns (LastDraw memory) {
    return lastDraw;
  }

  function getLastDrawNumbers() public view returns (uint256[3] memory) {
    return lastDraw.numbers;
  }



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


  function reveal(bytes32 _seed) public onlyTrustedParty {
    require(seedSet);
    require(storedBlockNumber < block.number);
    require(_seed == sealedSeed);

    uint256 random = uint256(
      keccak256(abi.encodePacked(_seed, blockhash(storedBlockNumber)))
    );
    seedSet = false;
    betsClosed = false;

    lastDraw.numbers = _getLotteryResults(random);
    lastDraw.sealedSeed = _seed;
    lastDraw.jackpot = 0;

    emit Draw(lastDraw.numbers);
  }

}
