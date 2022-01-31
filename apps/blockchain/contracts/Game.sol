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

    mapping(uint256 => bool) private requests;
    
    event RngReceived(string);
    event RngRequested(uint256);

    constructor(
        address _treasury,
        address _gamitAuth,
        address _gamebitInfra
    ) {
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

    modifier onlyStaffOrGov() {
        require(
            gamebitAuth.isStaffOrGovApproved(msg.sender),
            "Only official staff or governance can call this function"
        );
        _;
    }

    // single plays methods (i.e. moves, scratch cards, etc)

    function acceptPlay(uint256 _amount, uint256 _profit)
        internal
        returns (bool)
    {
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
        treasury.payGameSessionWinnings{value: msg.value}(
            _amount,
            _profits,
            _winner
        );
    }

    // TODO: evaluate the ordering of all the statements in this function for security
    function requestRng() internal returns (uint256) {
        treasury.receiveRngPayment();

        uint256 requestId = infra.requestRng();
        requests[requestId] = true;

        return requestId;
    }

    // TODO: evaluate the ordering of all the statements in this function for security
    function validateRng(
        uint256 _requestId,
        uint256 _rng,
        uint256 _provenance
    ) external onlyInfra {
        require(requests[_requestId], "Invalid request ID");
        require(
            infra.validateCommit(_requestId, _provenance),
            "Invalid commit"
        );
        requests[_requestId] = false;

        consumeRng(_rng, _requestId);
    }

    function consumeRng(uint256 _rng, uint256 _requestId) internal virtual {}
}

interface IGame {
    function validateRng(
        uint256 _index,
        uint256 _rng,
        uint256 _provenance
    ) external;
}
