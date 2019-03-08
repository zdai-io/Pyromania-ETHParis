const PyroToken = artifacts.require('PyroToken');
const Root = artifacts.require('Root');
const Furance = artifacts.require('Furance');
const FuelToken = artifacts.require('FuelToken');


module.exports = async function (deployer, network, accounts) {
  const DECIMAL_MULTIPLIER = web3.utils.toBN("1000000000000000000");
  const operator = accounts[0];

  await deployer.deploy(Root);
  const root = await Root.deployed();

  await deployer.deploy(PyroToken);
  const pyro = await PyroToken.deployed();

  await deployer.deploy(Furance);
  const furance = await Furance.deployed();

  await deployer.deploy(FuelToken);
  const fuel = await FuelToken.deployed();

  await root.bindPyro(pyro.address);
  await root.addFurance(furance.address);


  await furance.addFuel(fuel.address, web3.utils.toWei("1"), web3.utils.toWei("1"), web3.utils.toWei("1"));


  const estimated = await furance.estimateMintAmount(fuel.address, web3.utils.toWei("1"))
  console.log(web3.utils.fromWei(estimated));
  await fuel.increaseAllowance(furance.address, web3.utils.toWei("1"));

  await furance.burn(fuel.address, web3.utils.toWei("1"), estimated.mul(web3.utils.toBN("900000000000000000")).div(DECIMAL_MULTIPLIER));

  console.log(web3.utils.fromWei(await pyro.balanceOf(operator)));



};
