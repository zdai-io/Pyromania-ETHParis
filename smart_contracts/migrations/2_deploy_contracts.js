const PyroToken = artifacts.require('PyroToken');
const Furance = artifacts.require('Furance');
const FuelToken = artifacts.require('FuelToken');


module.exports = async function (deployer, network, accounts) {
  const DECIMAL_MULTIPLIER = web3.utils.toBN("1000000000000000000");
  const operator = accounts[0];


  await deployer.deploy(PyroToken);
  const pyro = await PyroToken.deployed();
  await deployer.deploy(Furance);
  const furance = await Furance.deployed();
  await deployer.deploy(FuelToken);
  const fuel = await FuelToken.deployed();
  await pyro.addFurance(furance.address);
  await furance.addFuel(fuel.address, web3.utils.toWei("1"), web3.utils.toWei("2"), web3.utils.toWei("1000000"));
};
