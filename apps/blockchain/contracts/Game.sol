pragma solidity ^0.8.10;

import "./GambitAuthorizations.sol";
import "./Treasury.sol";
import "./GambitAuthorizations.sol";

/**
    A contract that is all wired to create games on gamebit that use single moves/bets. 
    A Play game means a player pays 
 */
contract Game {
    ITreasury treasury;
    address payable treasuryContract;
    uint256 contractTreasuryAccount = 0;
    event RngReceived(string);
    event RngRequested(uint256);

    constructor(address _treasury) {
        treasury = ITreasury(_treasury);
        treasuryContract = payable(_treasury);
    }

    function acceptPlay(uint256 _amount, uint256 _profit) internal {
        contractTreasuryAccount += _amount;
        treasury.acceptPlay(_amount, _profit);
    }

    function takeGameSessionBet(uint256 _amount) internal {
        contractTreasuryAccount -= _amount;
        treasury.takeGameSessionBet(_amount);
    }

    function distributePlayWinnings(uint256 _amount, address payable _winner)
        internal
    {
        contractTreasuryAccount -= _amount;
        treasury.distributePlayWinnings(_amount, _winner);
    }

    function payGameSessionWinnings(
        uint256 _amount,
        uint256 _profits,
        address payable _winner
    ) internal {
        treasury.payGameSessionWinnings(_amount, _profits, _winner);
    }
}
