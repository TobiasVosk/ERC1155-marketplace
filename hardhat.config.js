require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "1ff8201638bf41a7839d6c5e639b258e";

const ROPSTEN_PRIVATE_KEY = "f9f2f5b27344a6cf70a23b7c722e0e24ad976edf16556fbf452e706b8185e9f6";

module.exports = {
  solidity: {
    version: '0.7.4',
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
