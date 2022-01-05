pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract GAMBLEToken is ERC777Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    function initialize(
        uint256 initialSupply,
        address[] memory defaultOperators
    ) public initializer {
        __ERC777_init("Gamble", "GAMBLE", defaultOperators);
        _mint(msg.sender, initialSupply, "", "");
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
