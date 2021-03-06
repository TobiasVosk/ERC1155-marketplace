const config = require('../config.json');
const e18 = ethers.BigNumber.from(10).pow(18);
const collectibleId = 9; //Change this with your desired collectibleId

async function main() {

    const [deployer, acc2] = await ethers.getSigners();
  
    console.log(
      `Creating order for collectibleId ${collectibleId} ERC1155 to address:`,
      acc2.address
    );

    const tokenERC1155 = await ethers.getContractAt('TokenERC1155', config.contracts.ropsten.erc1155.address, acc2);
    const marketplace = await ethers.getContractAt('Marketplace', config.contracts.ropsten.marketplace.address, deployer);
    await tokenERC1155.connect(acc2).setApprovalForAll(marketplace.address, true);
    await marketplace.connect(acc2).addOrder(collectibleId, 1, 100);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });