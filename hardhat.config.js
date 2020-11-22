require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "1ff8201638bf41a7839d6c5e639b258e";

const ROPSTEN_PRIVATE_KEY = "f9f2f5b27344a6cf70a23b7c722e0e24ad976edf16556fbf452e706b8185e9f6";

const SECOND_ACCOUNT_PK = "835fdac3de5a4ba8fa70e631e1d4bd8a336bb944b7a96c5d668ac1278ed13942"

module.exports = {
  solidity: '0.7.4',
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`, `0x${SECOND_ACCOUNT_PK}`]
    }
  }
};
