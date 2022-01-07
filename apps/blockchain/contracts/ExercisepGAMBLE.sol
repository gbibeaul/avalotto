// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IPGAMBLE {
    function burnFrom( address account_, uint256 amount_ ) external;
}

contract ExercisepGAMBLE {
    using SafeMath for uint;
    using SafeERC20 for IERC20;

    address public owner;
    address public newOwner;

    address public immutable pGAMBLE;
    address public immutable GAMBLE;
    address public immutable treasury;

    struct Term {
        uint percent; // 4 decimals ( 5000 = 0.5% )
        uint claimed;
        uint max;
    }

    mapping( address => Term ) public terms;

    mapping( address => address ) public walletChange;

    bool hasMigrated;

    constructor( address _pGAMBLE, address _GAMBLE, address _treasury ) {
        owner = msg.sender;
        require( _pGAMBLE != address(0) );
        pGAMBLE = _pGAMBLE;
        require( _GAMBLE != address(0) );
        GAMBLE = _GAMBLE;
        require( _treasury != address(0) );
        treasury = _treasury;
    }

    // Sets terms for a new wallet
    function setTerms(address _vester, uint _amountCanClaim, uint _rate ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );
        require( _amountCanClaim >= terms[ _vester ].max, "cannot lower amount claimable" );
        require( _rate >= terms[ _vester ].percent, "cannot lower vesting rate" );

        terms[ _vester ].max = _amountCanClaim;
        terms[ _vester ].percent = _rate;

        return true;
    }

    // Allows wallet to redeem pGAMBLE for GAMBLE
    function exercise( uint _amount ) external returns ( bool ) {
        Term memory info = terms[ msg.sender ];
        require( redeemable( info ) >= _amount, 'Not enough vested' );
        require( info.max.sub( info.claimed ) >= _amount, 'Claimed over max' );

        IPGAMBLE( pGAMBLE ).burnFrom( msg.sender, _amount );
        terms[ msg.sender ].claimed = info.claimed.add( _amount );
        IERC20( GAMBLE ).safeTransfer( msg.sender, _amount );

        return true;
    }

    // Allows wallet owner to transfer rights to a new address
    function pushWalletChange( address _newWallet ) external returns ( bool ) {
        require( terms[ msg.sender ].percent != 0 );
        walletChange[ msg.sender ] = _newWallet;
        return true;
    }

    // Allows wallet to pull rights from an old address
    function pullWalletChange( address _oldWallet ) external returns ( bool ) {
        require( walletChange[ _oldWallet ] == msg.sender, "wallet did not push" );

        walletChange[ _oldWallet ] = address(0);
        terms[ msg.sender ] = terms[ _oldWallet ];
        delete terms[ _oldWallet ];

        return true;
    }

    // Amount a wallet can redeem based on current supply
    function redeemableFor( address _vester ) public view returns (uint) {
        return redeemable( terms[ _vester ]);
    }

    function redeemable( Term memory _info ) internal view returns ( uint ) {
        // TODO: Calculate redeemable amount
        // Could be based on circulating supply, some sort of price oracle, some amount of time, etc
        return 0;
    }

    function pushOwnership( address _newOwner ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );
        require( _newOwner != address(0) );
        newOwner = _newOwner;
        return true;
    }

    function pullOwnership() external returns ( bool ) {
        require( msg.sender == newOwner );
        owner = newOwner;
        newOwner = address(0);
        return true;
    }
}