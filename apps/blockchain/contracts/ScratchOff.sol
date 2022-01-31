// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Game.sol";
import "./CasinoNFT.sol";

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
    event Scratched(uint256, uint256[9]);

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
    function getBalls(uint256 tokenId) external view returns(uint256[9] memory);

    /**
     * State transition: scratched ==> redeemed
     */
    function redeem(uint256 tokenId) external;
}

/**
 * Mocked version of contract to be replaced
 */
contract ScratchOffCard is IScratchOff, ERC721, Game {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    IScratchOffRedeemable private casinoNFT;

    mapping(uint256 => ScratchOffStatus) private _statuses;
    mapping(uint256 => uint256[9]) private tokenToRolls;
    mapping(uint256 => uint256) private rngToToken;


    constructor(address _treasury, address _gamebitAuth, address _gamebitInfra, address _casinoNFT)
        ERC721("ScratchOffCard", "SCRATCH")
        Game(_treasury, _gamebitAuth, _gamebitInfra) {
            casinoNFT = CasinoNFT(_casinoNFT);
        }

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
        require(_statuses[_tokenId] == ScratchOffStatus.Minted);
        require(ownerOf(_tokenId) == _msgSender());
        uint256 requestId = requestRng();
        rngToToken[requestId] = _tokenId; 
    }

    function expand(uint256 randomValue, uint256 n) public pure returns (uint256[] memory expandedValues) {
        expandedValues = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            expandedValues[i] = uint256(keccak256(abi.encode(randomValue, i)));
        }
        return expandedValues;
    }

    function consumeRng(uint256 _rng, uint256 _requestId) internal override {
        uint256 tokenId = rngToToken[_requestId];
        uint256[] memory expanded = expand(_rng, 9);

        for (uint8 i = 0; i < expanded.length; i++) {
            tokenToRolls[tokenId][i] = (expanded[i] % 99) + 1;
        }

        _statuses[tokenId] = ScratchOffStatus.Scratched;

        emit Scratched(tokenId, tokenToRolls[tokenId]);
    }

    function getBalls(uint256 tokenId) external view returns(uint256[9] memory) {
        require(_statuses[tokenId] != ScratchOffStatus.Minted);
        return tokenToRolls[tokenId];
    }

    function redeem(uint256 tokenId) external {
        require(_statuses[tokenId] == ScratchOffStatus.Scratched);
        require(ownerOf(tokenId) == _msgSender());

        casinoNFT.mint(_msgSender(), tokenId);

        _statuses[tokenId] = ScratchOffStatus.Redeemed;
    }
}
