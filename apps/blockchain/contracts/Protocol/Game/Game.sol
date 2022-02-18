pragma solidity ^0.8.10;

import "../Treasury/ITreasury.sol";
import "../Authorization/IGamebitAuthorizations.sol";
import "../Auditor/IAuditor.sol";

abstract contract Game {
    ITreasury treasury;
    IGamebitAuthorization gamebitAuth;
    IAuditor auditor;

    address payable treasuryContract;
    uint256 contractTreasuryAccount = 0;
    uint256 currentRequestNonce = 1;
    uint256 currentRequestId;

    event RngReceived(uint256);
    event RngRequested(uint256);

    constructor(
        address _treasury,
        address _gamitAuth,
        address _auditor
    ) {
        treasury = ITreasury(_treasury);
        treasuryContract = payable(_treasury);
        gamebitAuth = IGamebitAuthorization(_gamitAuth);
        auditor = IAuditor(_auditor);
    }

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

    function requestRng() internal {
        treasury.receiveRngPayment();
        auditor.getRequest(1);
        currentRequestId = auditor.logRNGRequest(currentRequestNonce);
        emit RngRequested(currentRequestId);
    }

    function consumeRng(uint256 _rng, uint256 _requestId) internal virtual {
        require(currentRequestId == _requestId, "Invalid request id");
        auditor.consumeRNG(_rng, _requestId);
        emit RngReceived(_rng);
    }
}
