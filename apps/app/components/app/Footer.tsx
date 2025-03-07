import { CreditCardIcon } from "@heroicons/react/outline";
import { useAccount } from "wagmi";
import { useConnectModal } from "hooks/user";

export const Footer = () => {
  const [_, setOpen] = useConnectModal();
  const [{ data: accountData }] = useAccount();

  return (
    <footer className="sticky bottom-0 left-0 w-full md:hidden bg-black ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between ">
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center px-12 py-2  border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <CreditCardIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {!accountData?.address ? "Connect Wallet" : "Manage wallet"}
          </button>
        </div>
      </div>
    </footer>
  );
};
