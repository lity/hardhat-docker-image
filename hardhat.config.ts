import { ethers } from 'ethers'
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task('set-balance', 'set balance of an address to some value')
  .addPositionalParam('address')
  .addPositionalParam('value')
  .setAction(async (taskArgs, hre) => {
    console.log(`network: ${hre.network.name}`)

    if (hre.network.name == 'localhost') {
      await hre.network.provider.send('hardhat_setBalance', [
        taskArgs.address,
        ethers.utils.parseEther(`${taskArgs.value}`).toHexString().replace(/^0x0+/, '0x'),
      ])
      console.log(`balance of ${taskArgs.address}: `, await hre.ethers.provider.getBalance(taskArgs.address))
    } else {
      console.log(`hardhat_setBalance is unavailable on non-hardhat network`)
    }
  })

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    }
  }
};

export default config;
