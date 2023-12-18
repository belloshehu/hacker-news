import { ReactNode, createContext, useContext, useState } from "react";
import { Link, LinkContextType } from "./types";

const LinkContext = createContext<LinkContextType | null>(null);

export const LinkContextProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);
  return (
    <LinkContext.Provider
      value={{
        links,
        setLinks: (newLinks) => {
          setLinks(newLinks);
        },
      }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
