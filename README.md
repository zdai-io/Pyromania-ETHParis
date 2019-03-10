![What is dead may never DAI.
](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/logo_pure_time_moto.jpg?raw=true "What is dead may never DAI.
")

# Pyromania - Time to burn:

## https://pyromania.io

## Our contracts at MainNet
https://etherscan.io/address/0x22f298b0c4d7bd8b939bc703a365b704df45e3a1 - Furance contract, burning tokens
https://etherscan.io/token/0x5e4dd41c7b32d6cf86fa6b511187fe97ed7b6acc - PYRO token, a new proof of burn cryptocurrency


---
# Inspiration

What is dead may never DAI. There is a massive amount of tokens flucuating in ETH workspace. Some of them lost its value completely since the moment of ICO and and can be deemed as shitcoins.

### Why it's good for the ecosystem to get rid of them completely?
- stop the reputational damage: when you go to the etherscan and 14/16 pages are filled with dead projects it sends the wrong message
- kill the fake trading volumes for the exchanges: some of the dead projects have high daily liquidity and there are reasons to believe that they are only traded to bow up the volume
- clean up some `storage` space on the ethereum: So `geth` will sync faster! 💥

Also Marie Kondo just raised $40M from Sequoia Capital, so we believe its just the right time for "Tidying Up the Ethereum with Pyromania"

### What else is special about our implementation?

- Our tokens are like good wine - getting only more valuable with age (sometimes)! they are unique and thanks to the Proof-of-Burn will get the collectible value! 🏺
- Gas is being refunded for burned token ♻️

### Why will new tokens cost something?

- Merge of liquidity brings more value.
- A new cryptocurrency with unique "proof of burn" algo is being created in our art project "Proof of Burn" - see Moon math details below.

### Earth math:

- When a lot tokens melted in one - is worth something.

- As more (by amount) you burn - as less you get.
Square root dependency:

1 🧸  = 1🔥

100 🧸 = 10🔥

10 000 🧸= 100🔥


- As fast (by day) people burn then - as fewer people get. (integral by T is there)

### Moon math 🌒 with formulas placed here:
 https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#

![Math](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/math2.png?raw=true "Math1")
![Math2](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/math1.png?raw=true "Math2")



## Pyromania math model (https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#)

We determine the burn rate for a token as follows:

$$ r_i = r_{i-1} \alpha^{\Delta t_i} + b_i$$

where $\Delta t_i$ is number of blocks between burn events, $b_i$ is amount of tokens burned by the user at the $i$th event and $\alpha \lt 1$ is a decay parameter. We set it in such a way that the rate roughly halves every day.

The amount of pyrotokens to be minted and sent to user is defined as

$$ c_i = a (\sqrt{r_i} - \sqrt{r_i - b_i}), $$

where $a$ is scaling parameter, which is set in such a way that estimated time to burn all tokens grows as square root of token marketcap.

If there is a situation where there is only one tokenholder, they can emulate minting by spending little amounts of token. To protect from this we add a new variable $\kappa$ -- a global price cap, so that $c_i/b_i$ can not be more than $\kappa$.

If $c_i/b_i > \kappa$, we redefine $c_i$ as $c_i = b_i\kappa$.

At each step we determine $\kappa = (\kappa_0 \omega + \sum_{i-1} c_i)/(\omega + \sum_{i-1} b_i)$, where

$\kappa_0$ and $\omega$ are initial parameters.

## What it does

We made 100% recyclable token: By deep-math crypto-economics under the hood - we buidl token, that cleanup whole blockchain ecosystem.

- Clean ethereum with burning tokens, shows how much storage saved
- Get's back pyro tokens, that worth money. And it even stable because of moon math under the hood!
- Easily buy required tokens to burn from our UI (by Bankor / 0x)


We did token analytics and pick some low trading tokens. (+ some token from 0x, with notable history)

> Aeternity
> Early contributors to ethereum branched out and chose to launch a separate blockchain. The project raised funds during an ICO in the midst of ERC-20 ICO-craze. However, ultimately, existing on a separate chain meant not being part of the ecosystem and the project remains obscure. The price of a token went up and down with the mania and wobbles around the ICO-levels. However, hardly there are any Dapps written in Sophia smart contract programming language that are known to the community.


---

### State of the ART; INSPIRED BY:


>Artist Eugène Delacroix

>Year 1830

>Liberty Leading the People

>Location Louvre, Paris

>It is considered one of the key milestones between the epochs of the Enlightenment (WE ARE HERE NOW) and Romanticism (ICO ERA).

![Liberty Leading the People](https://github.com/zdai-io/Pyromania-ETHParis/blob/master/img/Liberty%20Leading%20the%20People_chart.jpg?raw=true "Liberty Leading the People
")

---

## Sponsors prizes:

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

- No oracles! So nobody can compromise it by sepculations
- Price of our token is stable: even when different kinds of shit tokens are being burned at the different time points, it still results in the same price calculations for our own token once it is minted.
- With all these variable parameters our crypto economics should be stable and reliable. So it was a real math challenge to achieve that.

## Accomplishments that we're proud of

- Pure math under the hood
- Ability to clean up blockchain and free-up space
Cryptoeconimic math way differs from classic economic. Please look into the description for formula.



## What's next for Pyromania - Time to burn!

- Add voting system, to add new tokens

### Links:
- Here is token analytics, that we made: https://docs.google.com/spreadsheets/d/1P-UbU08wB2RcWa1g7hJWoUEzLh3r-RunKxJvWFQrFq0
- hackmd with Moon math under the hood: https://hackmd.io/QDB5LiioSjKE2H7KYPuhTQ#
- The site posted here: https://Pyromania.io
