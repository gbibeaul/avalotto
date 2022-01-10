pragma solidity ^0.8.10;

import "./GambitAuthorizations.sol";
import "./Treasury.sol";
import "./GambitAuthorizations.sol";

contract Game {
    ITreasury treasury;
    address payable treasuryContract;
    uint256 sentToTreasury = 0;
    event RngReceived(string);
    event RngRequested(uint256);

    constructor(address _treasury) {
        treasury = ITreasury(_treasury);
        treasuryContract = payable(_treasury);
    }

    function payWinner(address _winner, uint256 _amount) public payable {
        require(_amount <= sentToTreasury);
        sentToTreasury -= _amount;
        treasury.payWinnings(_amount, payable(_winner), "AVAX");
    }

    function acceptBet(uint256 _value) public payable {
        require(msg.value == _value);
        sentToTreasury += _value;
        treasuryContract.transfer(_value);
    }

    function requestRng() public payable {
        emit RngRequested(block.timestamp);

    }
}
