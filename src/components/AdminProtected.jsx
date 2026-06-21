import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin === "true" ? children : <Navigate to="/admin-login" />;
}

export default AdminProtected;
