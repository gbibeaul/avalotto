import { PlusIcon } from "@heroicons/react/outline";
import { GameLayout } from "components/app/GameLayout";
import { Play } from "components/lotto/Play";
import { usePlays, PlaysProvider } from "hooks/lotto";

const NewPlay = () => {
  const [plays, dispatch] = usePlays();

  if (plays.length >= 5) {
    return <></>;
  }

  const handleClick = () => {
    dispatch({ type: "newPlay" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-8 mr-4 items-center px-3 py-3  text-xs font-medium rounded-full  text-lotto-purple flex items-center justify-center focus:outline-none focus:border-lotto-purple focus:shadow-outline"
    >
      <PlusIcon className="w-4 h-4" />
      <span className="ml-2">new play</span>
    </button>
  );
};

const Plays = () => {
  const [plays] = usePlays();

  return (
    <ul className="flex space-y-8 flex-col">
      {plays.map((play, index) => (
        <Play key={index} index={index} nums={play} />
      ))}
    </ul>
  );
};

const BuyTicket = () => {
  const [plays] = usePlays();

  return (
    <section className="flex justify-center py-8">
      <button
        type="button"
        onClick={() => console.log("hello")}
        className="flex justify-center w-48  items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Buy ticket ({plays.length} AVAX)
      </button>
    </section>
  );
};

export default function Avalotto() {
  return (
    <GameLayout>
      <PlaysProvider>
        <div className="flex-1 flex items-stretch max-w-md ">
          <main className="flex-1 overflow-hidden mb-10">
            <section
              aria-labelledby="primary-heading"
              className="flex-1 flex flex-col lg:order-last p-8 h-[80vh]"
            >
              <div className="h-full bg-white border border-gray-200 rounded-lg shadow-sm ">
                <hgroup>
                  <strong className="font-bold flex justify-center pt-8 text-sm text-lotto-black uppercase">
                    The current jackpot is
                  </strong>
                  <em className="flex justify-center text-lotto-black font-lotto font-extrabold text-5xl md:text-6xl">
                    10 AVAX
                  </em>
                </hgroup>
                <div className="divider w-full mt-6" />

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex flex-col space-y-5">
                    <Plays />
                    <NewPlay />
                  </div>
                </div>
                <div className="relative">
                  <BuyTicket />
                </div>
              </div>
            </section>
          </main>
        </div>
      </PlaysProvider>
    </GameLayout>
  );
}
