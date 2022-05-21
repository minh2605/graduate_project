import React, { ReactNode, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

export const LoadingContext = React.createContext<LoadingContextProps>({});

interface LoadingContextProps {
  setLoading?: (value: boolean) => void;
}

interface LoadingProviderProps {
  children: ReactNode;
}
const LoadingProvider = ({ children }: LoadingProviderProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        setLoading,
      }}
    >
      {loading && (
        <div className="z-backdrop bg-backdrop fixed inset-0">
          <div className="w-full h-full flex items-center justify-center">
            <HashLoader color="#B92F28" loading={loading} size={80} />
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
