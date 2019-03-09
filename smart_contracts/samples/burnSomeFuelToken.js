const env = process.env;
if (env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3(new HDWalletProvider(env.MNEMONIC, env.ETHEREUM_RPC, 0, 10));

const toBN = web3.utils.toBN;
const toWei = web3.utils.toWei;
const fromWei = web3.utils.fromWei;


(async () => {
  const accounts = await web3.eth.getAccounts();
  const netid = await web3.eth.net.getId();
  const furanceData = JSON.parse(fs.readFileSync("build/contracts/Furance.json", "utf8"));
  const fuelData = JSON.parse(fs.readFileSync("build/contracts/FuelToken.json", "utf8"));
  const pyroData = JSON.parse(fs.readFileSync("build/contracts/PyroToken.json", "utf8"));


  const furance = new web3.eth.Contract(furanceData.abi, furanceData.networks[netid].address, { from: accounts[0] });
  const fuel = new web3.eth.Contract(fuelData.abi, fuelData.networks[netid].address, { from: accounts[0] });
  const pyro = new web3.eth.Contract(pyroData.abi, pyroData.networks[netid].address, { from: accounts[0] });



  let burnAmount = toWei("4");
  await fuel.methods.increaseAllowance(furance.options.address, burnAmount).send();
  let estimated = await furance.methods.estimateMintAmount(fuel.options.address, burnAmount).call();
  console.log(`Burning ${fromWei(burnAmount)} fuel tokens. Estimated mint of pyroToken is ${fromWei(estimated)}.`);
  estimated = toBN(0);
  let balanceBefore = await pyro.methods.balanceOf(accounts[0]).call();


  await furance.methods.burn(fuel.options.address, burnAmount, toBN(estimated).mul(toBN("9")).div(toBN("10"))
      .toString()).send();


  let balanceAfter = await pyro.methods.balanceOf(accounts[0]).call();

  console.log(`Burned ${fromWei(burnAmount)} fuel tokens. Minted ${fromWei(toBN(balanceAfter).sub(toBN(balanceBefore)))} pyro tokens.`);


  process.exit();
})();
