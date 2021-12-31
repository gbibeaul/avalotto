pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Incentives is OwnableUpgradeable, UUPSUpgradeable {
    function initialize() public initializer {}

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    
}
