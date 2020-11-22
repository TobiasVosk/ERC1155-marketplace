const config = require('../config.json');
const e18 = ethers.BigNumber.from(10).pow(18);
const collectibleId = 1; //Change this with your desired collectibleId

async function main() {

    const [deployer, acc2] = await ethers.getSigners();
  
    console.log(
      `Creating order for collectibleId ${colectibleId} ERC1155 to address:`,
      acc2.address
    );

    const tokenERC20 = await ethers.getContractAt('ERC20Mock', config.contracts.ropsten.erc20.address, deployer);
    const marketplace = await ethers.getContractAt('Marketplace', config.contracts.ropsten.marketplace.address, deployer);
    await tokenERC20.connect(addr2).setApprovalForAll(marketplace.address, true);
    await marketplace.connect(addr2).addOrder(collectibleId, 1, 100);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });