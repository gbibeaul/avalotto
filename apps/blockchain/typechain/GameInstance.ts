/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface GameInstanceInterface extends utils.Interface {
  contractName: "GameInstance";
  functions: {
    "getJackpot()": FunctionFragment;
    "play()": FunctionFragment;
    "receiveRng(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getJackpot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "play", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "receiveRng",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getJackpot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "play", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "receiveRng", data: BytesLike): Result;

  events: {
    "RngReceived(uint256)": EventFragment;
    "RngRequested(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RngReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RngRequested"): EventFragment;
}

export type RngReceivedEvent = TypedEvent<[BigNumber], { arg0: BigNumber }>;

export type RngReceivedEventFilter = TypedEventFilter<RngReceivedEvent>;

export type RngRequestedEvent = TypedEvent<[BigNumber], { arg0: BigNumber }>;

export type RngRequestedEventFilter = TypedEventFilter<RngRequestedEvent>;

export interface GameInstance extends BaseContract {
  contractName: "GameInstance";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameInstanceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getJackpot(overrides?: CallOverrides): Promise<[BigNumber]>;

    play(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    receiveRng(
      _rng: BigNumberish,
      _requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

  play(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  receiveRng(
    _rng: BigNumberish,
    _requestId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    play(overrides?: CallOverrides): Promise<void>;

    receiveRng(
      _rng: BigNumberish,
      _requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "RngReceived(uint256)"(arg0?: null): RngReceivedEventFilter;
    RngReceived(arg0?: null): RngReceivedEventFilter;

    "RngRequested(uint256)"(arg0?: null): RngRequestedEventFilter;
    RngRequested(arg0?: null): RngRequestedEventFilter;
  };

  estimateGas: {
    getJackpot(overrides?: CallOverrides): Promise<BigNumber>;

    play(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    receiveRng(
      _rng: BigNumberish,
      _requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getJackpot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    play(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    receiveRng(
      _rng: BigNumberish,
      _requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
