pragma solidity ^0.8.10;

contract GamebitAuthorizations {
    mapping(address => bool) staff;
    mapping(address => bool) games;
    mapping(address => bool) rngAuthorized;
    mapping(address => bool) oracleAuthorized;
    mapping(address => bool) playProfitAuthorized;
    mapping(address => bool) gameProfitAuthorized;
    mapping(address => uint256) minGameProfit;
    mapping(address => bool) isOracle;
    address rngOracle;
    address auditor;
    address governance;
    address[] oracles;

    bool staffEnabled = true;

    constructor(address _governance) {
        staff[msg.sender] = true;
        governance = _governance;
    }

    /**
        MODIFIERS
     */
    modifier onlyGovernance() {
        require(
            governance == msg.sender,
            "Only governance can call this function"
        );
        _;
    }

    modifier onlyStaffOrGovernance() {
        if (staffEnabled) {
            require(
                staff[msg.sender] || governance == msg.sender,
                "Only staff or governance can call this function"
            );
        } else {
            require(
                governance == msg.sender,
                "Only governance can call this function"
            );
        }
        _;
    }

    modifier authorizedGame(address _game) {
        require(games[_game], "This is not an authorized game");
        _;
    }

    /**
        ADMINISTRATION FUNCTIONS
     */

    /**
        Add a new staff member
        @param _staff Address of the new staff member 
     */
    function addStaff(address _staff) public onlyStaffOrGovernance {
        staff[_staff] = true;
    }

    /**
        Remove a staff member
        @param _staff Address of the staff member to remove
     */
    function removeStaff(address _staff) public onlyStaffOrGovernance {
        staff[_staff] = false;
    }

    /**
        add a game to the authorized games list. This gives access to the treasury and paying winners
     */
    function addAuthorizedGame(address _game, uint256 _minGameProfit)
        public
        onlyStaffOrGovernance
    {
        games[_game] = true;
        minGameProfit[_game] = _minGameProfit;
    }

    /**
        Update the minimum amount of profit the treasury takes on a game.
     */
    function updateGameMinProfit(address _game, uint256 _minGameProfit)
        public
        onlyStaffOrGovernance
    {
        minGameProfit[_game] = _minGameProfit;
    }

    /**
        remove a game from the authorized games list. This removes access to the treasury and paying winners
     */
    function removeAuthorizedGame(address _game) public onlyStaffOrGovernance {
        games[_game] = false;
    }

    /** 
        Allow/Block a game to call oracle RNGs this means the games will be required to pay the oracle to the treasury
     */
    function editGameRngAuth(address _game, bool _auth)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        rngAuthorized[_game] = _auth;
    }

    /**
        Allow/Block a game to call other oracles this means the games will be required to pay the oracle to the treasury
     */
    function editGameOracleAuth(address _game, bool _auth)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        oracleAuthorized[_game] = _auth;
    }

    /**
        Allow/Block a game to pay a winner from the treasury that has placed a bet/play for ex: (buy lottery ticket, NFT scratch card)
     */
    function editGamePlayProfitAuth(address _game, bool _auth)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        playProfitAuthorized[_game] = _auth;
    }

    /**
        Allow/Block a game to pay a winner of a game session (blackjack session, roulette session)
     */
    function editGameGameProfitAuth(address _game, bool _auth)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        gameProfitAuthorized[_game] = _auth;
    }

    /**
        Disable the staff from taking actions. Means any action must be taken by the governance
     */
    function disableStaff() public onlyGovernance {
        staffEnabled = false;
    }

    /**
        Enable the staff to take actions. Gives power back to the staff alongside governance
     */
    function enableStaff() public onlyGovernance {
        staffEnabled = true;
    }

    function changeRng(address _rng) public onlyStaffOrGovernance {
        require(_rng != address(0), "RNG address cannot be 0x0");
        rngOracle = _rng;
    }

    function addOracle(address _oracle) public onlyStaffOrGovernance {
        isOracle[_oracle] = true;
        oracles.push(_oracle);
    }

    function removeOracle(address _oracle) public onlyStaffOrGovernance {
        isOracle[_oracle] = false;
    }

    function changeAuditor(address _auditor) public onlyStaffOrGovernance {
        auditor = _auditor;
    }

    /**
        View Funcs
     */
    function isStaffOrGovApproved(address _requester)
        public
        view
        returns (bool)
    {
        if (staffEnabled) {
            return staff[_requester] || governance == _requester;
        } else {
            return governance == _requester;
        }
    }

    function isStaff(address _staff) public view returns (bool) {
        return staff[_staff];
    }

    function isGameAuthorized(address _game) public view returns (bool) {
        return games[_game];
    }

    // is a game authorized to use the RNGs
    function isGameRngAuthorized(address _game) public view returns (bool) {
        return rngAuthorized[_game];
    }

    function isGameOracleAuthorized(address _game) public view returns (bool) {
        return oracleAuthorized[_game];
    }

    function isOfficialRng(address _rng) public view returns (bool) {
        return rngOracle == _rng;
    }

    function isGamePlayProfitAuthorized(address _game)
        public
        view
        returns (bool)
    {
        return playProfitAuthorized[_game];
    }

    function isGameGameProfitAuthorized(address _game)
        public
        view
        returns (bool)
    {
        return gameProfitAuthorized[_game];
    }

    function isAmountEnoughProfit(address _game, uint256 _amount)
        public
        view
        returns (bool)
    {
        return minGameProfit[_game] <= _amount;
    }

    function getMinGameProfit(address _game) public view returns (uint256) {
        return minGameProfit[_game];
    }

    function isAuditor(address _auditor) public view returns (bool) {
        return auditor == _auditor;
    }
}
