import { useState } from "react";

const getToken = () => {
  const _token = localStorage.getItem("token");

  return JSON.parse(_token);
};

const useToken = () => {
  const [token, setToken] = useState(getToken());

  const _setToken = (_token: String) => {
    localStorage.setItem("token", JSON.stringify(_token));
    setToken(_token);
  };

  return [token, _setToken];
};

export default useToken;
