pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2; //required to return arrays of strings

// PassMe, by Dylan Lom
// v0.3
// Forked from NoteChain

contract PassMe {
    // EVENTS
    event PassAdded(uint64 id); // used to trigger events in Web3

    address public owner;
    uint passMeFee = 0.0002 ether;

    // Data structure to store passwords
    struct Pass {
        uint16 metadata;
        string href; //unfortunately, these will have to be strings (i think)
        string pass;
    }

    // array of saved passwords
    Pass[] private passwds;

    //not sure
    mapping (uint64 => address) private passToOwner; //asocciate password with address that created it
    mapping (address => uint64[]) private ownerPasswds;

    // MODIFIERS
    modifier onlyOwner() { // only owner (of contract?)
        require(msg.sender == owner);
        _;
    }

    modifier onlyOwnerOf(uint64 _passId) { //only owner of note
        require(msg.sender == passToOwner[_passId]);
        _;
    }

    modifier payFee() { // msg value is enough to run contract
        require(msg.value >= passMeFee);
        _;
    }

    // CONSTRUCTOR
    constructor() public {
        owner = msg.sender;
    }

    // FUNCTIONS

    // PASS RELATED
    // _PAYABLE_
    function addPass(uint16 _metadata, string calldata _href, string calldata _pass) external payable payFee {
        uint64 id = uint64(passwds.push(Pass(_metadata, _href, _pass)));
        passToOwner[id] = msg.sender;
        ownerPasswds[msg.sender].push(id);
        emit PassAdded(id);
    }

    // _VIEW_
    function getPassCount() external view returns (uint64) {
        return uint64(passwds.length);
    }

    function getPass(uint64 _passId) external view returns (uint16, string memory, string memory) {
        return (passwds[_passId].metadata, passwds[_passId].href, passwds[_passId].pass);
    }

    function getPasswds() external view returns (uint64[] memory) {
        return ownerPasswds[msg.sender];
    }

    function getPassVault() external view returns (Pass[] memory) {
        Pass[] memory vault;
        for (uint i=0; i < ownerPasswds[msg.sender].length; i++){
            vault[i].metadata = passwds[ownerPasswds[msg.sender][i]].metadata;
            vault[i].href = passwds[ownerPasswds[msg.sender][i]].href;
            vault[i].pass = passwds[ownerPasswds[msg.sender][i]].pass;
        }
        return vault;
    }
}
