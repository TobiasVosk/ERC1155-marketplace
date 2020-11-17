// We import Chai to use its asserting functions here.
const { expect } = require("chai");

const e18 = ethers.BigNumber.from(10).pow(18);

function toWei(n) {
  return web3.utils.toWei(n, 'ether')
}

describe("TokenERC1155 contract", function () {

  let TokenERC1155;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    TokenERC1155 = await ethers.getContractFactory("TokenERC1155");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await TokenERC1155.deploy();
  });

  describe("Minting", function () {
    it("Should mint the amount of eth sent", async function () {
      await hardhatToken.connect(addr1).mint({from: addr1.address, value: e18.mul(1)});
      let addr1Balance = await hardhatToken.balanceOf(addr1.address, 0);
      expect(addr1Balance).to.equal(1);

      await hardhatToken.connect(addr1).mint({from: addr1.address, value: e18.mul(2)});
      console.log("minted")
      addr1Balance = await hardhatToken.balanceOf(addr1.address, 0);
      expect(addr1Balance).to.equal(3);
    });

    it("Should mint the amount of eth sent rounded to floor", async function () {
      await hardhatToken.connect(addr1).mint({from: addr1.address, value: e18.mul(1,5)});
      console.log("minted")
      const addr1Balance = await hardhatToken.balanceOf(addr1.address, 0);
      expect(addr1Balance).to.equal(1);
    });
  })
});