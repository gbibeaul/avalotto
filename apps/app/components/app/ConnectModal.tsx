import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "styles/Animations.module.css";
import { useConnectModal } from "hooks/user";
import { Connector, useAccount, useConnect, useNetwork } from "wagmi";
import { XIcon } from "@heroicons/react/solid";
import fetcher from "tranport/fetcher";

enum WalletConnectState {
  Connect,
  ConfirmNetwork,
  Error,
  Connected,
  Loading,
}

export const ConnectModal: React.VFC = () => {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ data: networkData }, switchNetwork] = useNetwork();

  const [open, setOpen] = useConnectModal();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WalletConnectState>(
    WalletConnectState.Connect
  );
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (accountData?.address) {
      if (networkData.chain?.unsupported) {
        setState(WalletConnectState.ConfirmNetwork);
      } else {
        setState(WalletConnectState.Connected);
      }
    } else {
      setState(WalletConnectState.Connect);
    }
  }, [accountData?.address, networkData.chain]);

  // title animation
  useEffect(() => {
    if (open) {
      setTimeout(() => setStep(1), 5000);
    }
    if (!open) {
      setTimeout(() => setStep(0), 2000);
    }
  }, [open]);

  const handleConnect = async (connector: Connector) => {
    const { data, error } = await connect(connector);
    if (error) {
      setState(WalletConnectState.Error);
      return;
    }
    setState(WalletConnectState.Connected);
  };

  const handleDisconnect = async () => {
    disconnect();
    setOpen(false);
    setStep(0);
    setState(WalletConnectState.Connect);
  };

  const handleSwitchNetwork = async () => {
    try {
      if (
        typeof networkData.chain !== "undefined" &&
        typeof switchNetwork !== "undefined"
      ) {
        await switchNetwork(networkData.chains[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmailNotifications = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setLoading(true);
      await fetcher("/email-list", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Error submitting email for notifications: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className={`${styles.gradient} flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bPastel bg-gradient-to-tr from-pink-500 to-orange-300 to-blue-300 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl h-96 transform transition-all sm:my-8 sm:align-middle w-96 sm:p-6">
              {/* Title of modal with close icon. */}
              <div className={`flex text-pink-600 text-xl after:bg-pink-500 text-ellipsis`}>
                {(state === WalletConnectState.Connect ||
                  state === WalletConnectState.Error) && (
                  <>
                    {step === 0 && (
                      <div
                        className={`${styles.blink} text-pink-600 text-xl after:bg-pink-500`}
                      >
                        Entering Gamebit...
                      </div>
                    )}
                    {step === 1 && (
                      <div
                        className={`${styles.blink} text-pink-600 text-xl after:bg-pink-500`}
                      >
                        Select provider...
                      </div>
                    )}
                  </>
                )}
                {state === WalletConnectState.Connected && (
                  <>
                    <div
                      className={`text-pink-600 text-xl after:bg-pink-500 text-ellipsis`}
                    >
                      Connected
                    </div>
                  </>
                )}
                {state === WalletConnectState.ConfirmNetwork && (
                  <>
                    <div className="flex text-pink-600">
                      <div
                        className={`${styles.blink} text-xl after:bg-pink-500 text-ellipsis`}
                      >
                        Wrong Network
                      </div>
                    </div>
                  </>
                )}

                <button className="ml-auto" onClick={() => setOpen(false)}>
                  <XIcon width={24} />
                </button>
              </div>

              {(state === WalletConnectState.Connect ||
                state === WalletConnectState.Error) && (
                <>
                  <div className="flex  justify-center mt-8 animate-pulse">
                    {connectData.connectors.map(
                      (connector) =>
                        connector.ready && (
                          <button
                            key={connector.id}
                            type="button"
                            onClick={() => handleConnect(connector)}
                            className=" w-1/2 items-center px-4 py-2 first:rounded-l-md last:rounded-r-md border border-gray-300 text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-white"
                          >
                            {connector.name}
                          </button>
                        )
                    )}
                  </div>
                </>
              )}

              {state === WalletConnectState.Connected && (
                <>
                  <div
                    className={`${styles.blink} text-pink-600 text-xl after:bg-pink-500 text-ellipsis`}
                  >
                    {accountData?.address}
                  </div>
                  <div className="mt-16 flex flex-col justify-center items-center h-2/3">
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="flex items-center mb-4 px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      Disconnect
                    </button>
                    {(!emailSubmitted && 
                      <>
                        {(!showEmailField && <button
                          type="button"
                          onClick={() => setShowEmailField(true)}
                          className="flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          Sign up for email notifications!
                        </button>)}
                        {(showEmailField &&
                          <form className="flex flex-col w-full">
                            <input
                              type="email"
                              name="email-notifications"
                              id="email-notifications"
                              className="mb-2"
                              value={email}
                              onChange={(e) => setEmail(e?.target?.value ?? '')}
                              placeholder={'example@email.com'}
                            />
                            <button
                              type="submit"
                              disabled={loading}
                              onClick={submitEmailNotifications}
                              className="w-32 px-4 py-2 self-center border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                              Submit email
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}

              {state === WalletConnectState.ConfirmNetwork && (
                <>
                  {/* switchNetwork fn not available in case of walletconnect provider */}
                  {switchNetwork ? (
                    <div className="mt-8 flex justify-center items-center h-2/3">
                      <button
                        type="button"
                        onClick={handleSwitchNetwork}
                        className="inline-flex items-center px-4 py-2  border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        Switch to {networkData.chains[0].name}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mt-8 text-pink-600 text-xl after:bg-pink-500 text-ellipsis">
                        Please switch to {networkData.chains[0].name} in your
                        wallet
                      </div>
                      <div className="mt-8 flex justify-center items-center h-2/3">
                        <button
                          type="button"
                          onClick={handleDisconnect}
                          className="inline-flex items-center px-4 py-2  border-transparent shadow-sm text-sm font-medium rounded-md text-white Pastel bg-gradient-to-tr from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          Disconnect
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Transition.Child>
          
        </div>
      </Dialog>
    </Transition.Root>
  );
};
