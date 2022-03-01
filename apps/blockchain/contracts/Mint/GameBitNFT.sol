pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameBitNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint8) existingURIs;

    constructor() ERC721("GameBitNFT", "GNFT") {}

    function _awardItem(address player, string memory tokenURI)
        internal
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function isContentOwned(string memory tokenURI) public view returns (bool) {
        return existingURIs[tokenURI] == 1;
    }
}