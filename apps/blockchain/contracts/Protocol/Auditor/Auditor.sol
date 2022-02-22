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
    mapping(uint256 => RNGConsumption) consumption;
    mapping(uint256 => RequestState) requestState;

    event RNGRequested(uint256 id, address requester);
    event RNGFullfilled(uint256 id, address requester, uint256 value);
    event RNGConsumed(uint256 id, address requester, uint256 value);

    /**
    DATA STRUCTURES
    */
    struct RNGRequest {
        address requestedBy;
        uint256 requestNonce;
        uint256 requestedAt;
    }

    struct RNGFullfillment {
        uint256 fullfillmentAt;
        uint256 fullfillmentValue;
    }

    struct RNGConsumption {
        uint256 consumptionAt;
        uint256 consumptionValue;
    }

    enum RequestState {
        REQUESTED,
        FULLFILLED,
        CONSUMED
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
    function logRNGRequest(uint256 _requestNonce)
        public
        onlyRngAuthorizedGame
        returns (uint256)
    {
        request[currentId] = RNGRequest(
            msg.sender,
            _requestNonce,
            block.timestamp
        );

        requestState[currentId] = RequestState.REQUESTED;
        request[currentId].requestedAt = block.timestamp;
        emit RNGRequested(currentId, msg.sender);
        currentId++;
        return currentId - 1;
    }

    function consumeRNG(uint256 _consumptionValue, uint256 _requestId)
        public
        onlyRngAuthorizedGame
    {
        require(
            requestState[_requestId] == RequestState.FULLFILLED,
            "Request must be fullfilled before consumption"
        );

        require(
            fullfillment[_requestId].fullfillmentValue == _consumptionValue,
            "Invalid RNG"
        );

        consumption[_requestId] = RNGConsumption(
            block.timestamp,
            _consumptionValue
        );
        requestState[_requestId] = RequestState.CONSUMED;
        emit RNGConsumed(currentId, msg.sender, _consumptionValue);
    }

    /**
    ACTIONS TAKEN BY THE RNG ORACLE
    */
    function fulfillRNG(uint256 _fulfillmentValue, uint256 _requestId)
        public
        onlyRngOracle
    {
        require(
            requestState[_requestId] == RequestState.REQUESTED,
            "This request is not in requested state, only requested non consumed requests can be fullfilled"
        );
        fullfillment[_requestId] = RNGFullfillment(
            block.timestamp,
            _fulfillmentValue
        );
        requestState[_requestId] = RequestState.FULLFILLED;
        emit RNGFullfilled(currentId, msg.sender, _fulfillmentValue);
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

    function getConsumption(uint256 _requestId)
        public
        view
        returns (RNGConsumption memory)
    {
        return consumption[_requestId];
    }
}
