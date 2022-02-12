import React from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { usePlays } from "hooks/lotto";

type PlayProps = {
  nums: number[];
  index: number;
};

export const Play: React.VFC<PlayProps> = ({ nums, index }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [plays, dispatch] = usePlays();

  const [num1, setNum1] = React.useState(nums[0]);
  const [num2, setNum2] = React.useState(nums[1]);
  const [num3, setNum3] = React.useState(nums[2]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch({ type: "editPlay", index, nums: [num1, num2, num3] });
  };

  const handleDelete = () => {
    dispatch({ type: "deletePlay", index });
  };

  return (
    <li className="flex space-x-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex space-x-2 ">
          <div>
            <label htmlFor="num1" className="sr-only">
              Number 1
            </label>
            <input
              type="text"
              name="num1"
              id="num1"
              value={num1}
              onChange={(e) => setNum1(parseInt(e.target.value))}
              className="w-16 focus:ring-indigo-500 focus:border-indigo-500 relative block   bg-transparent focus:z-10 sm:text-sm border-gray-300"
              placeholder={String(nums[0])}
            />
          </div>
          <div>
            <label htmlFor="num2" className="sr-only">
              Number 2
            </label>
            <input
              type="text"
              name="num2"
              id="num2"
              value={num2}
              onChange={(e) => setNum2(parseInt(e.target.value))}
              placeholder={String(nums[1])}
              className="w-16 focus:ring-indigo-500 focus:border-indigo-500 relative block   bg-transparent focus:z-10 sm:text-sm border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="num2" className="sr-only">
              Number 3
            </label>
            <input
              type="text"
              name="num2"
              id="num2"
              value={num3}
              onChange={(e) => setNum3(parseInt(e.target.value))}
              placeholder={String(nums[2])}
              className="w-16 focus:ring-indigo-500 focus:border-indigo-500 relative block   bg-transparent focus:z-10 sm:text-sm border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="h-8 mr-4 items-center px-3 py-3 border border-gray-400 text-xs font-medium rounded-full shadow-sm text-lotto-purple flex items-center justify-center focus:outline-none focus:border-lotto-purple focus:shadow-outline"
          >
            done
          </button>
        </form>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 mr-4 items-center px-3 py-3 border border-gray-400 text-xs font-medium rounded-full shadow-sm text-lotto-purple flex items-center justify-center focus:outline-none focus:border-lotto-purple focus:shadow-outline"
          >
            <PencilAltIcon className="w-4 h-4" />
            <span className="ml-2">play {index + 1}</span>
          </button>
          <span className=" items-center p-3 h-8 w-8 border border-transparent rounded-full shadow-sm text-white bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
            {nums[0]}
          </span>
          <span className=" items-center p-3 h-8 w-8 border border-transparent rounded-full shadow-sm text-white bg-cyan-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
            {nums[1]}
          </span>
          <span className="m items-center p-3 h-8 w-8 border border-transparent rounded-full shadow-sm text-white bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
            {nums[2]}
          </span>
          {plays.length > 1 && (
            <button
              onClick={handleDelete}
              type="button"
              className="flex items-center justify-center"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </>
      )}
    </li>
  );
};
