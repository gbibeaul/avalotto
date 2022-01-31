pragma solidity ^0.8.10;

import "./Lotto.sol";

contract LottoMockWinner is LottoGamebit {
    constructor(
        address _treasury,
        address _gamitAuth,
        address _gamebitInfra,
        address _trustedParty,
        uint256 _ticketValue,
        uint256 _drawDaysInterval
    )
        LottoGamebit(
            _treasury,
            _gamitAuth,
            _gamebitInfra,
            _trustedParty,
            _ticketValue,
            _drawDaysInterval
        )
    {}

    function _getLotteryResults() internal pure returns (uint256[3] memory) {
        return [uint256(1), uint256(2), uint256(3)];
    }

    function consumeRng(uint256 _rng, uint256 _requestId) internal override {
        uint256[3] memory _drawNumbers = _getLotteryResults();

        previousDraws[amountOfDraws] = _drawNumbers;
        amountOfDraws++;
        emit Draw(_drawNumbers);

        winnerFound =
            bets[uint256(keccak256(abi.encodePacked(_drawNumbers)))].length > 0;

        if (winnerFound) {
            uint256 _numberOfWinners = bets[
                uint256(keccak256(abi.encodePacked(_drawNumbers)))
            ].length;

            // the rest of the jackpot is divided equally among the winners
            uint256 _amountForEachWinner = jackpot / _numberOfWinners;

            for (uint256 i = 0; i < _numberOfWinners; i++) {
                address winner = bets[
                    uint256(keccak256(abi.encodePacked(_drawNumbers)))
                ][i];
                distributePlayWinnings(_amountForEachWinner, payable(winner));
            }

            jackpot = 0;
        }

        betsClosed = false;
        nextDraw = block.number + 1 weeks;
    }
}
