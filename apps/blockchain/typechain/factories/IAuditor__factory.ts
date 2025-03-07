/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAuditor, IAuditorInterface } from "../IAuditor";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_consumptionValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "consumeRNG",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fullfillmentNonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fullfillmentValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "fullfillRNG",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_consumptionId",
        type: "uint256",
      },
    ],
    name: "getConsumption",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "consumptionNonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "consumptionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "consumptionValue",
            type: "uint256",
          },
        ],
        internalType: "struct IAuditor.RNGConsumption",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fullfillmentId",
        type: "uint256",
      },
    ],
    name: "getFullfillment",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "fullfillmentNonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fullfillmentAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fullfillmentValue",
            type: "uint256",
          },
        ],
        internalType: "struct IAuditor.RNGFullfillment",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "getRequest",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "requestedBy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestNonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IAuditor.RNGRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "getRequestState",
    outputs: [
      {
        internalType: "enum IAuditor.RequestState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestNonce",
        type: "uint256",
      },
    ],
    name: "logRNGRequest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IAuditor__factory {
  static readonly abi = _abi;
  static createInterface(): IAuditorInterface {
    return new utils.Interface(_abi) as IAuditorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAuditor {
    return new Contract(address, _abi, signerOrProvider) as IAuditor;
  }
}
