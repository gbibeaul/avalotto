pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./GambitAuthorizations.sol";

contract Treasury {
    uint256 houseProfitRatio;
    uint256 profitDistributionPercen;
    IGambitAuthorization gambitAuth;
    mapping(string => bool) approvedAssets;
    mapping(address => bool) authorizedGames;
    event avaxFundChanged(uint256);

    constructor(address _gambitAuthorizations) {
        approvedAssets["AVAX"] = true;
        gambitAuth = IGambitAuthorization(_gambitAuthorizations);
    }

    modifier approvedGame() {
        require(
            gambitAuth.isAuthoziedGame(msg.sender),
            "Only gamblefi approved games can use this action"
        );
        _;
    }

    modifier staffOrGovernance() {
        require(
            gambitAuth.isStaffOrGovApproved(msg.sender),
            "Only staff or governance can use this action"
        );
        _;
    }

    modifier approvedAsset(string calldata _assetType) {
        require(approvedAssets[_assetType] == true);
        _;
    }

    function getFundsAVAXAmount() public view returns (uint256) {
        return address(this).balance;
    }

    /**
        TREASURY ACTIONS
     */

    /**
        @dev allows the treasury to receive funds
     */
    receive() external payable {}

    /**
        @dev allows the treasury to initiate an external payment when initiated by the staff or governance
     */
    function sendAvax(
        uint256 _amount,
        address payable _sendTo,
        string calldata _assetType
    ) public staffOrGovernance returns (bool) {
        require(_amount > 0, "Proposed amount must be over 0");
        if (
            keccak256(abi.encode(_assetType)) == keccak256(abi.encode("AVAX"))
        ) {
            _sendTo.transfer(_amount);
            emit avaxFundChanged(address(this).balance);
            return true;
        }

        return false;
    }

    /**
        @dev allows the treasury to initiate an external when an authorized games requests it
     */
    function payWinnings(
        uint256 _amount,
        address payable _winner,
        string calldata _assetType
    ) public approvedGame approvedAsset(_assetType) returns (bool) {
        if (
            keccak256(abi.encode(_assetType)) == keccak256(abi.encode("AVAX"))
        ) {
            _winner.transfer(_amount);
            emit avaxFundChanged(address(this).balance);
            return true;
        }
        return false;
    }
}

interface Itreasury {
    function getFundsAVAXAmount() external view returns (uint256);

    function sendAvax(
        uint256 _amount,
        address payable _sendTo,
        string calldata _assetType
    ) external returns (bool);

    function payWinnings(
        uint256 _amount,
        address payable _winner,
        string calldata _assetType
    ) external returns (bool);
}
