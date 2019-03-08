pragma solidity >=0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";


interface IRoot {
}


contract PyroToken is ERC20, ERC20Detailed, ERC20Mintable {
  event AddFurance(address furance);

  IRoot public root;
 

  constructor() ERC20Detailed("PyroToken", "PYRO", 18) public {
    _removeMinter(msg.sender);
  }

  function bindRoot() public returns(bool) {
    require(address(root)==address(0));
    root=IRoot(msg.sender);
    return true;
  }

  function addFurance(address furance_) public returns(bool) {
    require(msg.sender == address(root));
    _addMinter(furance_);
    emit AddFurance(furance_);
    return true;   
  }




}