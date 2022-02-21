pragma solidity ^0.8.10;

import "../Protocol/Game/Game.sol";

/**
 * This is an example game contract that implements regular bets and jackpots.
 */
contract GameInstance is Game {
    constructor(
        address _treasury,
        address _gamitAuth,
        address _auditor
    ) Game(_treasury, _gamitAuth, _auditor) {
        owner = msg.sender;
    }

    uint256 jackpot = uint256(0);
    address owner;

    // the draw function should either be called by a mechanism (such as jackpot > someAmount) or be called by a staff member
    // It would be a bad idea to allow both
    function draw() internal {
        // a draw should trigger a request for a random number. If needed, the request ID can be stored in the contract for future use.
        requestRng();
    }

    // it is common for a game to open a public function that lets people play or bet
    function play() public payable {
        require(msg.value == 1 ether, "You must bet 1 ether");
        Game.acceptPlay(0.95 ether, 0.05 ether);
        jackpot += 0.95 ether;

        if (jackpot > 1 ether) {
            draw();
        }
    }

    function getJackpot() public view returns (uint256) {
        return jackpot;
    }
}
