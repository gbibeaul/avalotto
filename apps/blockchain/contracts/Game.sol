pragma solidity ^0.8.10;

import "./GambitAuthorizations.sol";
import "./Treasury.sol";
import "./GambitAuthorizations.sol";

/**
    This is a contract to allow games to be created and played on the gamebit protocol.
    The treasury automatically incentivizes the players and takes any fees that are owed to ensure viability of the protocol.
    Games can be implemted in two ways. A contract can implement both but has to manage it's funds appropriately.
     - Sessions: A time period where the game is played and the winnings are payed at the end
     - Plays/Bets: A game where there each move/bet is a separate instance of the game. (think slots, scratch cards, combat games).
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

    // single plays methods (i.e. moves, scratch cards, etc)

    function acceptPlay(uint256 _amount, uint256 _profit) internal {
        contractTreasuryAccount += _amount;
        treasury.acceptPlay(_amount, _profit);
    }

    function distributePlayWinnings(uint256 _amount, address payable _winner)
        internal
    {
        contractTreasuryAccount -= _amount;
        treasury.distributePlayWinnings(_amount, _winner);
    }

    // game session methods (i.e. horse race, blackjack)

    function takeGameSessionBet(uint256 _amount) internal {
        contractTreasuryAccount += _amount;
        treasury.takeGameSessionBet(_amount);
    }

    function payGameSessionWinnings(
        uint256 _amount,
        uint256 _profits,
        address payable _winner
    ) internal {
        treasury.payGameSessionWinnings(_amount, _profits, _winner);
    }
}
