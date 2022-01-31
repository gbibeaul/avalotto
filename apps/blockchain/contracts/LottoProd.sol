pragma solidity ^0.8.10;

import "./Lotto.sol";

contract Lotto is LottoGamebit {
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

    function getDigit(uint256 _number, uint256 _index)
        private
        pure
        returns (uint256)
    {
        if (_index == 0) {
            return _number % 10;
        }
        return ((_number % 10**(_index + 1)) / (10**_index)) | 0;
    }

    /**
     * @dev ENSURE THIS FUNCTION IS NOT RETURNING [uint256(1), uint256(2), uint256(3)]
     *  if that's the case you are coding in the test contract
     */
    function _getLotteryResults(uint256 _random)
        private
        pure
        returns (uint256[3] memory)
    {
        uint256 _currentIndex = 0;

        uint256 _num1 = (getDigit(_random, _currentIndex) * 10) +
            getDigit(_random, _currentIndex + 1);
        _currentIndex += 2;
        uint256 _num2 = (getDigit(_random, _currentIndex) * 10) +
            getDigit(_random, _currentIndex + 1);
        _currentIndex += 2;
        while (_num1 == _num2) {
            _num2 =
                (getDigit(_random, _currentIndex) * 10) +
                getDigit(_random, _currentIndex + 1);
            _currentIndex += 2;
        }
        uint256 _num3 = (getDigit(_random, _currentIndex) * 10) +
            getDigit(_random, _currentIndex + 1);
        while (_num3 == _num1 || _num3 == _num2) {
            _num3 =
                (getDigit(_random, _currentIndex) * 10) +
                getDigit(_random, _currentIndex + 1);
        }
        return [_num1, _num2, _num3];
    }

    function consumeRng(uint256 _rng, uint256 _requestId)
        internal
        override
        onlyInfra
    {
        uint256[3] memory _drawNumbers = _getLotteryResults(_rng);

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
