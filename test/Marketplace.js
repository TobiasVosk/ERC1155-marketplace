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

    it("Should fail if the user doesn't have the amount especified", async function () {
      await hardhatToken.connect(addr2).setApprovalForAll(hardhatMarketplace.address, true);
      await expect(hardhatMarketplace.connect(addr2).addOrder(1, 1, 100)).to.be.revertedWith('insufficient balance for transfer');
    });

    it("Should fail if there is an order for that collectibleId already created", async function () {
      await hardhatToken.connect(addr1).mint({value: e18.mul(2)});
      await hardhatToken.connect(addr1).setApprovalForAll(hardhatMarketplace.address, true);

      await hardhatMarketplace.connect(addr1).addOrder(1, 1, 100);

      await expect(hardhatMarketplace.connect(addr1).addOrder(1, 1, 100)).to.be.revertedWith('There already is an open order for that collectibleId');
    });

  })

  describe("Get order", function () {
    it("Should fail if the order are no orders for that collectible", async function () {
      await expect(hardhatMarketplace.getOrder(0)).to.be.revertedWith('There are no open orders for that collectibleId')
    });

  })

  describe("Buy order", function () {
    it("Should buy the intended amount at the intended price", async function () {
      await hardhatToken.connect(addr1).mint({value: e18.mul(1)});
      await hardhatToken.connect(addr1).setApprovalForAll(hardhatMarketplace.address, true);

      await hardhatMarketplace.connect(addr1).addOrder(1, 1, 100);

      ownerERC20Balance = await hardhatTokenERC20.balanceOf(owner.address);
      addr1ERC20Balance = await hardhatTokenERC20.balanceOf(addr1.address);

      marketplaceBalance = await hardhatToken.balanceOf(hardhatMarketplace.address, 1);
      expect(marketplaceBalance).to.equal(1);

      await hardhatTokenERC20.approve(hardhatMarketplace.address, 100);

      await hardhatMarketplace.buy(1);

      ownerBalance = await hardhatToken.balanceOf(owner.address, 1);
      expect(ownerBalance).to.equal(1);

      ownerERC20NewBalance = await hardhatTokenERC20.balanceOf(owner.address);
      expect(ownerERC20NewBalance).to.equal(ownerERC20Balance - 100);

      addr1ERC20NewBalance = await hardhatTokenERC20.balanceOf(addr1.address);
      expect(addr1ERC20NewBalance).to.equal(addr1ERC20Balance + 100);

    });

    it("Should fail if there are no orders for that collectible", async function () {
      ownerERC20Balance = await hardhatTokenERC20.balanceOf(owner.address);

      await hardhatTokenERC20.approve(hardhatMarketplace.address, 100);

      await expect(hardhatMarketplace.buy(1)).to.be.revertedWith('There are no open orders for that collectible');
    });

    it("Should fail if the user doesn't have enough erc20 tokens", async function () {
      await hardhatToken.connect(addr1).mint({value: e18.mul(1)});
      await hardhatToken.connect(addr1).setApprovalForAll(hardhatMarketplace.address, true);

      await hardhatMarketplace.connect(addr1).addOrder(1, 1, 100);

      addr2ERC20Balance = await hardhatTokenERC20.balanceOf(addr2.address);

      await hardhatTokenERC20.approve(hardhatMarketplace.address, 100);

      await expect(hardhatMarketplace.connect(addr2).buy(1)).to.be.revertedWith('transfer amount exceeds balance');

      addr2ERC20NewBalance = await hardhatTokenERC20.balanceOf(addr2.address);

      await expect(addr2ERC20Balance.toNumber()).to.equal(addr2ERC20NewBalance.toNumber());

    });

  })


});