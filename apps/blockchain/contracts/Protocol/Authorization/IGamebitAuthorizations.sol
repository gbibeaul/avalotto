interface IGamebitAuthorization {
    function isGameAuthorized(address _game) external view returns (bool);

    function isGameRngAuthorized(address _rng) external view returns (bool);

    function isGamePlayProfitAuthorized(address _game)
        external
        view
        returns (bool);

    function isGameGameProfitAuthorized(address _game)
        external
        view
        returns (bool);

    function isAuthorizedOracle(address _oracle) external view returns (bool);

    function isStaff(address _staff) external view returns (bool);

    function isStaffEnabled() external view returns (bool);

    function isOfficialRng(address _rng) external view returns (bool);

    function isOfficialOracle(address _oracle) external view returns (bool);

    function isAuditor(address _auditor) external view returns (bool);

    function getRngOracleAddress() external view returns (address);

    function isStaffOrGovApproved(address _requester)
        external
        view
        returns (bool);

    function isAmountEnoughProfit(address _game, uint256 _amount)
        external
        view
        returns (bool);
}
