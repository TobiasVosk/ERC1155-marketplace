# TokenERC1155.sol
This contract allows you to mint collectibles with sequantial ids for 1 eth each. 



## The mint() function called with a round amount of eth as value mints the amount of eth sent as a collectible for the sender



# ERC1155-marketplace
A marketplace for a fixed price exchange between dai and an ERC1155 token



## The buy(uint collectibleId) function allows you to buy an already created order of the collectible 'collectibleId' at the price of the order for each collectible



## addOrder(uint collectibleId, uint quantity, uint price) allows you to add a new order for 'quantity' amount of collectible 'collectibleId' at a price of 'price' per unit of 'collectibleId'



## The getOrder(uint collectibleId) method finds an already created order for 'collectibleId' and returns (addressOfOwner, quantityOfCollectibleId, pricePerUnitOfCollectibleId)
