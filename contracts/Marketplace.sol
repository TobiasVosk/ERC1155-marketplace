pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";
import "./TokenERC1155.sol";

struct Order {
    address orderCreator;
    uint quantity;
    uint price;
}

/// @title A Marketplace for making orders to sell and buying ERC1155 tokens at a fixed price of an ERC20 token
/// @author Tobias Voskoboinik
contract Marketplace is ERC1155Receiver{
    using SafeMath for uint256;
    using SafeMath for uint;

    IERC20 public erc20Instance;
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

    /// @param _erc20Instance The instance of ERC20 that will be use to trade with de ERC1155 token
    /// @param _collectibleInstance The instance of ERC115 that will be use to trade with de ERC20 token
    constructor(IERC20 _erc20Instance, TokenERC1155 _collectibleInstance) public ERC1155Receiver(){
        erc20Instance = _erc20Instance;
        collectibleInstance = _collectibleInstance;
    }

    /// @notice Buy an order already created of an ERC1155 token with id collectibleId
    /// @param collectibleId The id of the collectible to buy
    function buy(uint collectibleId) public {
        require(orders[collectibleId].orderCreator != address(0x0), "There are no open orders for that collectible");
        Order memory order = orders[collectibleId];
        erc20Instance.transferFrom(msg.sender, order.orderCreator, order.quantity.mul(order.price));
        collectibleInstance.safeTransferFrom(address(this), msg.sender,collectibleId,order.quantity,'0x');
        emit CollectibleBought(msg.sender, order.orderCreator, address(collectibleInstance), collectibleId, order.quantity, order.price);
    } 

    /// @notice Add an order to sell an amount of ERC1155 tokens with id collectibleId at a fixed price
    /// @param collectibleId The id of the collectible to sell
    /// @param quantity The quantity of the collectible to sell
    /// @param price The price for each collectible to sell
    function addOrder(uint collectibleId, uint quantity, uint price) public {
        require(orders[collectibleId].orderCreator == address(0x0), "There already is an open order for that collectibleId");
        Order memory order = orders[collectibleId];
        collectibleInstance.safeTransferFrom(msg.sender,address(this),collectibleId,quantity,'0x');
        orders[collectibleId] = Order(msg.sender, quantity, price);
        emit OrderCreated(msg.sender, collectibleId, quantity, price);
    } 

    /// @notice Get an already created order
    /// @param collectibleId The id of the collectible of the order to get
    /// @return the address of the creator of the order, the quantity of collectibleId of the order and the price of each collectibleId
    function getOrder(uint collectibleId) public view returns ( address, uint, uint ) {
        require(orders[collectibleId].orderCreator != address(0x0), "There are no open orders for that collectibleId");
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
