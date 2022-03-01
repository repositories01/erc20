pragma solidity ^0.8.0;

import  "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ET", "") {
        _mint(msg.sender, initialSupply);
    }
}
   
