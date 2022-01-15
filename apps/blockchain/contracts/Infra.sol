pragma solidity ^0.8.10;

import "./GamebitAuthorizations.sol";
import "./Game.sol";

// todo is this it's own deployed contract or a inheritable contract?
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
        uint256 _commit
    ) public isOfficialRng {
        require(
            rngRequests[_rngIndex].consumed == false,
            "RNG request has already been fulfilled or cancelled"
        );
        commits[_rngIndex] = _commit;
        reveals[_rngIndex] = _randomNum;
        IGame(msg.sender).validateRng(_rngIndex, _randomNum, _commit);
    }

    function validateCommit(uint256 _rngIndex, uint256 _commit)
        public
        isOfficialRng
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
        require(commits[_rngIndex] == _commit, "Commit does not match");
        rngRequests[_rngIndex].consumed = true;
        emit RNGRequestFulfilled(_rngIndex, reveals[_rngIndex]);
        delete rngRequests[_rngIndex];
        return true;
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

    function validateCommit(uint256 _rngIndex, uint256 _commit) external returns (bool);
}
