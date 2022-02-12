import { createReducerContext, createStateContext } from "react-use";

const getRandomNumber = () => Math.floor(Math.random() * 100);

type NewPlay = {
  type: "newPlay";
};

type DeletePlay = {
  type: "deletePlay";
  index: number;
};

type EditPlay = {
  type: "editPlay";
  index: number;
  nums: number[];
};

type Action = NewPlay | DeletePlay | EditPlay;

const reducer = (state: number[][], action: Action) => {
  switch (action.type) {
    case "newPlay":
      return [
        ...state,
        [getRandomNumber(), getRandomNumber(), getRandomNumber()],
      ];
    case "deletePlay":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case "editPlay":
      const copy = [...state];
      copy[action.index] = action.nums;
      return [...copy];
    default:
      throw new Error();
  }
};

const [hook, provider] = createReducerContext(reducer, [
  [getRandomNumber(), getRandomNumber(), getRandomNumber()],
]);

export const usePlays = hook;
export const PlaysProvider = provider;
