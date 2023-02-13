import useToken from "@/hooks/useToken";
import { createUser, signInUser, UserData } from "@/services/UserService";
import { useContext, useState } from "react";
import { createContext, FC, useMemo } from "react";

const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async (data: UserData) => {
    try {
      const { message, status } = await createUser(data);

      if (message && status !== 200) {
        setErrorMessage(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async (data: UserData) => {
    try {
      const { token: _token, message, status } = await signInUser(data);

      if (_token) {
        setToken(_token);
        setErrorMessage("");
      }

      if (message && status !== 200) {
        setErrorMessage(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = useMemo(
    () => ({ signUp, signIn, token, errorMessage }),
    [signUp, token, errorMessage]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): {
  signUp?(data: UserData): void;
  signIn?(data: UserData): void;
  token?: string;
  errorMessage?: string;
} => {
  return useContext(AuthContext);
};
