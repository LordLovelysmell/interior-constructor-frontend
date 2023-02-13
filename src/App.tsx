import { FC } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/pages/Auth";
import { Route, Routes } from "react-router-dom";

const App: FC = () => {
  const { token } = useAuth();

  if (!token) {
    return <div>test</div>;
  }

  return <div>You are logged in!</div>;
};

export default App;
