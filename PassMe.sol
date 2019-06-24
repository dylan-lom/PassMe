pragma solidity ^0.5.1;

contract PassMe {
    // EVENTS
    event PassAdded(uint64 id); // used to trigger events in Web3
    
    address public owner;
    uint passMeFee = 0.0002 ether;
    
    // Data structure to store passwords
    struct Pass {
        uint16 metadata;
        bytes href;
        bytes pass;
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
    function addPass(uint16 _metadata, bytes calldata _href, bytes calldata _pass) external payable payFee {
        uint64 id = uint64(passwds.push(Pass(_metadata, _href, _pass)));
        passToOwner[id] = msg.sender;
        ownerPasswds[msg.sender].push(id);
        emit PassAdded(id);
    }
    
    // _VIEW_
    function getPassCount() external view returns (uint64) {
        return uint64(passwds.length);
    }
    
    function getPass(uint64 _passId) external onlyOwnerOf(_passId) view returns (uint16, bytes memory, bytes memory) {
        return (passwds[_passId].metadata, passwds[_passId].href, passwds[_passId].pass);
    }
}