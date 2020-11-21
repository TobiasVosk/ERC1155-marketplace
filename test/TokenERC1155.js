// We import Chai to use its asserting functions here.
const { expect } = require("chai");

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
    it("Should mint the amount of eth sent in sequential order", async function () {
      await hardhatToken.connect(addr1).mint({value: ethers.utils.parseEther('1')});
      let addr1Balance = await hardhatToken.balanceOf(addr1.address, 1);
      expect(addr1Balance).to.equal(1);

      await hardhatToken.connect(addr1).mint({from: addr1.address, value: ethers.utils.parseEther('2')});
      addr1Balance = await hardhatToken.balanceOf(addr1.address, 2);
      expect(addr1Balance).to.equal(2);
    });

    it("Should fail if the amount of eth sent is not int", async function () {
      await expect(hardhatToken.connect(addr1).mint({from: addr1.address, value: ethers.utils.parseEther('1.5')})).to.be.revertedWith('Value must be an integer in ETH.');
    });
    
  })

  describe("Transfering", function () {
    it("Should should transfer from one user to another", async function () {
      await hardhatToken.connect(addr1).mint({from: addr1.address, value: ethers.utils.parseEther('1')});
      let addr1Balance = await hardhatToken.balanceOf(addr1.address, 1);
      expect(addr1Balance).to.equal(1);

      await hardhatToken.connect(addr1).safeTransferFrom(addr1.address, addr2.address,1,1,'0x');
      let addr1BalanceAfter = await hardhatToken.balanceOf(addr1.address, 1);
      let addr2Balance = await hardhatToken.balanceOf(addr2.address, 1);

      expect(addr1BalanceAfter).to.equal(0);
      expect(addr2Balance).to.equal(1);
    });
  })
});