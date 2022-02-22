pragma solidity ^0.8.10;

import "../Treasury/ITreasury.sol";
import "../Authorization/IGamebitAuthorizations.sol";
import "../Auditor/IAuditor.sol";
import "hardhat/console.sol";

abstract contract Game {
    ITreasury treasury;
    IGamebitAuthorization gamebitAuth;
    IAuditor auditor;

    address payable treasuryContract;
    uint256 contractTreasuryAccount = 0;
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

    modifier onlyRngOracle() {
        require(
            gamebitAuth.isOfficialRng(msg.sender),
            "Only the rng oracle can provide RNG"
        );
        _;
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
        currentRequestId = auditor.logRNGRequest();
        emit RngRequested(currentRequestId);
    }

    function receiveRng(
        uint256 _requestId,
        uint256 _round,
        uint256 _value
    ) public onlyRngOracle returns (uint256) {
        require(auditor.isRngValid(_requestId, _round, _value), "Invalid RNG");
        require(currentRequestId == _requestId, "Invalid request id");
        emit RngReceived(_value);
        useRng(_value, _requestId);
        return _value;
    }

    function useRng(uint256 _rng, uint256 _requestId) internal virtual {}
}
