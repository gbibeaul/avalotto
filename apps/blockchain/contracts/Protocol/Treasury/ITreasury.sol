interface ITreasury {
    function receiveRngPayment() external payable;

    function sendAvax(
        uint256 _amount,
        address payable _sendTo,
        string calldata _assetType
    ) external returns (bool);

    function takeGameSessionBet(uint256 _bet) external payable;

    function payGameSessionWinnings(
        uint256 _winning,
        uint256 _profits,
        address payable _winner
    ) external payable returns (bool);

    function acceptPlay(uint256 _amount, uint256 _profits)
        external
        payable
        returns (bool);

    function distributePlayWinnings(uint256 _winning, address payable _winner)
        external
        returns (bool);
}
