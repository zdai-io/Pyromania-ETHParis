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

  let furance_token_data = [
    ["CAT", "BitClave", "1183111", "2000000000", "0x1234567461d3f8db7496581774bd869c83d51c93"],
    ["TNS", "Transcodium", "204993", "88600000", "0xb0280743b44bf7db4b6be482b2ba7b75e5da096c"],
    ["BCS", "BCShop.io", "685000", "10000000", "0x98bde3a768401260e7025faf9947ef1b81295519"],
    ["AC", "Aeternity", "120344121", "273685830", "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]
  ]
  let furance_tokens = [['CAT', '0x1234567461d3f8db7496581774bd869c83d51c93', '4893006001866875904', '5915553000000000', '200000000000000000000000000'], ['TNS', '0xb0280743b44bf7db4b6be482b2ba7b75e5da096c', '6243227342523890688', '23136907449209932', '8860000000000000000000000'], ['BCS', '0x98bde3a768401260e7025faf9947ef1b81295519', '45929283015921950720', '685000000000000000', '1000000000000000000000000'], ['AC', '0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d', '423656857373425401856', '4397163017171915264', '27368583000000000000000000']]

  for (let i in furance_tokens) {
    let token = furance_tokens[i];
    await furance.methods.addFuel(fuel.options.address, token[2], token[3], token[4]).send()

    let burnAmount = toBN(furance_token_data[i][3]).mul(toBN("1000000000000000000")).div(toBN(furance_token_data[i][2])).toString();
    await fuel.methods.increaseAllowance(furance.options.address, burnAmount).send();
    let estimated = await furance.methods.estimateMintAmount(fuel.options.address, burnAmount).call();
    console.log(`Burning ${fromWei(burnAmount)} fuel tokens. Estimated mint of pyroToken is ${fromWei(estimated)}.`);
    estimated = toBN(0);
    let balanceBefore = await pyro.methods.balanceOf(accounts[0]).call();
    await furance.methods.burn(fuel.options.address, burnAmount, toBN(estimated).mul(toBN("9")).div(toBN("10")).toString()).send();
    let balanceAfter = await pyro.methods.balanceOf(accounts[0]).call();
    console.log(`Burned ${fromWei(burnAmount)} fuel tokens. Minted ${fromWei(toBN(balanceAfter).sub(toBN(balanceBefore)))} pyro tokens.`);

  }







  process.exit();
})();