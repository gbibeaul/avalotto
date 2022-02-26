import { PlusIcon } from "@heroicons/react/outline";
import { GameLayout } from "components/app/GameLayout";
import Image from "next/image";

export default function Avalotto() {
  return (
    <GameLayout>
      <div className="flex-1 flex items-stretch max-w-md ">
        <main className="flex-1 overflow-hidden mb-10">
          <section
            aria-labelledby="primary-heading"
            className="flex-1 flex flex-col lg:order-last p-8 h-[80vh] "
          >
            <div className="h-full bg-white  bg-[#F92502] h-[85vh] border-[#FEBE00] border-8 border-solid rounded-lg shadow-sm ">
              <div className="flex justify-center flex-col">
                <span className="flex-col bg-center bg-no-repeat flex justify-center items-center h-48 bg-contain bg bg-[url('/Spikeball.svg')]">
                  <h1
                    style={{
                      textShadow: "4px 4px 4px black",
                    }}
                    className="uppercase font-bangers text-6xl font-extrabold text-yellow-400 to-yellow-600"
                  >
                    Scratch &apos;N&apos;
                  </h1>

                  <h1
                    style={{
                      textShadow: "4px 4px 4px black",
                    }}
                    className="uppercase font-bangers text-6xl font-extrabold text-yellow-400 to-yellow-600"
                  >
                    Match!!!
                  </h1>
                </span>
                <div className="flex flex-col mt-24 w-full items-center">
                  <button
                    className="border-solid w-60 rounded-md border-4 border-black py-4 bg-yellow-400  mb-3 buy-button"
                    type="submit"
                  >
                    <div className="font-bold">BUY 1 TICKET (1 AVAX)</div>
                  </button>

                  <button
                    className="border-solid w-60 rounded-md border-4 border-black py-4 bg-yellow-400  buy-button"
                    type="submit"
                  >
                    <div className="font-bold">BUY 5 TICKETS (4 AVAX)</div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </GameLayout>
  );
}
