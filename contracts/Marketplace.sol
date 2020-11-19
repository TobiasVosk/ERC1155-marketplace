pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";
import "./TokenERC1155.sol";

struct Order {
    address orderCreator;
    uint quantity;
    uint price;
}

contract Marketplace is ERC1155Receiver{
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
      uint collectibleId,
      uint quantity,
      uint price
   );

    constructor(IERC20 _daiInstance, TokenERC1155 _collectibleInstance) public ERC1155Receiver(){
        daiInstance = _daiInstance;
        collectibleInstance = _collectibleInstance;
    }

    function buy(uint collectibleId) public {
        require(orders[collectibleId].orderCreator != address(0x0), "There are no open orders for that collectible");
        Order memory order = orders[collectibleId];
        daiInstance.transferFrom(msg.sender, order.orderCreator, order.quantity.mul(order.price));
        collectibleInstance.safeTransferFrom(address(this), msg.sender,collectibleId,order.quantity,'0x');
        emit CollectibleBought(msg.sender, order.orderCreator, address(collectibleInstance), collectibleId, order.quantity, order.price);
    } 

    function addOrder(uint collectibleId, uint quantity, uint price) public {
        require(orders[collectibleId].orderCreator == address(0x0), "There already is an open order for that collectible");
        Order memory order = orders[collectibleId];
        collectibleInstance.safeTransferFrom(msg.sender,address(this),collectibleId,quantity,'0x');
        orders[collectibleId] = Order(msg.sender, quantity, price);
        emit OrderCreated(msg.sender, collectibleId, quantity, price);
    } 

    function getOrder(uint collectibleId) public view returns ( address, uint, uint ) {
        require(orders[collectibleId].orderCreator != address(0x0), "There are no open orders for that collectible");
        Order memory order = orders[collectibleId];
        return (order.orderCreator, order.quantity, order.price);
    } 

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external override returns (bytes4) {
        return (
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            )
        );
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external override returns (bytes4) {
        //Not allowed
        revert();
        return "";
    }
    
}
