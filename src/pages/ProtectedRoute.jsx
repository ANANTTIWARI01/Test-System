import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    try {
      setLoading(true);
      const response = await instance.get("/user/check", {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 200) setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div id="loading">LOADING...</div>;

  // console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
