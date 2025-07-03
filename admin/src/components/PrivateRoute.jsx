import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children, adminOnly }) {
  const { loading, isAuthenticated, user } = useContext(AuthContext);

  if (loading) return <div>Đang tải xác minh đăng nhập...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (adminOnly && !user.isAdmin) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return children;
}