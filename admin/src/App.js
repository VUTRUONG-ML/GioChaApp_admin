import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import LoginPage  from "./pages/LoginPage"
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
function App() {
  const {loading} = useContext(AuthContext)
  if (loading) return <div>Đang tải xác minh đăng nhập...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
