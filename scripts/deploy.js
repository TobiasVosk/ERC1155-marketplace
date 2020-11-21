async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());

    TokenERC20 = await ethers.getContractFactory("ERC20Mock");
    hardhatTokenERC20 = await TokenERC20.deploy();

    TokenERC1155 = await ethers.getContractFactory("TokenERC1155");
    hardhatToken = await TokenERC1155.deploy();

    Marketplace = await ethers.getContractFactory("Marketplace");
    hardhatMarketplace = await Marketplace.deploy(hardhatTokenERC20.address, hardhatToken.address);

    console.log("ERC20 address:", hardhatTokenERC20.address);
    console.log("ERC1155 address:", hardhatToken.address);
    console.log("Marketplace address:", hardhatMarketplace.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });