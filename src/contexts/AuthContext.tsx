import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { decodeJwt } from "jose";
import { AbstractException } from "@/services/baseApi/handler/AbstractException";

import { LoginType, UserType } from "@/types";
import { handleError } from "@/utils/handleError";
import { isTokenValid } from "@/utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "@/services/userService/service";
import { toast } from "react-toastify";
import { config } from "@/config";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  signIn: ({ username, password }: LoginType) => any;
  signOut: () => void;
  setUser: Function;
  verifyPermission: (permission: string) => boolean;
};

type AuthContextProviderProps = {
  children?: ReactNode | undefined;
};

// Criando o contexto da sessão
export const AuthContext = createContext({} as AuthContextType);

// Criando um hook para facilitar o uso do contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

// Provedor do contexto
export function AuthProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathName = useMemo(() => location.pathname, [location]);

  const [user, setUser] = useState<UserType | null>(null);

  const nextAuthTokenName = config.NEXT_AUTH_TOKEN_NAME;

  const isAuthenticated = !!user;

  const noValidAuthPaths = ["/login", "/register"];

  // useEffect(() => {
  //   const token = localStorage.getItem(nextAuthTokenName);
  //   const isNoValidAuthPath = noValidAuthPaths.includes(pathName);

  //   if (token) {
  //     handleJWTToken(token);

  //     if (!isTokenValid(token)) {
  //       localStorage.removeItem(nextAuthTokenName);
  //       navigate("/login");
  //       toast.error("Sessão Expirada, favor fazer login novamente");
  //       return;
  //     }
  //   } else if (!isNoValidAuthPath) {
  //     navigate("/login");
  //     toast.error("Ação não autorizada, favor fazer login!");
  //   }
  // }, [pathName]);

  const handleJWTToken = async (token: string) => {
    const { sub, UUID, ROLE, AUTHORITIES, name } = decodeJwt(token);

    localStorage.setItem(nextAuthTokenName, token);
    const privilegs = AUTHORITIES as { authority: string }[];

    setUser({
      id: UUID as string,
      role: ROLE as string,
      username: sub,
      authorities: privilegs?.map((a: { authority: string }) => a.authority),
      name: name as string,
    });

    if (pathName === "/login" || pathName === "/register") {
      navigate("/dashboard");
    }
  };

  async function signIn({ username, password }: LoginType) {
    try {
      const resp = await UserService.login({ username, password });

      if (resp == undefined)
        throw new AbstractException("Alguma coisa saiu errado!");

      const token: string = resp.data;
      await handleJWTToken(token);

      return null;
    } catch (e) {
      handleError({ e });
      return e;
    }
  }

  function signOut() {
    localStorage.removeItem(nextAuthTokenName);
    navigate("/login");
  }

  function verifyPermission(permission: string) {
    const authorities = user?.authorities;
    return authorities?.includes(permission) ?? false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        signIn,
        signOut,
        verifyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
