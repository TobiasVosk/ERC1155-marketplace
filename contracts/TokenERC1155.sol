pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TokenERC1155 is ERC1155 {
    using SafeMath for uint256;
    using SafeMath for uint;

    uint256 public constant etherValue = 1e18;
    uint public latestMinted = 0;

    constructor() public ERC1155("") {}

    function mint() public payable returns (uint) {
        require(msg.value >= 1 ether, "Value must be 1 or more eth for mint.");
        uint newId = latestMinted.add(1);
        _mint(msg.sender, newId, uint(msg.value.div(etherValue)), "");
        latestMinted = newId;
        return newId;
    }

}