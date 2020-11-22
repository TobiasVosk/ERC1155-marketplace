const config = require('../config.json');
const e18 = ethers.BigNumber.from(10).pow(18);


async function main() {

    const [deployer, acc2] = await ethers.getSigners();
  
    console.log(
      "Minting ERC20 to address:",
      acc2.address
    );

    const marketplace = await ethers.getContractAt('Marketplace', config.contracts.ropsten.marketplace.address, deployer);
    const tokenERC20 = await ethers.getContractAt('ERC20Mock', config.contracts.ropsten.erc20.address, acc2);
    await tokenERC20.connect(acc2).mint(e18.mul(10000));
    await tokenERC20.connect(acc2).approve(marketplace.address, e18.mul(10000));

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });