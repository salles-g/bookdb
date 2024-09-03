import React, { useState } from "react";
import ReactModal from "react-modal";
import { repopulate } from "./repopulate";

export const Return = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-3.31 0-6.291 1.353-8.459 3.522l-2.48-2.48-1.061 7.341 7.437-.966-2.489-2.488c1.808-1.808 4.299-2.929 7.052-2.929 5.514 0 10 4.486 10 10s-4.486 10-10 10c-3.872 0-7.229-2.216-8.89-5.443l-1.717 1.046c2.012 3.803 6.005 6.397 10.607 6.397 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
  </svg>
);

const FooterDev = () => {
  const [promptAreYouSure, setPromptAreYouSure] = useState<boolean>(false);

  const promptRepopulate = () => {
    setPromptAreYouSure(true);
  };
  const cancelRepopulate = () => {
    setPromptAreYouSure(false);
  };
  const confirmRepopulate = async () => {
    await repopulate();
    setPromptAreYouSure(false);
    location.reload();
  };

  return (
    <>
      {promptAreYouSure && (
        <ReactModal
          appElement={$("#root")}
          isOpen={true}
          portalClassName="z-50 bg-[rgba(255,255,255,0.75)] fixed top-0 left-0 w-full h-full"
          overlayClassName="w-full h-full flex justify-center items-center"
          className="relative w-1/2 h-1/2 rounded-xl bg-white border border-gray-200 shadow-lg p-8 flex items-center justify-center outline-none"
        >
          <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="font-bold text-3xl text-[#535353]">
              Tem certeza que quer redefinir os itens?
            </h1>
            <div className="flex gap-4">
              <button onClick={confirmRepopulate} className="text-green-600">
                Sim
              </button>
              <button onClick={cancelRepopulate} className="text-red-600">
                Não
              </button>
            </div>
          </div>
        </ReactModal>
      )}
      <div className="flex justify-between items-center mt-auto mb-4">
        <small className="text-gray-300">
          <a href="https://imgur.com/a/a6t5kOb">© 2024 BookDB</a>
        </small>
        <button
          onClick={promptRepopulate}
          className="appearance-none p-0 m-0 bg-transparent shadow-none hover:shadow-none w-4 h-4 fill-gray-300"
        >
          <Return />
        </button>
      </div>
    </>
  );
};

export default FooterDev;
