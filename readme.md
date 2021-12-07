# Gamble Token

The Gamble Token is a decentralized, open-source, peer-to-peer token that powers the planned Gamble Protocol. The token is a utility token that can be used to either participate in gambling games or to stake and receive a yield.

There are two ways to participate in the Gamble Protocol:

- Offer to stake your tokens in the Protocol and receive a yield proportional to the profits the protocol is making
- participate in the games gives you a chance of winning but also rewards you with additional tokens the more you play.

The player rewards and stakes yields are balanced by the protocol to insure the viability of the platform.

## Roadmap:

1. Launching a test game (lottery) to test Avalanche's viability as a large scale open gambling platform. 
1. Establish yield and stake rewards comptroller for the protocol
1. Launch the pre-sale and alpha of the protocol with two games: black jack and slots.
1. Launch the beta of the protocol with the rest of the games.
1. Launch the public release of the protocol and institue a decentralized governance system.

## Prerequesites

1. install nodejs at this address https://nodejs.org/en/
1. install yarn at this address https://yarnpkg.com/en/docs/install
1. install the metamask extension at this address https://metamask.io/

## Developer environment

- Launch the test network `yarn start:chain`
- add the test network to metamask https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC. Use these values:
    - new RPC URL http://127.0.0.1:8545/
    - new network name "Hardhat test"
    - new network id "43112"
    - Currency Symbol(Optional) AVAX
- From a another terminal, deploy the contract to the test network `yarn deploy:lotto:dev`
- In the same terminal where you deployed the contract, start the UI `yarn start:ui`