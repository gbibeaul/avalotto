import { ShareIcon } from "@heroicons/react/solid";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TwitterShareButton, TwitterIcon } from "next-share";

import { VFC } from "react";
import { text } from "stream/consumers";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  title: string;
  text: string;
};

export const SocialShare: VFC<Props> = (props) => {
  const [navigatorPresent, setNavigatorPresent] = useState(false);

  useEffect(() => {
    setNavigatorPresent(Boolean(window.navigator.canShare));
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({ ...props, url: window.location.href });
    } catch (err) {}
  };
  return (
    <Menu as="div" className="relative inline-block text-left h-2">
      {navigatorPresent ? (
        <button onClick={handleShare}>
          <ShareIcon className="h-6" aria-hidden="true" />
        </button>
      ) : (
        <Menu.Button>
          <ShareIcon className="h-6" aria-hidden="true" />
        </Menu.Button>
      )}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    props.text
                  )}`}
                  target="_blank"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm  w-full cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <TwitterIcon className="h-8" />
                  Twitter
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
