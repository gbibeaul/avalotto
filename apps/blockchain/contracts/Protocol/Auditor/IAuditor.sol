interface IAuditor {
    enum RequestState {
        REQUESTED,
        FULLFILLED
    }
    struct RNGRequest {
        address requestedBy;
        uint256 requestedAt;
    }

    struct RNGFullfillment {
        uint256 round;
        uint256 value;
        uint256 fullfillmentAt;
    }

    function logRNGRequest() external returns (uint256);

    function fullfillRNG(uint256 _fullfillmentValue, uint256 _requestId)
        external;

    function getRequestState(uint256 _requestId)
        external
        returns (RequestState);

    function getRequest(uint256 _requestId)
        external
        returns (RNGRequest memory);

    function getFullfillment(uint256 _fullfillmentId)
        external
        returns (RNGFullfillment memory);

    function isRngValid(
        uint256 _requestId,
        uint256 _round,
        uint256 _value
    ) external returns (bool);
}
