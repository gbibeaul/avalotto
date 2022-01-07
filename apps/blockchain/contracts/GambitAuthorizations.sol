pragma solidity ^0.8.10;

contract GambitAuthorizations {
    mapping(address => bool) staff;
    mapping(address => bool) governance;
    mapping(address => bool) games;
    mapping(address => bool) rngAuthorized;
    mapping(address => bool) oracleAuthorized;
    mapping(address => bool) isRngOracle;
    mapping(address => bool) isOracle;

    bool staffEnabled = true;

    constructor(address _governance) {
        staff[msg.sender] = true;
        governance[_governance] = true;
    }

    /**
        MODIFIERS
     */
    modifier onlyGovernance() {
        require(
            governance[msg.sender],
            "Only governance can call this function"
        );
        _;
    }

    modifier onlyStaffOrGovernance() {
        require(
            staff[msg.sender] || governance[msg.sender],
            "Only staff or governance can call this function"
        );
        require(staffEnabled, "Staff is disabled");
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
        @param _game Address of the game to add
     */
    function addAuthorizedGame(address _game) public onlyStaffOrGovernance {
        games[_game] = true;
    }

    /**
        remove a game from the authorized games list. This removes access to the treasury and paying winners
        @param _game Address of the game to remove
     */
    function removeAuthorizedGame(address _game) public onlyStaffOrGovernance {
        games[_game] = false;
    }

    /** 
        Allow a game to call oracle RNGs this means the games will be required to pay the oracle to the treasury
        @param _game Address of the game to add
     */
    function addGameToRng(address _game)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        rngAuthorized[_game] = true;
    }

    /**
        Allow a game to call other oracles this means the games will be required to pay the oracle to the treasury
        @param _game Address of the game to add
     */
    function addGameToOracle(address _game)
        public
        onlyStaffOrGovernance
        authorizedGame(_game)
    {
        oracleAuthorized[_game] = true;
    }

    /**
        Disable the staff from taking actions. Means any action must be taken by the governance
     */
    function disableStaff() public onlyGovernance {
        staffEnabled = false;
    }

    /**
        Enable the staff from taking actions. Gives power back to the staff alongside governance
     */
    function enableStaff() public onlyGovernance {
        staffEnabled = true;
    }

    function addRng(address _rng) public onlyStaffOrGovernance {
        isRngOracle[_rng] = true;
    }

    function removeRng(address _rng) public onlyStaffOrGovernance {
        isRngOracle[_rng] = false;
    }

    function addOracle(address _oracle) public onlyStaffOrGovernance {
        isOracle[_oracle] = true;
    }

    function removeOracle(address _oracle) public onlyStaffOrGovernance {
        isOracle[_oracle] = false;
    }

    /**
        View Funcs
     */

    /**
        these functions are view functions that are called by thew different contracts to ensure they are authorized
        for specific actions
        true if the address is authorized to call the function 
     */

    function isAuthoziedGame(address _game) public view returns (bool) {
        return games[_game];
    }

    function isAuthorizedRNG(address _rng) public view returns (bool) {
        return rngAuthorized[_rng];
    }

    function isAuthorizedOracle(address _oracle) public view returns (bool) {
        return oracleAuthorized[_oracle];
    }

    function isStaff(address _staff) public view returns (bool) {
        return staff[_staff];
    }

    function isStaffEnabled() public view returns (bool) {
        return staffEnabled;
    }

    function isOfficialRng(address _rng) public view returns (bool) {
        return isRngOracle[_rng];
    }

    function isOfficialOracle(address _oracle) public view returns (bool) {
        return isOracle[_oracle];
    }

    function isStaffOrGovApproved(address _requester)
        public
        view
        returns (bool)
    {
        if (staffEnabled) {
            return staff[_requester] || governance[_requester];
        } else {
            return governance[_requester];
        }
    }
}

interface IGambitAuthorization {
    function isAuthoziedGame(address _game) external view returns (bool);

    function isAuthorizedRNG(address _rng) external view returns (bool);

    function isAuthorizedOracle(address _oracle) external view returns (bool);

    function isStaff(address _staff) external view returns (bool);

    function isStaffEnabled() external view returns (bool);

    function isOfficialRng(address _rng) external view returns (bool);

    function isOfficialOracle(address _oracle) external view returns (bool);

    function isStaffOrGovApproved(address _requester)
        external
        view
        returns (bool);

    
}
