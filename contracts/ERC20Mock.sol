pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor() public ERC20("MOCK", "MOCK") {
        _mint(msg.sender, 10000);
    }

}