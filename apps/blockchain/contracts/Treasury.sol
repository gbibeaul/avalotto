pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * This contract contains a UUPS upgradable treasury to allowa cashier system to be implemented.
 * The treasury holds the protocol's funds. The staffing system will be gradually deprecated in favor of
 * automated protocol actions approved by the DAO as the ecosystem matures.
 */
contract Treasury {
    address public theHouse;
    address public governance;
    uint256 cashierCount;
    uint256 currentTransferProposal;
    uint256 currentUpgradeProposal;
    uint256 houseProfitRatio;
    uint256 profitDistributionRatio;
    mapping(address => bool) isCashier;
    mapping(address => bool) isCashierFlagged;
    mapping(uint256 => transferProposal) transferProposals;
    mapping(uint256 => upgradeProposal) upgradeProposals;
    mapping(string => bool) approvedAssets;
    mapping(address => bool) authorizedGames;

    constructor(address[] memory _cashiers, address _governance) {
        approvedAssets["AVAX"] = true;
        governance = _governance;
        theHouse = msg.sender;
        // loop on _cashiers and add them to the mapping
        for (uint256 i = 0; i < _cashiers.length; i++) {
            isCashier[_cashiers[i]] = true;
        }
        cashierCount = _cashiers.length;
        currentTransferProposal = 0;
        currentUpgradeProposal = 0;
    }

    modifier onlyTheHouse() {
        require(msg.sender == theHouse);
        _;
    }

    modifier onlyCashier() {
        require(isCashier[msg.sender] == true);
        require(isCashierFlagged[msg.sender] == false);
        _;
    }

    modifier notProposer() {
        require(
            transferProposals[currentTransferProposal].proposer != msg.sender,
            "You can't approve a transfer you proposed"
        );
        _;
    }

    modifier approvedGame() {
        require(
            authorizedGames[msg.sender] == true,
            "Only gamblefi approved games can use this action"
        );
        _;
    }

    modifier governanceApproved() {
        require(
            msg.sender == governance,
            "Only the governance can execute this action"
        );
        _;
    }

    modifier approvedAsset(string calldata _assetType) {
        require(approvedAssets[_assetType] == true);
        _;
    }

    struct transferProposal {
        uint256 amount;
        address payable sendTo;
        address proposer;
        address[] approvedBy;
    }

    struct replaceTheHouseProposal {
        address newHouse;
        address proposer;
        address[] approvedBy;
    }

    struct upgradeProposal {
        mapping(address => bool) approvals;
    }

    struct overrideTheHouseProposal {
        address unbanCashier;
        mapping(address => bool) approvals;
    }

    // House functions. The house is a representative of the GAMBLE token holders.
    // The house is a delegator of the GAMBLE token holders. He can be revoked by a governance vote.
    // The house appoints cashiers to the treasury but can't propose transfers.
    function setTheHouse(address _newHouse) public onlyTheHouse {
        theHouse = _newHouse;
    }

    function addCashier(address _newCashier) public onlyTheHouse {
        isCashier[_newCashier] = true;
        isCashierFlagged[_newCashier] = false;
    }

    function flagCashier(address _shittyCashier) public onlyTheHouse {
        isCashierFlagged[_shittyCashier] = true;
    }

    function unFlagCashier(address _shittyCashier) public onlyTheHouse {
        isCashierFlagged[_shittyCashier] = false;
    }

    // cashier actions
    function proposeTransfer(uint256 _amount, address payable _sendTo)
        public
        onlyCashier
    {
        require(_amount > 0, "Proposed amount must be over 0");

        transferProposals[currentTransferProposal] = transferProposal(
            _amount,
            _sendTo,
            msg.sender,
            new address[](0)
        );
    }

    function approveTransfer() public onlyCashier notProposer {
        // loop on all approvals to ensure msg.sender is not in
        for (
            uint256 i = 0;
            i < transferProposals[currentTransferProposal].approvedBy.length;
            i++
        ) {
            if (
                transferProposals[currentTransferProposal].approvedBy[i] ==
                msg.sender
            ) {
                revert("You have already approved this transfer");
            }
        }

        transferProposals[currentTransferProposal].approvedBy.push(msg.sender);
        // if half of the cashiers have approved, then execute the transfer
        if (
            transferProposals[currentTransferProposal].approvedBy.length >=
            cashierCount / 2
        ) {
            transferProposals[currentTransferProposal].sendTo.transfer(
                transferProposals[currentTransferProposal].amount
            );

            // free up storage
            delete transferProposals[currentTransferProposal];
            currentTransferProposal++;
        }
    }

    /**
     * @dev a rejected transfer proposal should be a rare occurence.
     */
    function rejectTransfer() public onlyCashier notProposer {
        delete transferProposals[currentTransferProposal];
        currentTransferProposal++;
    }

    function governanceSendAvax(
        uint256 _amount,
        address payable _sendTo,
        string calldata _assetType
    ) public governanceApproved returns (bool) {
        require(_amount > 0, "Proposed amount must be over 0");
        if (
            keccak256(abi.encode(_assetType)) == keccak256(abi.encode("AVAX"))
        ) {
            _sendTo.transfer(_amount);
            return true;
        }

        return false;
    }

    function payWinnings(
        uint256 _amount,
        address payable _winner,
        string calldata _assetType
    ) public approvedGame approvedAsset(_assetType) returns (bool) {
        if (
            keccak256(abi.encode(_assetType)) == keccak256(abi.encode("AVAX"))
        ) {
            _winner.transfer(_amount);
            return true;
        }
        return false;
    }
}
