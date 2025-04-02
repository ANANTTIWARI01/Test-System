import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <Link to="/admin/test/new">Create New Test</Link>
      <Link to="/admin/test/view">View Tests</Link>
    </div>
  );
}

export default AdminHome;
