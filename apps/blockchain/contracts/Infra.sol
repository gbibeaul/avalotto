pragma solidity ^0.8.10;

import "./GamebitAuthorizations.sol";
import "./Game.sol";

// todo is this it's own deployed contract or a inheritable contract?
contract Infrastructure {
    IGamebitAuthorization gamebitAuth;
    uint256 rngRequestIndex = 1;
    mapping(uint256 => RNGRequest) rngRequests;
    event RNGRequestCreated(uint256 requestIndex);
    event RNGRequestCancelled(uint256 requestIndex);
    event RNGRequestFulfilled(uint256 requestIndex, uint256 result);

    struct RNGRequest {
        uint256 requestedAt;
        uint256 requestIndex;
        address requestedBy;
        bool fulfilled;
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

    function requestRng() public rngAuthorized returns (uint256 rngIndex) {
        rngRequests[rngRequestIndex] = RNGRequest(
            block.timestamp,
            rngRequestIndex,
            msg.sender,
            false
        );
        rngRequestIndex++;
        emit RNGRequestCreated(rngRequestIndex);
        return rngRequestIndex;
    }

    function fulFillRng(uint256 _rngIndex, uint256 _randomNum)
        public
        isOfficialRng
    {
        require(
            rngRequests[_rngIndex].fulfilled == false,
            "RNG request has already been fulfilled or cancelled"
        );
        IGame(msg.sender).consumeRng(_rngIndex, _randomNum);
        emit RNGRequestFulfilled(_rngIndex, _randomNum);
        delete rngRequests[_rngIndex];
    }

    // accept oracle request
    //   1. validate the requesting game
    //   2. foward fees to the treasury
    //   3. emit the request for oracle call

    // fulfill oracle request
    //   1. validate who is the oracle
    //   2. send call game method for fulfilling oracle call

    // start a game session
    // fund management, player management etc

    // end a game session
}

interface IInfrastructure {
    function requestRng() external returns (uint256 rngIndex);
    function fulFillRng(uint256 _rngIndex, uint256 _randomNum) external;
}
