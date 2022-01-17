pragma solidity ^0.8.10;

import "./Treasury.sol";
import "./GamebitAuthorizations.sol";
import "./Infra.sol";

/**
    This is a contract to allow games to be created and played on the gamebit protocol.
    The treasury automatically incentivizes the players and takes any fees that are owed to ensure viability of the protocol.
    Games can be implemted in two ways. A contract can implement both but has to manage it's funds appropriately.
     - Sessions: A time period where the game is played and the winnings are payed at the end
     - Plays/Bets: A game where there each move/bet is a separate instance of the game. (think slots, scratch cards, combat games).
 */
abstract contract Game {
    ITreasury treasury;
    IGamebitAuthorization gamebitAuth;
    IInfrastructure infra;
    address payable treasuryContract;
    uint256 contractTreasuryAccount = 0;
    event RngReceived(string);
    event RngRequested(uint256);

    constructor(address _treasury, address _gamitAuth, address _gamebitInfra) {
        treasury = ITreasury(_treasury);
        treasuryContract = payable(_treasury);
        gamebitAuth = IGamebitAuthorization(_gamitAuth);
        infra = IInfrastructure(_gamebitInfra);
    }

    modifier onlyInfra() {
        require(
            gamebitAuth.isOfficialInfra(msg.sender),
            "Only official infra can call this function"
        );
        _;
    }

    // single plays methods (i.e. moves, scratch cards, etc)

    function acceptPlay(uint256 _amount, uint256 _profit) internal returns (bool) {
        contractTreasuryAccount += _amount;
        treasury.acceptPlay(_amount, _profit);
        return true;
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
        treasury.payGameSessionWinnings{value: msg.value}(_amount, _profits, _winner);
    }

    function requestRng() internal {
        infra.requestRng();
        treasury.receiveRngPayment();
    }

    function validateRng(uint256 _index, uint256 _rng, uint256 _commit) public onlyInfra {
        require(infra.validateCommit(_index, _commit), "Invalid commit");
        consumeRng(_rng);
    }

    function consumeRng(uint256 _rng) public {}
}

interface IGame {
    function validateRng(uint256 _index, uint256 _rng, uint256 _commit) external;
}
