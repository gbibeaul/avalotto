pragma solidity ^0.8.0;

import "../Authorization/IGamebitAuthorizations.sol";
import "hardhat/console.sol";

contract Auditor {
    constructor(address _gamebitAuthorizations) {
        gamebitAuth = IGamebitAuthorization(_gamebitAuthorizations);
    }

    /**
    STATE VARS AND MAPPIGNS
    */
    IGamebitAuthorization gamebitAuth;
    uint256 currentId = 1;

    mapping(uint256 => RNGRequest) request;
    mapping(uint256 => RNGFullfillment) fullfillment;
    mapping(uint256 => RequestState) requestState;

    event RNGRequested(uint256 id, address requester);
    event RNGFullfilled(uint256 id, address requester, uint256 value);

    /**
    DATA STRUCTURES
    */
    struct RNGRequest {
        address requestedBy;
        uint256 requestedAt;
    }

    // the round is the drand round value for audit offchain
    struct RNGFullfillment {
        uint256 round;
        uint256 value;
        uint256 fullfillmentAt;
    }

    enum RequestState {
        REQUESTED,
        FULLFILLED
    }

    /**
    MODIFIERS
    */
    modifier onlyRngAuthorizedGame() {
        require(
            gamebitAuth.isGameRngAuthorized(msg.sender),
            "Only an authorized game can call this function"
        );
        _;
    }

    modifier onlyRngOracle() {
        require(
            gamebitAuth.isOfficialRng(msg.sender),
            "Only RNG oracle is allowed to call this function"
        );
        _;
    }

    /**
    ACTIONS TAKEN BY GAMES
    */
    function logRNGRequest() public onlyRngAuthorizedGame returns (uint256) {
        request[currentId] = RNGRequest(msg.sender, block.timestamp);

        requestState[currentId] = RequestState.REQUESTED;
        emit RNGRequested(currentId, msg.sender);
        currentId++;
        return currentId - 1;
    }

    /**
    ACTIONS TAKEN BY THE RNG ORACLE
    */
    function fulfillRNG(
        uint256 _requestId,
        uint256 _round,
        uint256 _value
    ) public onlyRngOracle {
        require(
            requestState[_requestId] == RequestState.REQUESTED,
            "This request is not in requested state, only non fullfilled requests can be fulfilled"
        );
        fullfillment[_requestId] = RNGFullfillment(
            _round,
            _value,
            block.timestamp
        );
        requestState[_requestId] = RequestState.FULLFILLED;
    }

    /**
    VIEW FUNCS
    */
    function getRequestState(uint256 _requestId)
        public
        view
        returns (RequestState)
    {
        return requestState[_requestId];
    }

    function getRequest(uint256 _requestId)
        public
        view
        returns (RNGRequest memory)
    {
        return request[_requestId];
    }

    function getFullfillment(uint256 _requestId)
        public
        view
        returns (RNGFullfillment memory)
    {
        return fullfillment[_requestId];
    }

    function isRngValid(
        uint256 _requestId,
        uint256 _round,
        uint256 _value
    ) public view returns (bool) {
        return (requestState[_requestId] == RequestState.FULLFILLED &&
            fullfillment[_requestId].round == _round &&
            fullfillment[_requestId].value == _value);
    }
}
