// We import Chai to use its asserting functions here.
const { expect } = require("chai");

const e18 = ethers.BigNumber.from(10).pow(18);

function toWei(n) {
  return web3.utils.toWei(n, 'ether')
}

describe("TokenERC1155 contract", function () {

  let TokenERC20;
  let TokenERC1155;
  let hardhatTokenERC20;
  let hardhatToken;
  let Marketplace;
  let hardhatMarketplace;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    //Add ERC20 token
    TokenERC20 = await ethers.getContractFactory("ERC20Mock");
    hardhatTokenERC20 = await TokenERC20.deploy();

    TokenERC1155 = await ethers.getContractFactory("TokenERC1155");
    hardhatToken = await TokenERC1155.deploy();

    Marketplace = await ethers.getContractFactory("Marketplace");
    hardhatMarketplace = await Marketplace.deploy(hardhatTokenERC20.address, hardhatToken.address);
  });

  describe("Add order", function () {
    it("Should deposit the intended amount at the intended price", async function () {
      await hardhatToken.connect(addr1).mint({value: e18.mul(1)});
      await hardhatToken.connect(addr1).setApprovalForAll(hardhatMarketplace.address, true);

      await hardhatMarketplace.connect(addr1).addOrder(1, 1, 100);

      marketplaceBalance = await hardhatToken.balanceOf(hardhatMarketplace.address, 1);
      expect(marketplaceBalance).to.equal(1);

      let [orderCreator, quantity, price] = await hardhatMarketplace.getOrder(1)
      expect(orderCreator).to.equal(addr1.address);
      expect(quantity.toNumber()).to.equal(1);
      expect(price.toNumber()).to.equal(100);
    });

  })
});