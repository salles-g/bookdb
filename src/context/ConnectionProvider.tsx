import { Dinosaur } from "../components/atoms/Icons";
import React, { createContext, useContext, useEffect, useState } from "react";
import Modal from "react-modal";

export const useConnection = () => {
  return useContext(ConnectionContext)!;
};

const ConnectionContext = createContext(null);
const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  useEffect(() => {
    const handleConnectionChange = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  return (
    <ConnectionContext.Provider value={null}>
      {!isConnected && (
        <Modal
          appElement={$("#root")}
          isOpen={true}
          portalClassName="z-50 bg-[rgba(255,255,255,0.75)] fixed top-0 left-0 w-full h-full"
          overlayClassName="w-full h-full flex justify-center items-center"
          className="relative w-1/2 h-1/2 rounded-xl bg-white border border-gray-200 shadow-lg p-8 flex items-center justify-center outline-none"
        >
          <div className="flex flex-col justify-center items-center gap-8">
            <Dinosaur />
            <h1 className="font-bold text-3xl text-[#535353]">No internet</h1>
          </div>
        </Modal>
      )}
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
