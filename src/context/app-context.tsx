import { ReactNode, createContext, useContext, useState } from "react";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({
  showSearch: false,
  setShowSearch: (newState: boolean) => {},
  showSidebar: false,
  setShowSidebar: (newState: boolean) => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showSearch,
        setShowSearch: (newState) => {
          setShowSearch(newState);
        },
        showSidebar,
        setShowSidebar: (newState) => {
          setShowSidebar(newState);
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
