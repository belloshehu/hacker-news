export type UserType = {
  email?: string;
  name: string;
};

export type VoteType = {
  id: number;
  user: UserType;
  link: Link;
};

export type Link = {
  url: string;
  description: string;
  id: number;
  postedBy: UserType;
  votes: VoteType[];
  createdAt: string;
};

export type LinkContextType = {
  links: Link[];
  setLinks: (link: Link[]) => void;
};

export type TokenType = string | null;

export type AuthContextType = {
  user: UserType;
  token: string | null;
  setUser: (user: UserType) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export type AppContextType = {
  showSearch: boolean;
  setShowSearch: (newState: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (newState: boolean) => void;
};
