import { SidebarButton } from "components/SidebarButton";
import { Sidebar } from "components/Sidebar";
import { signOut } from "next-auth/react";

import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";
import { getShortenedAddress } from "utils/display.utils";

import { SidebarContextProvider } from "hooks/sidebar";
import { useIsStaff } from "hooks/user";

export const AdminLayout: React.FC = ({ children }) => {
  const [{ data: accountData }] = useAccount();
  const isStaff = useIsStaff();

  const handleSignout = async () => {
    signOut();
  };
  return (
    <SidebarContextProvider>
      <div className="min-h-full">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <SidebarButton />
            <div className="bg-white shadow w-full">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 flex justify-between lg:border-t lg:border-gray-200 items-center">
                  <div className="flex items-between">
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 flex items-center">
                      <span className="hidden md:block mr-1">Welcome</span>
                      {getShortenedAddress(accountData?.address ?? "")}
                      {isStaff && (
                        <span className="flex flex-col sm:ml-3 sm:flex-row sm:flex-wrap">
                          <span className="flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            <span className="hidden md:block">staff</span>
                          </span>
                        </span>
                      )}
                    </h1>
                  </div>

                  <button className="ml-8" onClick={handleSignout}>
                    Signout
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarContextProvider>
  );
};
