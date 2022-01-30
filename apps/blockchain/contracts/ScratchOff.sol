// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Game.sol";

/**
 * NFT mint + scratch off + redeem interfaces
 *
 * Does not include ERC standards
 *
 * MVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVP
 * MVP There are more more flexible ways of doing this, but this is MVP MVP
 * MVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVPMVP
 */

enum ScratchOffStatus {
    Minted,
    Scratched,
    Redeemed
}

/**
 * Has a minted, scrated, and redeemed state. Allowed state transitions:
 *
 * minted ==> scratched ==> redeemed
 */
interface IScratchOff {
    /**
     * Mint
     */
    function mint() external;

    /**
     * Get current state: revealed == true
     */
    function getStatus(uint256 tokenId) external view returns(ScratchOffStatus);

    /**
     * State transition: minted ==> scratched
     */
    function scratch(uint256 tokenId) external;

    /**
     * Get the scratched off, revealed values
     */
    function getBalls(uint256 tokenId) external view returns(uint8[9] memory);

    /**
     * State transition: scratched ==> redeemed
     */
    function redeem(uint256 tokenId) external;

    /**
     * Get the redeemed NFT ID (address is a magic hard-coded address for now, but will need to change)
     */
    function getRedemption(uint256 tokenId) external view returns(uint256);
}

/**
 * Mocked version of contract to be replaced
 */
contract ScratchOffCard is IScratchOff, ERC721, Game {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => ScratchOffStatus) private _statuses;

    mapping(uint256 => uint256) private rngToToken;

    constructor(address _treasury, address _gamebitAuth, address _gamebitInfra)
        ERC721("ScratchOffCard", "SCRATCH")
        Game(_treasury, _gamebitAuth, _gamebitInfra) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://tbd";
    }

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function mint() external {
        safeMint(_msgSender());
    }

    function getStatus(uint256 tokenId) external view returns(ScratchOffStatus) {
        return _statuses[tokenId];
    }

    function scratch(uint256 _tokenId) external {
        uint256 requestId = requestRng();
    }

    function consumeRng(uint256 _rng, uint256 _requestId) internal override {
       uint256 tokenId = rngToToken[_requestId];
    
       _statuses[tokenId] = ScratchOffStatus.Scratched;
    }

    function getBalls(uint256 tokenId) external view returns(uint8[9] memory) {
        uint8[9] memory balls = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return balls;
    }

    function redeem(uint256 tokenId) external {
        _statuses[tokenId] = ScratchOffStatus.Redeemed;
    }

    function getRedemption(uint256 tokenId) external view returns(uint256) {
        return tokenId; // mocked
    }
}
