import { BrowserRouter, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
