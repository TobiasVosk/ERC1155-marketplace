# TokenERC1155.sol
This contract allows you to mint collectibles with sequantial ids for 1 eth each. 



### The mint() function called with a round amount of eth as value mints the amount of eth sent as a collectible for the sender



# ERC1155-marketplace
A marketplace for a fixed price exchange between dai and an ERC1155 token



### The buy(uint collectibleId) function allows you to buy an already created order of the collectible 'collectibleId' at the price of the order for each collectible



### addOrder(uint collectibleId, uint quantity, uint price) allows you to add a new order for 'quantity' amount of collectible 'collectibleId' at a price of 'price' per unit of 'collectibleId'



### The getOrder(uint collectibleId) method finds an already created order for 'collectibleId' and returns (addressOfOwner, quantityOfCollectibleId, pricePerUnitOfCollectibleId)


# Deployed instance on ropsten:

Deployed contracts with the account: 0xC98D61E9707f6a674C700bB71afce8b007e9c60d

ERC20 address: 0xd01E4E0b0221bE5AC113db703eFfe501e8F07567

ERC1155 address: 0xaf8d21a29a6ea6879Ae67810b7bE24A5B59E1ca2

Marketplace address: 0x0743ccd456b2a21b526bdB33d57bD4aec4268998

# Deploy a new instance:

1) Change the ROPSTEN_PRIVATE_KEY variable on hardhat.config.js with your own private key
2) Get ropsten ethereum from https://faucet.dimensions.network/
3) Run command: npx hardhat run scripts/deploy.js --network ropsten
