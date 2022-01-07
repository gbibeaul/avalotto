pragma solidity ^0.8.10;

import "./GambitAuthorizations.sol";
import "./Treasury.sol";

contract Game {
    Itreasury treasury;
    address payable treasuryContract;

    constructor(address _treasury) {
        treasury = Itreasury(_treasury);
        treasuryContract = payable(_treasury);
    }

    function payWinner(address _winner, uint256 _amount) public payable {
        treasury.payWinnings(_amount, payable(_winner), "AVAX");
    }

    function forwardBet(uint256 _value) public payable {
        treasuryContract.transfer(_value);
    }
}
