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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface GamebitAuthorizationsInterface extends utils.Interface {
  contractName: "GamebitAuthorizations";
  functions: {
    "addAuthorizedGame(address,uint256)": FunctionFragment;
    "addOracle(address)": FunctionFragment;
    "addStaff(address)": FunctionFragment;
    "changeAuditor(address)": FunctionFragment;
    "changeRng(address)": FunctionFragment;
    "disableStaff()": FunctionFragment;
    "editGameGameProfitAuth(address,bool)": FunctionFragment;
    "editGameOracleAuth(address,bool)": FunctionFragment;
    "editGamePlayProfitAuth(address,bool)": FunctionFragment;
    "editGameRngAuth(address,bool)": FunctionFragment;
    "enableStaff()": FunctionFragment;
    "getMinGameProfit(address)": FunctionFragment;
    "getRngOracleAddress()": FunctionFragment;
    "isAmountEnoughProfit(address,uint256)": FunctionFragment;
    "isAuditor(address)": FunctionFragment;
    "isGameAuthorized(address)": FunctionFragment;
    "isGameGameProfitAuthorized(address)": FunctionFragment;
    "isGameOracleAuthorized(address)": FunctionFragment;
    "isGamePlayProfitAuthorized(address)": FunctionFragment;
    "isGameRngAuthorized(address)": FunctionFragment;
    "isOfficialRng(address)": FunctionFragment;
    "isStaff(address)": FunctionFragment;
    "isStaffOrGovApproved(address)": FunctionFragment;
    "removeAuthorizedGame(address)": FunctionFragment;
    "removeOracle(address)": FunctionFragment;
    "removeStaff(address)": FunctionFragment;
    "updateGameMinProfit(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addAuthorizedGame",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "addOracle", values: [string]): string;
  encodeFunctionData(functionFragment: "addStaff", values: [string]): string;
  encodeFunctionData(
    functionFragment: "changeAuditor",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "changeRng", values: [string]): string;
  encodeFunctionData(
    functionFragment: "disableStaff",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "editGameGameProfitAuth",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "editGameOracleAuth",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "editGamePlayProfitAuth",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "editGameRngAuth",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "enableStaff",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMinGameProfit",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRngOracleAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isAmountEnoughProfit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "isAuditor", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isGameAuthorized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isGameGameProfitAuthorized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isGameOracleAuthorized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isGamePlayProfitAuthorized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isGameRngAuthorized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isOfficialRng",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "isStaff", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isStaffOrGovApproved",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAuthorizedGame",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeOracle",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "removeStaff", values: [string]): string;
  encodeFunctionData(
    functionFragment: "updateGameMinProfit",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addAuthorizedGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addStaff", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeAuditor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "changeRng", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "disableStaff",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editGameGameProfitAuth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editGameOracleAuth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editGamePlayProfitAuth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editGameRngAuth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableStaff",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinGameProfit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRngOracleAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAmountEnoughProfit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isAuditor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isGameAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isGameGameProfitAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isGameOracleAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isGamePlayProfitAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isGameRngAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOfficialRng",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isStaff", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isStaffOrGovApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAuthorizedGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeStaff",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateGameMinProfit",
    data: BytesLike
  ): Result;

  events: {};
}

export interface GamebitAuthorizations extends BaseContract {
  contractName: "GamebitAuthorizations";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GamebitAuthorizationsInterface;

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
    addAuthorizedGame(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeAuditor(
      _auditor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeRng(
      _rng: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    disableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editGameGameProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editGameOracleAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editGamePlayProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editGameRngAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getMinGameProfit(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRngOracleAddress(overrides?: CallOverrides): Promise<[string]>;

    isAmountEnoughProfit(
      _game: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isAuditor(_auditor: string, overrides?: CallOverrides): Promise<[boolean]>;

    isGameAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isGameGameProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isGameOracleAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isGamePlayProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isGameRngAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isOfficialRng(_rng: string, overrides?: CallOverrides): Promise<[boolean]>;

    isStaff(_staff: string, overrides?: CallOverrides): Promise<[boolean]>;

    isStaffOrGovApproved(
      _requester: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeAuthorizedGame(
      _game: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateGameMinProfit(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addAuthorizedGame(
    _game: string,
    _minGameProfit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addOracle(
    _oracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addStaff(
    _staff: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeAuditor(
    _auditor: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeRng(
    _rng: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  disableStaff(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editGameGameProfitAuth(
    _game: string,
    _auth: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editGameOracleAuth(
    _game: string,
    _auth: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editGamePlayProfitAuth(
    _game: string,
    _auth: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editGameRngAuth(
    _game: string,
    _auth: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enableStaff(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getMinGameProfit(
    _game: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRngOracleAddress(overrides?: CallOverrides): Promise<string>;

  isAmountEnoughProfit(
    _game: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isAuditor(_auditor: string, overrides?: CallOverrides): Promise<boolean>;

  isGameAuthorized(_game: string, overrides?: CallOverrides): Promise<boolean>;

  isGameGameProfitAuthorized(
    _game: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isGameOracleAuthorized(
    _game: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isGamePlayProfitAuthorized(
    _game: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isGameRngAuthorized(
    _game: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isOfficialRng(_rng: string, overrides?: CallOverrides): Promise<boolean>;

  isStaff(_staff: string, overrides?: CallOverrides): Promise<boolean>;

  isStaffOrGovApproved(
    _requester: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeAuthorizedGame(
    _game: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeOracle(
    _oracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeStaff(
    _staff: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateGameMinProfit(
    _game: string,
    _minGameProfit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addAuthorizedGame(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addOracle(_oracle: string, overrides?: CallOverrides): Promise<void>;

    addStaff(_staff: string, overrides?: CallOverrides): Promise<void>;

    changeAuditor(_auditor: string, overrides?: CallOverrides): Promise<void>;

    changeRng(_rng: string, overrides?: CallOverrides): Promise<void>;

    disableStaff(overrides?: CallOverrides): Promise<void>;

    editGameGameProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    editGameOracleAuth(
      _game: string,
      _auth: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    editGamePlayProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    editGameRngAuth(
      _game: string,
      _auth: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    enableStaff(overrides?: CallOverrides): Promise<void>;

    getMinGameProfit(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRngOracleAddress(overrides?: CallOverrides): Promise<string>;

    isAmountEnoughProfit(
      _game: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isAuditor(_auditor: string, overrides?: CallOverrides): Promise<boolean>;

    isGameAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isGameGameProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isGameOracleAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isGamePlayProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isGameRngAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isOfficialRng(_rng: string, overrides?: CallOverrides): Promise<boolean>;

    isStaff(_staff: string, overrides?: CallOverrides): Promise<boolean>;

    isStaffOrGovApproved(
      _requester: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeAuthorizedGame(
      _game: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeOracle(_oracle: string, overrides?: CallOverrides): Promise<void>;

    removeStaff(_staff: string, overrides?: CallOverrides): Promise<void>;

    updateGameMinProfit(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addAuthorizedGame(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeAuditor(
      _auditor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeRng(
      _rng: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    disableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editGameGameProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editGameOracleAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editGamePlayProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editGameRngAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getMinGameProfit(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRngOracleAddress(overrides?: CallOverrides): Promise<BigNumber>;

    isAmountEnoughProfit(
      _game: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAuditor(_auditor: string, overrides?: CallOverrides): Promise<BigNumber>;

    isGameAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isGameGameProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isGameOracleAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isGamePlayProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isGameRngAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isOfficialRng(_rng: string, overrides?: CallOverrides): Promise<BigNumber>;

    isStaff(_staff: string, overrides?: CallOverrides): Promise<BigNumber>;

    isStaffOrGovApproved(
      _requester: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeAuthorizedGame(
      _game: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateGameMinProfit(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAuthorizedGame(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeAuditor(
      _auditor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeRng(
      _rng: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    disableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editGameGameProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editGameOracleAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editGamePlayProfitAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editGameRngAuth(
      _game: string,
      _auth: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enableStaff(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getMinGameProfit(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRngOracleAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAmountEnoughProfit(
      _game: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAuditor(
      _auditor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGameAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGameGameProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGameOracleAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGamePlayProfitAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGameRngAuthorized(
      _game: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isOfficialRng(
      _rng: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isStaff(
      _staff: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isStaffOrGovApproved(
      _requester: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeAuthorizedGame(
      _game: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeOracle(
      _oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeStaff(
      _staff: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateGameMinProfit(
      _game: string,
      _minGameProfit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
