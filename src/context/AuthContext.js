import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);

  //checks in localStorage whether we have a token already or not
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  //observe change state of token and put it in localStorage, if there is no token, remove it from localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
