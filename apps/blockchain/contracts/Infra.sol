pragma solidity ^0.8.10;

import "./GamebitAuthorizations.sol";
import "./Game.sol";

contract GamebitInfra {
    IGamebitAuthorization gamebitAuth;
    uint256 rngRequestIndex = 1;
    mapping(uint256 => RNGRequest) rngRequests;
    mapping(uint256 => uint256) commits;
    mapping(uint256 => uint256) reveals;
    event RNGRequestCreated(uint256 requestIndex);
    event RNGRequestCancelled(uint256 requestIndex);
    event RNGRequestFulfilled(uint256 requestIndex, uint256 result);

    struct RNGRequest {
        uint256 requestedAt;
        uint256 requestIndex;
        address requestedBy;
        bool consumed;
    }

    // struct game session

    constructor(address _gamebitAuthorizations) {
        gamebitAuth = IGamebitAuthorization(_gamebitAuthorizations);
    }

    modifier rngAuthorized() {
        require(
            gamebitAuth.isAuthorizedRNG(msg.sender),
            "This game is not authorized for RNGs"
        );
        _;
    }

    modifier isOfficialRng() {
        require(
            gamebitAuth.isOfficialRng(msg.sender),
            "This address is not the official Oracle"
        );
        _;
    }

    /**
        * @dev This is requestecd by a game. It will start the RNG 3 way handshake process
        1. Game requests an RNG to Infra
        2. Infra saves the requests and emits a RNGRequestCreated event
        3. The oracle captures the request and will answer back with an RNG using fullfillRNGRequest
        4. the infra will notify the game that the RNG has been fulfilled
        5. the game will then consume the RNG while auditing the 
     */
    function requestRng() public rngAuthorized returns (uint256 rngIndex) {
        rngRequests[rngRequestIndex] = RNGRequest(
            block.number,
            rngRequestIndex,
            msg.sender,
            false
        );
        rngRequestIndex++;
        emit RNGRequestCreated(rngRequestIndex);
        return rngRequestIndex;
    }

    function fulFillRng(
        uint256 _rngIndex,
        uint256 _randomNum,
        uint256 _provenance
    ) public isOfficialRng {
        require(
            rngRequests[_rngIndex].consumed == false,
            "RNG request has already been fulfilled or cancelled"
        );
        commits[_rngIndex] = _provenance;
        reveals[_rngIndex] = _randomNum;
        IGame(msg.sender).validateRng(_rngIndex, _randomNum, _provenance);
    }

    /**
     * @dev The commit is obtained in the oracle server. It represents a signed json string of the RNG api call.
     */
    function validateCommit(uint256 _rngIndex, uint256 _provenance)
        public
        returns (bool)
    {
        require(
            msg.sender == rngRequests[_rngIndex].requestedBy,
            "Only the requesting game can validate the commit"
        );
        require(
            rngRequests[_rngIndex].consumed == false,
            "This RNG has already been consumed"
        );
        require(commits[_rngIndex] == _provenance, "Commit does not match");
        rngRequests[_rngIndex].consumed = true;
        emit RNGRequestFulfilled(_rngIndex, reveals[_rngIndex]);
        delete rngRequests[_rngIndex];
        return true;
    }

}

interface IInfrastructure {
    function requestRng() external returns (uint256 rngIndex);

    function fulFillRng(uint256 _rngIndex, uint256 _randomNum) external;

    function validateCommit(uint256 _rngIndex, uint256 _provenance) external returns (bool);
}
