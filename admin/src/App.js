import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import LoginPage  from "./pages/LoginPage"
function App() {
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
