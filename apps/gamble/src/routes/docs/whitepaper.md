---
title: Whitepaper
---
# Gamebit Protocol
_2021-01-29_
## Abstract

This paper provides an architectural overview of the first release of the Gamebit protocol on the Avalanche blockchain network. This paper discusses key implementation details of the protocol including random number generation and transparency, as well as specifics regarding the token economics (or tokenomics) of the protocol’s own token, $GBIT. The token will primarily be used for staking, rewards, and will enable future governance of the protocol among its users.

## Introduction

The Gamebit protocol was established to introduce games of risk and chance in a system or network that is otherwise predictable and rigid, inherent in blockchain and ledger technology. The protocol accomplishes this feat by leveraging off-chain quantum computing random number generators (QRNG), supplied to smart contracts through a trusted oracle wallet. Despite randomness being introduced off-chain, all transactions involving random values are verified by the infrastructure of the protocol through dedicated smart contracts to ensure gaming fairness and transparency.

The core components of the protocol, hosted in smart contracts on the Avalanche Mainnet Contract Chain (C-Chain), are comprised of:

- **Infrastructure**, which serves as the main smart contract of the platform to broker transactions, provides validation functions to ensure fairness, and bridges events between games and the oracle wallet to fulfill game results.

- **Treasury**, which acts as the financial reserve for transactions on the system, and to pay out winnings and staking rewards.

- **Games**, with each unique game represented by its own smart contract, interacts with the player - who places a wager to participate in a game. In addition to the wager, the game’s contract code can store input from the player required for the game, for example, chosen lottery numbers.

- **Trusted oracle**, which listens for events emitted from the execution of smart contracts, and where required, connects to and returns responses from trusted external services, including the Australian National University’s quantum random number generator API.

- **Governance**, via 1,000+ validators on the Avalanche network

## Core values

- **Community**: Our community is core to our existence. Without a strong community, our project stands to fail. This, amongst others, is why we chose the Avalanche Network for Gamebit. The existing network is unparalleled in strength, and collaboration between projects is commonplace. Gamebit intends to add to this already powerful dynamic by driving existing community members to our project, onboarding new members to the network via the allure of gaming and partnering with other key Avalanche projects.

- **Transparency**: Gamebit’s initial gaming offering dubbed Snowy Palace Casino aims to earn the protocol a profit. However, we believe that our players can and should earn a piece of that profit for supporting our operation; which over time can become their operation through our governance DAO. All casino activity will be viewable on Avalanche’s public ledger and we believe there to be tremendous, game-changing value through that.

- **Relentlessness**: Bear or bull, we promise to continue to build. This is a long-term vision for us to execute against and we know that we can accomplish this feat no matter what the macro market conditions look like.

- **Infrastructure and validation**
Core infrastructure and constant innovation arround RNG auditability and security.

## Treasury
The treasury is managed by three core team members and requires all three-member signatures for any transactional events. The treasury includes mechanisms to transfer control to a Open Zeppelin governance Dao.

## Games
Upon launch, there will be two games in the Gamebit Snowy Palace Casino:
Avalotto (jackspot style lottery, deposit AVAX to mint a ticket, earn AVAX if you select the right numbers)
Avascratch (scratch card game where players can mint NFTs after playing, corresponding values of the NFTs are determined by their rarity on the open market)

There will be additional games introduced on Snowy Palace Casino as part of our roadmap.

Additionally, Gamebit will host a Builders Guild that will allow community members to build their own games on top of our protocol; either to be featured within Snowy Palace Casino or elsewhere.

## Trusted Oracle
A first priority in our roadmap is introducing a trusted and verifiable oracle system for API calls and RNG. The contracts provide security mechanisms to ensure each RNG is consumed by the right game only 1 specific time. Our research is expanding into custom EVM into subnets to allow consensus about RNG transactions into private auditable subnets.
## Governance
After initial critical roadmap items are tackled and our community has shown positive growth, we intend to transition to a DAO governance model where token holders can influence key protocol decisions through voting. This can range from hiring, tokenomic revisions or roadmap decisions.

## Tokenomics

Gamebit has a max supply of 5 billion $GBIT tokens. 15% are allocated to the team, 10% to seed investors, 50% for marketing & airdrop activities and 25% for community circulation.

### Token uses
Our $GBIT token provides utility in multiple ways:

- **Staking**: In order to earn a % share of casino revenue, users must stake their $GBIT tokens. Gamebit will use the ve model for veGBIT to encourage long-term staking. Those that earn the non-tradeable veGBIT token will earn higher percentages of the casino revenue. If $GBIT is ever unstaked, a user loses all of their veGBIT.
Governance: A minimum amount of staked $GBIT tokens will be required to participate in the future DAO governance
Game Credits: $GBIT stakers will be eligible for regular “free play” credits towards select games

- **Staking**
The player rewards and staking yields are automatically rebalanced by the protocol to ensure the long-term viability of the platform. $GBIT APY and rewards are directly influenced by:

- **Protocol volume (more revenue, more rewards to be earned)
**Amount of accrued veGBIT (higher veGBIT, higher the APY of your staked GBIT)

## Conclusion
Gamebit aims to become the de facto play & earn protocol on Avalanche for casino-style gaming. We want to disrupt the traditional casino model by offering our players a chance to earn a direct piece of our protocol's revenue. Additionally, we want to empower builders to create fun games to further grow the Gamebit protocol. We believe that the combination of these powerful elements will lead to a prosperous future ecosystem where players, builders and yield chasers can thrive and ultimately bring more visibility to Avalanche.