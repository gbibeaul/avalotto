import { Disclosure, Menu } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { CreditCardIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAccount } from "wagmi";
import { useConnectModal } from "hooks/user";

export const Navbar = () => {
  const [{ data: accountData }] = useAccount();
  const [_, setOpen] = useConnectModal();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-20 mt-[-100%]  md:mt-[-700px] bg-black/[0.35]"
    >
      {({ open }) => (
        <>
          <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8 md:max-w-5xl">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex  px-6 ">
                <div className="max-w-lg w-full md:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-2 md:px-0">
                <div className="hidden md:block md:ml-6">
                  <div className="flex md:space-x-1 lg:space-x-4 ">
                    <Link href="/">
                      <span className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                      </span>
                    </Link>
                    <Link href="/games">
                      <span className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Games
                      </span>
                    </Link>
                    <Link href="/events">
                      <span className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Counter
                      </span>
                    </Link>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Events
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden md:block md:ml-4">
                <div className="flex items-center">
                  {accountData?.address ? (
                    <>
                      <button
                        type="button"
                        className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="ml-4 relative flex-shrink-0">
                        <div>
                          <button
                            onClick={() => setOpen(true)}
                            className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">Open user menu</span>
                            <span className="h-8 w-8 rounded-full bg-pink-600" />
                          </button>
                        </div>
                      </Menu>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="ml-4 inline-flex items-center px-4 py-2  border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <CreditCardIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Games
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Counter
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Events
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
