pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenERC1155.sol";

struct Order {
    address orderCreator;
    uint quantity;
    uint price;
}

contract Marketplace {
    using SafeMath for uint256;
    using SafeMath for uint;

    IERC20 public daiInstance;
    TokenERC1155 public collectibleInstance;

    mapping(uint => Order) public orders;


    event CollectibleBought(
        address account,
        address orderCreator,
        address token,
        uint collectibleId,
        uint quantity,
        uint price
   );

   event OrderCreated(
      address orderCreator,
      address collectibleId,
      uint quantity,
      uint price
   );

    constructor(IERC20 _daiInstance, TokenERC1155 _collectibleInstance) public {
        daiInstance = _daiInstance;
        collectibleInstance = _collectibleInstance;
    }

    function buy(uint collectibleId) public {
        require(orders[collectibleId].orderCreator != address(0x0), "There are no open orders for that collectible");
        Order memory order = orders[collectibleId];
        daiInstance.transferFrom(msg.sender, order.orderCreator, order.quantity.mul(order.price));
        collectibleInstance.safeTransferFrom(address(this), msg.sender,collectibleId,order.quantity,'0x');
        emit CollectibleBought(msg.sender, order.orderCreator, address(collectibleInstance), collectibleId, order.quantity, order.price)
    } 

    function addOrder(uint collectibleId, uint quantity, uint price) public {
        require(orders[collectibleId].orderCreator == address(0x0), "There already is an open order for that collectible");
        Order memory order = orders[collectibleId];
        collectibleInstance.safeTransferFrom(msg.sender,address(this),collectibleId,quantity,'0x');
        orders[collectibleId] = Order(msg.sender, quantity, price);
        emit OrderCreated(msg.sender, collectibleId, quantity, price)
    } 
    
}
