import { ReactNode, useEffect, useState } from "react";
import { agentLogin } from "../api";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const handleAuth = async () => {
    await agentLogin();
    setAuthenticated(true);
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (authenticated) return children;
  return <h1>Loading :)</h1>;
}

export default AuthProvider;
