const env = process.env;
if (env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const HDWalletProvider = require('truffle-hdwallet-provider');

const web3 = new Web3(new HDWalletProvider(env.MNEMONIC, env.ETHEREUM_RPC, 0, 10));

const toBN = web3.utils.toBN;
const toWei = web3.utils.toWei;
const fromWei = web3.utils.fromWei;


(async () => {
  const accounts = await web3.eth.getAccounts();
  const netid = await web3.eth.net.getId();
  const furanceData = JSON.parse(fs.readFileSync("eth/contracts/Furance.json", "utf8"));
  const fuelData = JSON.parse(fs.readFileSync("eth/contracts/FuelToken.json", "utf8"));


  async function isUnlocked(token, owner, spender) {
    const allowance = await token.methods.allowance(owner, spender).call();
    return toBN(allowance).gte(toBN("57896044618658097711785492504343953926634992332820282019728792003956564819968"));
  }

  async function unlock(token, spender) {
    await token.methods.increaseAllowance(spender, "57896044618658097711785492504343953926634992332820282019728792003956564819968").send();
  }



  const furance = new web3.eth.Contract(furanceData.abi, furanceData.networks[netid].address, { from: accounts[0] });
  const fuel = new web3.eth.Contract(fuelData.abi, fuelData.networks[netid].address, { from: accounts[0] });

  let unlocked = await isUnlocked(fuel, accounts[0], furance.options.address);
  if (unlocked) {
    console.log("Fuel token is unlocked!");
  } else {
    console.log("Unlocking fuel token...");
    await unlock(fuel, furance.options.address);
    unlocked = await isUnlocked(fuel, accounts[0], furance.options.address);
    if (unlocked) {
      console.log("Unlocked!");
    } else {
      console.log("Something goes wrong!");
    }

  }

  process.exit();
})();