pragma solidity >=0.5.2;

/**
This is hackathon edition of our Furance contract. Will be replaced with production version later.
 */

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


interface IPyroToken {
  function mint(address, uint) external returns(bool);
}


contract Furance is Ownable {
  event Burn(address indexed sender, address indexed token, uint value, uint pyroValue);
  using SafeMath for uint;
  
  bool public extinguished;
  uint public ashes;
  IPyroToken public pyro;

  uint constant alpha = 999892503784850936; // decay per block corresponds 0.5 decay per day
  uint constant DECIMAL_MULTIPLIER=1e18;
  uint constant DECIMAL_HALFMULTIPLIER=1e9;


  function _sqrt(uint x) internal pure returns (uint y) {
    uint z = (x + 1) >> 1;
    if ( x+1 == 0) z = 1<<255;
    y = x;
    while (z < y) {
      y = z;
      z = (x / z + z) >> 1;
    }
    y = y * DECIMAL_HALFMULTIPLIER;
  }

  /* solium-disable-next-line */
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

  modifier notExitgushed {
    require(!extinguished);
    _;
  }

  function exitgush() public onlyOwner notExitgushed returns(bool) {
    extinguished=true;
    return true;
  }


  function bind() public returns(bool) {
    require(address(0) == address(pyro));
    pyro = IPyroToken(msg.sender);
    return true;
  }

  function _kappa(token storage t) internal view returns(uint) {
    return (t.c + t.kappa_0 * t.w / DECIMAL_MULTIPLIER) * DECIMAL_MULTIPLIER / (t.b + t.w);
  }


  function estimateMintAmount(address token_, uint value) public view returns(uint) {
    token storage t = tokens[token_];
    uint b_i = value;
    uint r_is = t.r * _pown(alpha, block.number - t.blockNumber) / DECIMAL_MULTIPLIER;
    uint r_i = r_is + value;
    uint c_i = t.a*(_sqrt(r_i) - _sqrt(r_is))/ DECIMAL_MULTIPLIER;
    uint kappa = _kappa(t);
    if (c_i > b_i*kappa/DECIMAL_MULTIPLIER) c_i = b_i*kappa/DECIMAL_MULTIPLIER;
    return c_i;
  }

  function getTokenState(address token_) public view returns(uint, uint, uint, uint, uint, uint) {
    token storage t = tokens[token_];
    return (t.a, t.b, t.c, t.r, _kappa(t), t.blockNumber);
  }

  function burn(address token_, uint value, uint minimalPyroValue) public notExitgushed returns (bool) {
    require(value > 0);
    require(IERC20(token_).transferFrom(msg.sender, address(this), value));
    token storage t = tokens[token_];
    require(t.enabled);
    uint b_i = value;
    uint r_is = t.r * _pown(alpha, block.number - t.blockNumber) / DECIMAL_MULTIPLIER;
    uint r_i = r_is + b_i;
    uint c_i = t.a*(_sqrt(r_i) - _sqrt(r_is)) / DECIMAL_MULTIPLIER;
    uint kappa = _kappa(t);
    if (c_i > b_i*kappa/DECIMAL_MULTIPLIER) c_i = b_i*kappa/DECIMAL_MULTIPLIER;
    require(c_i >= minimalPyroValue);
    t.b += b_i;
    t.c += c_i;
    t.r = r_i;
    t.blockNumber = block.number;
    if (IERC20(token_).balanceOf(msg.sender)==0) ashes+=1;
    pyro.mint(msg.sender, c_i);
    pyro.mint(owner(), c_i/10);
    emit Burn(msg.sender, token_, b_i, c_i);
    return true;
  } 

  function addFuel(address token_, uint a, uint kappa0, uint w) public onlyOwner notExitgushed returns (bool) {
    tokens[token_] = token(true, a, 0, 0, 0, kappa0, w, block.number);
  }

}