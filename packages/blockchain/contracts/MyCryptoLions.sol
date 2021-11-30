pragma solidity ^0.8.10;

contract HeadsOrTails {
    uint public heads;
    uint public tails;

    function flip() public {
        uint coin = uint(random(2));
        if (coin == 0) {
            heads++;
        } else {
            tails++;
        }
    }
