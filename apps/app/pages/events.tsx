//@ts-nocheck
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { GameLayout } from "components/app/GameLayout";
import Lottie from "react-lottie-player";
import BoxingAnimation from "components/app/boxing.animation.json";

const days = [
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
  { date: "2022-02-07" },
  { date: "2022-02-08" },
  { date: "2022-02-09" },
  { date: "2022-02-10" },
  { date: "2022-02-11" },
  { date: "2022-02-12" },
  { date: "2022-02-13" },
  { date: "2022-02-14" },
  { date: "2022-02-15" },
  { date: "2022-02-16" },
  { date: "2022-02-17" },
  { date: "2022-02-18" },
  { date: "2022-02-19" },
  { date: "2022-02-20" },
  { date: "2022-02-21" },
  { date: "2022-02-22" },
  { date: "2022-02-23" },
  { date: "2022-02-24" },
  { date: "2022-02-25" },
  { date: "2022-02-26" },
  { date: "2022-02-27" },
  { date: "2022-02-28" },
  { date: "2022-03-01" },
  { date: "2022-03-02" },
  { date: "2022-03-03" },
  { date: "2022-03-04" },
  { date: "2022-03-05" },
  { date: "2022-03-06" },
  { date: "2022-03-07" },
  { date: "2022-03-08" },
  { date: "2022-03-09" },
  { date: "2022-03-10" },
  { date: "2022-03-11" },
  { date: "2022-03-12" },

  { date: "2022-03-13" },
  { date: "2022-03-14" },
  { date: "2022-03-15" },
  { date: "2022-03-16" },
  { date: "2022-03-17" },
  { date: "2022-03-18" },
  { date: "2022-03-19" },
  { date: "2022-03-20" },
  { date: "2022-03-21" },
  { date: "2022-03-22" },
  { date: "2022-03-23" },
  { date: "2022-03-24" },
  { date: "2022-03-25" },
  { date: "2022-03-26" },
  { date: "2022-03-27" },
  { date: "2022-03-28" },
  { date: "2022-03-29" },
  { date: "2022-03-30" },
  { date: "2022-03-31" },
];
const meetings = [
  {
    id: 1,
    name: "Owls VS APA",
    start: "1:00 PM",
    startDatetime: "2022-03-31T13:00",
    end: "2:30 PM",
    endDatetime: "2022-04-15T14:30",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <GameLayout class="h-full">
      <section>
        <div className="md:grid bg-gray-800 p-12 overflow-scroll h-[75vh] rounded-xl md:grid-cols-2 md:divide-x md:divide-white mt-12">
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-white">
              Schedule for <time dateTime="2022-01-21">March, 2022</time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-white">
              {meetings.map((meeting) => (
                <li
                  key={meeting.id}
                  className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-white "
                >
                  <Lottie
                    loop
                    animationData={BoxingAnimation}
                    play
                    style={{ width: 150, height: 150 }}
                  />

                  <div className="flex-auto">
                    <p className="text-white">{meeting.name}</p>
                    <p className="mt-0.5">
                      <time dateTime={meeting.startDatetime}>
                        {meeting.start}
                      </time>{" "}
                      -{" "}
                      <time dateTime={meeting.endDatetime}>{meeting.end}</time>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </GameLayout>
  );
}
