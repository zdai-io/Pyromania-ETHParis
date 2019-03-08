pragma solidity >=0.5.2;

/**
This is hackathon edition of our Furance contract. Will be replaced with production version later.
 */

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

interface IRoot {
}

interface IPyroToken {
  function mint(address, uint) external returns(bool);
}


contract Furance is Ownable {
  event Burn(address indexed sender, address indexed token, uint value, uint pyroValue);

  using SafeMath for uint;
  
  bool public powered;
  IRoot public root;
  IPyroToken public pyro;

  uint constant alpha = 999892503784850936; // decay per block corresponds 0.5 decay per day
  

  uint constant DECIMAL_MULTIPLIER=1e18;

  function _sqrt(uint x) internal pure returns (uint y) {
    uint z = x >> 1 + (x & 1);
    y = x;
    while (z < y) {
      y = z;
      z = (x / z + z) >> 1;
    }
    y = y * 1e9;
  }

  function _pown(uint x, uint z) internal pure returns(uint) {
    uint res = DECIMAL_MULTIPLIER;
    uint t = z;
    uint bit;
    while (true) {
      t = z >> 1;
      bit = z - (t << 1);
      if (bit == 1)
        res = res.mul(x).div(DECIMAL_MULTIPLIER);
      if (t==0) break;
      z = t; 
      x = x.mul(x).div(DECIMAL_MULTIPLIER);
    }
    return res;
  }


  struct token {
    bool enabled;
    uint a; //mintable performance parameter, depending for market capitalization
    uint b; //tokens burned
    uint c; //tokens minted
    uint r; //burnrate
    uint kappa_0; //initial kappa
    uint w; //weight of initial kappa
    uint blockNumber;
  }

  mapping(address=>token) tokens;

  modifier onlyPowered {
    require(powered);
    _;
  }

  function switchOff() public onlyOwner onlyPowered returns(bool) {
    powered=false;
  }

  function bindRoot() public returns(bool) {
    require(address(root)==address(0));
    root=IRoot(msg.sender);
    return true;
  }

  function bindPyro(address pyro_) public returns(bool) {
    require(msg.sender == address(root));
    pyro = IPyroToken(pyro_);
  }

  function _kappa(token storage t) internal view returns(uint) {
    return (t.c + t.kappa_0 * t.w) / (t.b + t.w);
  }


  function estimateMintAmount(address token_, uint value) public view returns(uint) {
    token storage t = tokens[token_];
    uint b_i = value;
    uint r_is = t.r * _pown(alpha, t.blockNumber - block.number) / DECIMAL_MULTIPLIER;
    uint r_i = r_is + value;
    uint c_i = t.a*(_sqrt(r_i) - _sqrt(r_is));
    uint kappa = _kappa(t);
    if (c_i > b_i*kappa) c_i = b_i*kappa;
    return c_i;
  }



  function burn(address token_, uint value, uint minimalPyroValue) public returns (bool) {
    require(IERC20(token_).transferFrom(msg.sender, address(this), value));
    token storage t = tokens[token_];
    require(t.enabled);
    uint b_i = value;
    uint r_is = t.r * _pown(alpha, t.blockNumber - block.number) / DECIMAL_MULTIPLIER;
    uint r_i = r_is + value;
    uint c_i = t.a*(_sqrt(r_i) - _sqrt(r_is));
    uint kappa = _kappa(t);
    if (c_i > b_i*kappa) c_i = b_i*kappa;
    require(c_i >= minimalPyroValue);
    t.b += b_i;
    t.c += c_i;
    t.r = r_i;
    t.blockNumber = block.number;
    pyro.mint(msg.sender, c_i);
    emit Burn(msg.sender, token_, value, c_i);
    return true;
  } 

}