import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function Auth({ children }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      setLoading(true);
      await instance.get("/user/check", { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      !loading && console.error(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await instance.post("/user/logout", {}, { withCredentials: true });
      checkAuthentication();
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTests() {
    try {
      const response = await instance.get("/user/tests", {
        withCredentials: true,
      });
      return response.data.tests;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchQuestions(id) {
    try {
      const response = await instance.get("/user/test/" + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
         
  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        checkAuthentication,
        logout,
        fetchTests,
        fetchQuestions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default Auth;
