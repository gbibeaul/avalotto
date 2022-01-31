// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * NFT that can be redeemed from scratch offs
 *
 * Does not include ERC standards
 */

interface IScratchOffRedeemable {
    /**
     * Mint
     */
    function mint(address, uint256) external;
}

contract CasinoNFT is IScratchOffRedeemable, ERC721 {
    address private scratchOff;
    mapping (uint256 => bool) private redeemed;

    constructor(address _scratchOff) ERC721("CasinoNFT", "PLAYER") {
	    scratchOff = _scratchOff;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://tbd";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function mint(address _to, uint256 _tokenId) external {
        require(_msgSender() == scratchOff, "Only scratch off can mint");
        require(!redeemed[_tokenId], "Scratch off may only be redeemed once");

        _safeMint(_to, _tokenId);

        redeemed[_tokenId] = true;
    }
}
