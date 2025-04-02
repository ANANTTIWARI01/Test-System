import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <h1>Test System</h1>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </header>
  );
}

export default Header;
