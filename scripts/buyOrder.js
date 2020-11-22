const config = require('../config.json');
const e18 = ethers.BigNumber.from(10).pow(18);
const collectibleId = 9; //Change this with your desired collectibleId

async function main() {

    const [deployer, acc2] = await ethers.getSigners();
  
    console.log(
      `Creating order for collectibleId ${collectibleId} ERC1155 to address:`,
      acc2.address
    );

    const tokenERC20 = await ethers.getContractAt('ERC20Mock', config.contracts.ropsten.erc20.address, acc2);
    const marketplace = await ethers.getContractAt('Marketplace', config.contracts.ropsten.marketplace.address, deployer);
    await tokenERC20.connect(acc2).approve(marketplace.address, e18.mul(10000));
    await marketplace.connect(acc2).buy(collectibleId);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });