import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AdminAuth({ children }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      setLoading(true);
      await instance.get("/admin/check", { withCredentials: true });
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
      await instance.post("/admin/logout", {}, { withCredentials: true });
      checkAuthentication();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, checkAuthentication, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default AdminAuth;
