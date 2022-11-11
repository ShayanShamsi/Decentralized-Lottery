const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK to request a random number
const GAS_PRICE_LINK = 1e9 // Link per gas. Calculated value based on gas price.

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, logs } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            logs: true,
            args: args,
        })
        console.log("Mocks Deployed!")
        console.log("----------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
