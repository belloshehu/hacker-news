import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContextType, TokenType, UserType } from "./types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ name: "", email: "" });
  const [token, setToken] = useState<TokenType>("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => setUser(user),
        setToken,
        token,
        clearToken: () => setToken(null),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
