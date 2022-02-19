import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";

import { useSidebar } from "hooks/sidebar";
import { useRouter } from "next/router";

const navigation = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  { name: "History", href: "/admin/history", icon: ClockIcon },
  { name: "Balances", href: "/admin/balanmces", icon: ScaleIcon },
  { name: "Games", href: "/admin/games", icon: CreditCardIcon },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon },
  { name: "Reports", href: "/admin/reports", icon: DocumentReportIcon },
];
const secondaryNavigation = [
  { name: "Settings", href: "/admin/settings", icon: CogIcon },
  { name: "Help", href: "#/admin/help", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#/admin/privacy", icon: ShieldCheckIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const router = useRouter();

  const isCurrentRoute = (href: string) => {
    if (href === "/admin") {
      return router.pathname === "/admin" || router.pathname === "/admin/";
    }
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
                    onClick={() => setSidebarOpen()}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <nav
                className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={classNames(
                        isCurrentRoute(item.href)
                          ? "bg-gray-800 text-white"
                          : "text-cyan-100 hover:text-white hover:bg-gray-600",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer"
                      )}
                      aria-current={
                        isCurrentRoute(item.href) ? "page" : undefined
                      }
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => router.push(item.href)}
                        className="cursor-pointer group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-gray-600"
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gray-700 pt-5 pb-4 overflow-y-auto">
          <nav
            className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={classNames(
                    isCurrentRoute(item.href)
                      ? "bg-gray-800 text-white"
                      : "text-cyan-100 hover:text-white hover:bg-gray-600",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={
                    router.asPath.includes(item.href) ? "page" : undefined
                  }
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-gray-600 cursor-pointer"
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
