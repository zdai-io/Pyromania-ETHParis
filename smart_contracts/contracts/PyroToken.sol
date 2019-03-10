pragma solidity >=0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IFurance {
  function bind() external returns(bool);
}


contract Mintable {
  using Roles for Roles.Role;

  event MinterAdded(address indexed account);
  event MinterRemoved(address indexed account);

  Roles.Role private _minters;

  constructor () internal {
  }

  modifier onlyMinter() {
    require(isMinter(msg.sender));
    _;
  }

  function isMinter(address account) public view returns (bool) {
    return _minters.has(account);
  }


  function _addMinter(address account) internal {
    _minters.add(account);
    emit MinterAdded(account);
  }

  function _removeMinter(address account) internal {
    _minters.remove(account);
    emit MinterRemoved(account);
  }
}


contract PyroToken is ERC20, ERC20Detailed, Mintable, Ownable {

  bool public isProduction;
  
  modifier notProduction() {
    require(!isProduction);
    _;
  }
 
  function mint(address to, uint256 value) public onlyMinter returns (bool) {
    _mint(to, value);
    return true;
  }
  
  constructor() ERC20Detailed("PyroToken", "PYRO", 18) public {
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