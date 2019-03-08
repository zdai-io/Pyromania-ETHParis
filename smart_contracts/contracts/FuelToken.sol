pragma solidity >=0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";


contract FuelToken is ERC20, ERC20Detailed {
  constructor() ERC20Detailed("FuelToken", "FUEL", 18) public {
    _mint(msg.sender, 1000 * 1e18);
  }
}