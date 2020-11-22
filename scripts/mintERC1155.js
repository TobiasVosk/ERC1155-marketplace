const config = require('../config.json');
const e18 = ethers.BigNumber.from(10).pow(18);


async function main() {

    const [deployer, acc2] = await ethers.getSigners();
  
    console.log(
      "Minting ERC1155 to address:",
      acc2.address
    );

    const tokenERC1155 = await ethers.getContractAt('TokenERC1155', config.contracts.ropsten.erc1155.address, acc2);
    const collectibleId = await tokenERC1155.connect(acc2).callStatic.mint({from: acc2.address, value: ethers.utils.parseEther('1')});
    await tokenERC1155.connect(acc2).mint({from: acc2.address, value: ethers.utils.parseEther('1')});
    console.log("Minted collectibleId", collectibleId.toNumber())
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });