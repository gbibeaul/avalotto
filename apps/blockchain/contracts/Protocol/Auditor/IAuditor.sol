interface IAuditor {
    enum RequestState {
        REQUESTED,
        FULLFILLED,
        CONSUMED
    }
    struct RNGRequest {
        address requestedBy;
        uint256 requestNonce;
        uint256 requestedAt;
    }

    struct RNGFullfillment {
        uint256 fullfillmentNonce;
        uint256 fullfillmentAt;
        uint256 fullfillmentValue;
    }

    struct RNGConsumption {
        uint256 consumptionNonce;
        uint256 consumptionAt;
        uint256 consumptionValue;
    }

    function logRNGRequest(uint256 _requestNonce) external returns (uint256);

    function fullfillRNG(
        uint256 _fullfillmentNonce,
        uint256 _fullfillmentValue,
        uint256 _requestId
    ) external;

    function consumeRNG(uint256 _consumptionValue, uint256 _requestId) external;

    function getRequestState(uint256 _requestId)
        external
        returns (RequestState);

    function getRequest(uint256 _requestId)
        external
        returns (RNGRequest memory);

    function getFullfillment(uint256 _fullfillmentId)
        external
        returns (RNGFullfillment memory);

    function getConsumption(uint256 _consumptionId)
        external
        returns (RNGConsumption memory);
}
