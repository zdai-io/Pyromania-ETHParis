pragma solidity >=0.5.2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

interface IFurance {
  function bindRoot() external returns(bool);
  function bindPyro(address pyro) external returns(bool);
}

interface IPyroToken {
  function bindRoot() external returns(bool);
  function addFurance(address furance_) external returns(bool);
}

contract Root is Ownable {
  uint public mode = 0;
  uint constant MODE_HACKATHON = 0;
  uint constant MODE_PRODUCTION = 1;

  IPyroToken public pyro;

  modifier onlyHack {
    require(mode==MODE_HACKATHON);
    _;
  }

  function bindPyro(address pyro_) onlyOwner onlyHack public returns(bool) {
    require(address(pyro)==address(0));
    pyro = IPyroToken(pyro_);
    require(pyro.bindRoot());
    return true;
  }

  function addFurance(address furance_) onlyOwner onlyHack public returns(bool) {
    require(address(pyro)!=address(0));
    IFurance furance = IFurance(furance_);
    require(furance.bindRoot());
    require(furance.bindPyro(address(pyro)));
    require(pyro.addFurance(furance_));
    return true;
  }

  function upgradeToProduction() onlyOwner onlyHack public returns(bool) {
    mode=MODE_PRODUCTION;
    return true;
  }


}