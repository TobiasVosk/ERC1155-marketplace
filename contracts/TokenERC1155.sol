pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TokenERC1155 is ERC1155 {
    using SafeMath for uint256;

    uint256 public constant COLLECTIBLE = 0;
    uint256 public constant etherValue = 1e18;

    constructor() public ERC1155("") {}

    function mint() public payable {
        require(msg.value >= 1 ether, "Value must be 1 or more for mint.");
        _mint(msg.sender, COLLECTIBLE, uint(msg.value.div(etherValue)), "");
    }

}