import { ReactNode, useEffect, useState } from "react";
import { agentLogin } from "../api";
import BouncingCircles from "../assets/bouncing-circles.svg";

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
  return (
    <div className="h-dvh w-dvh flex items-center justify-center">
      <img src={BouncingCircles} alt="loading-animation" className="h-20" />
    </div>
  );
}

export default AuthProvider;
