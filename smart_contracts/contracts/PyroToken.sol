pragma solidity >=0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IFurance {
  function bind() external returns(bool);
}

contract PyroToken is ERC20, ERC20Detailed, ERC20Mintable, Ownable {

  bool public isProduction;
  
  modifier notProduction() {
    require(!isProduction);
    _;
  }
 

  constructor() ERC20Detailed("PyroToken", "PYRO", 18) public {
    _removeMinter(msg.sender);
  }

  function upgradeToProduction() public onlyOwner notProduction returns(bool) {
    isProduction = true;
    return true;
  }

  function addFurance(address furance_) public onlyOwner notProduction returns(bool) {
    _addMinter(furance_);
    require(IFurance(furance_).bind());
    return true;   
  }




}