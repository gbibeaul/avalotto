// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

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
interface IScratchOffCard {
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
    function getBalls(uint256 tokenId) external view returns(uint256[] calldata);

    /**
     * State transition: scratched ==> redeemed
     */
    function redeem(uint256 tokenId) external;

    /**
     * Get the redeemed NFT ID (address is a magic hard-coded address for now, but will need to change)
     */
    function getRedemption(uint256 tokenId) external view returns(uint256);
}