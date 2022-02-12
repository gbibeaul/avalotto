//@ts-nocheck
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { GameLayout } from "components/app/GameLayout";
import Lottie from "react-lottie-player";
import BoxingAnimation from "components/app/boxing.animation.json";

const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-22", isCurrentMonth: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];
const meetings = [
  {
    id: 1,
    name: "Owls VS APA",
    start: "1:00 PM",
    startDatetime: "2022-01-21T13:00",
    end: "2:30 PM",
    endDatetime: "2022-01-21T14:30",
  },
  {
    id: 1,
    name: "ALL IN! VS APA",
    start: "1:00 PM",
    startDatetime: "2022-01-21T13:00",
    end: "2:30 PM",
    endDatetime: "2022-01-21T14:30",
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
          <div className="hidden md:block md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-white">
                January 2022
              </h2>
              <button
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-white "
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-white "
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-white">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.date}
                  className={classNames(
                    dayIdx > 6 && "border-t border-white",
                    "py-2"
                  )}
                >
                  <button
                    type="button"
                    className={classNames(
                      day.isSelected && "text-white",
                      !day.isSelected && day.isToday && "text-indigo-600",
                      !day.isSelected &&
                        !day.isToday &&
                        day.isCurrentMonth &&
                        "text-white",
                      !day.isSelected &&
                        !day.isToday &&
                        !day.isCurrentMonth &&
                        "text-white",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-pink-600",
                      !day.isSelected && "hover:bg-pink-900",
                      (day.isSelected || day.isToday) && "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={day.date}>
                      {day.date.split("-").pop().replace(/^0/, "")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-white">
              Schedule for <time dateTime="2022-01-21">January 21, 2022</time>
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
