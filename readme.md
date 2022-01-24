# GameBit

The GameBit Token is a decentralized, open-source, peer-to-peer token that powers the planned GameBit Protocol. The token is a utility token that can be used to either participate in games, stake, & governance over the platform.

There are two ways to participate in the GameBit Protocol:

- Offer to stake your GameBit tokens in the Protocol and receive additional tokens proportional to the total usage of the protocol
- Play the games, which gives you a chance to win, but also rewards additional GameBit tokens the more you play

The player rewards and staking yields are automatically rebalanced by the protocol to insure the long-term viability of the platform.

## Roadmap:

1. Launch a test game (lottery) to test Avalanche's viability as a large-scale open gambling platform
1. Establish a yield and rewards comptroller for the protocol
1. Launch the pre-sale and alpha of the protocol with two games: Blackjack and slots
1. Launch the beta of the protocol and additional games
1. Launch the public release of the protocol with a decentralized governance system

# Contributing

## Prerequisites

1. Install [nodejs](https://nodejs.org/en/)
1. Install [yarn](https://yarnpkg.com/en/docs/install)
1. Install the [MetaMask Chrome extension](https://metamask.io/)

## Project Hierarchy

This project uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and [turborepo pipelines](https://turborepo.org/docs/features/pipelines). All direct subfolders of `app/` and `packages/` are workspaces. Put deployable, runnable projects into `apps/`. Libs and utils go into `packages/`.

## Getting Started

### Install

---

Running `yarn` from the root of the project will install all of the project's dependencies. If using yarn, you'll want to `yarn set version berry` first.

### Deploying and running apps

---

Whether node, browser, or blockchain, most apps will need to be running locally or deployed. The frontend apps are running on [Vercel](https://vercel.com/) and [Supabase](https://supabase.com/)and the smart contracts are accessible via the MetaMask RPC provider.

### Frontend apps on Vercel + Supabase

---

Vercel apps may expect a config consisting of address and URLs for service layers. In the case of the gamble app, you'll need to copy `apps/gamble/.env.example` to `apps/gamble/.env` (git-ignored) and edit some of the secrets, for Supabase and gmail. Please ask a project lead for the secrets.

### Run the Frontend against Fuji testnet

---

Deployed Fuji contracts should be stable but could be behind your local version

1. Copy the content of `.env.example` to a `.env` file in the apps/gamble folder
1. Make sure the env variable is properly set to fuji: `VITE_AVALANCHE_NETWORK=Fuji`
1. Run `yarn dev:fuji`

### Local Blockchain

---

This is the latest unstable stuff

1. Copy the content of `.env.example` to a `.env` file in the apps/gamble folder
1. Launch the test network by running `yarn start:chain`
1. Add the [test network to MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC) using the following configuration:
   - RPC URL: http://127.0.0.1:8545/
   - Network Name: "Hardhat test"
   - Network ID: "43112"
   - Currency Symbol (optional): AVAX
1. Run `yarn dev`

Restarting your commands will require you to do the following:

1. Kill the two terminal windows
1. Restart `yarn start:chain` and `yarn dev` in the respective windows.
1. If you have submitted transactions, reset the hardhat accounts on MetaMask
