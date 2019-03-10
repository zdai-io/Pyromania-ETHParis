![What is dead may never DAI.
](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/logo_pure_time_moto.jpg?raw=true "What is dead may never DAI.
")

# Pyromania - Time to burn: 

## https://pyromania.io

## Our contracts at MainNet
https://etherscan.io/address/0x22f298b0c4d7bd8b939bc703a365b704df45e3a1 - Furance contract, burning tokens
https://etherscan.io/token/0x5e4dd41c7b32d6cf86fa6b511187fe97ed7b6acc - PYRO token, a new proof of burn cryptocurrency


## Inspiration

What is dead may never DAI.
There is a massive amount of tokens in ETH workspace. Some of them become almost useless.

## Benefits:

### Why it's good for the ecosystem:

1. As old furniture (sometimes) - Old tokens got collectible value! 🏺
2. We are free up ethereum `storage`. So `geth` will sync faster! 💥
3. Gas refunded for burned token :recycle:

### Why new tokens costs something?

1. It's an Art project "Proof of Burn". A new cryptocurrency with unique "proof of burn" algo (see Moon math details below)

2. Joint of liquidity bring more value.

### Earth math:

- When a lot tokens melted in one - is worth something.

- As more (by amount) you burn - as less you get.
Square root dependency:

1 🧸  = 1🔥

100 🧸 = 10🔥

10 000 🧸= 100🔥


- As fast (by day) people burn then - as fewer people get. (integral by T is there)


## What it does

We made 100% recyclable token: By deep-math crypto-economics under the hood - we buidl token, that cleanup whole blockchain ecosystem.

- Clean ethereum with burning tokens, shows how much storage saved
- Get's back pyro tokens, that worth money. And it even stable because of moon math under the hood!
- Easily buy required tokens to burn from our UI (by Bankor / 0x)

We did token analytics and pick some low trading tokens. (+ some token from 0x, with notable history)

> Aeternity
> Early contributors to ethereum branched out and chose to launch a separate blockchain. The project raised funds during an ICO in the midst of ERC-20 ICO-craze. However, ultimately, existing on a separate chain meant not being part of the ecosystem and the project remains obscure. The price of a token went up and down with the mania and wobbles around the ICO-levels. However, hardly there are any Dapps written in Sophia smart contract programming language that are known to the community.

![Liberty Leading the People](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/Liberty%20Leading%20the%20People_chart.jpg?raw=true "Liberty Leading the People
")

---

## Sponsors prozes:

### ENS Domain
https://etherscan.io/tx/0x9bf2066c2f79705bc73685168fda35a09daa56d73ce48bfaa64db9ef2cb1a2bc - ENS transaction for pyromania.eth. Please, do not bid it ;)

### 0x instant (http://0x.org/instant) 
We've done integration with 0x protocol. So you can easily buy any kind of tokens.

### Skale
We connect decentrlised hosting from Skale!
Here is a adresses to files:

> E1C12463ce9152a33fA758571595fF7fe2f047B6/index.html

> E1C12463ce9152a33fA758571595fF7fe2f047B6/0x.html

> E1C12463ce9152a33fA758571595fF7fe2f047B6/index2.html


## How we built it

Gang of four with super skills in solidity, node.js, ens, kubernetes, redis, 0x, skale do our best by working all day and night.

## Challenges we ran into

Cryptoeconimic math way differs from classic economic. Please look into the description for formula.

## Accomplishments that we're proud of

- Pure math under the hood
- Ability to clean up blockchain and free-up space


### Moon 🌒 math with formulas placed here:
 https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#

![Math](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/math2.png?raw=true "Math1")
![Math2](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/math1.png?raw=true "Math2")



## Pyromania math model (https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#)

We determine burnrate of the token as following recurrent formula:

$$ r_i = r_{i-1} \alpha^{\Delta t_i} + b_i$$

where $\Delta t_i$ is many blocks between burn events and $b_i$ is the amount of burned tokens at the current event, $\alpha$ is decay parameter, we set the decay as $0.5$ multiplier per day.

We estimate mint amount as

$$ c_i = a(\sqrt{r_i} - \sqrt{r_i - b_i}) $$.

$a$ is scaling parameter, we set it such, that estimated time to burn all token grows as the square root of token market cap.

If we get a situation when there is only one token-holder, he can emulate mint procedure by spending a little amount of token. To protect from this, we add a new variable $\kappa$ - this is the global price cap, so $c_i/b_i$ cannot be more than $\kappa$.

If $c_i/b_i > \kappa$, we redefine $c_i$ as $c_i = b_i\kappa$.

At each step we determine $\kappa = (\kappa_0 w + \sum_{i-1} c_i)/(w + \sum_{i-1} b_i)$, where

$\kappa_0$ and $\omega$ are initial parameters.


## What's next for Pyromania - Time to burn!

- Add voting system, to add new tokens

### Links:
- Here is token analytics, that we made: https://docs.google.com/spreadsheets/d/1P-UbU08wB2RcWa1g7hJWoUEzLh3r-RunKxJvWFQrFq0
- hackmd with Moon math under the hood: https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#
- The site posted here: https://Pyromania.io
