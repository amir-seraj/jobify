import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Error, Dashboard, Register } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={Landing} />
        <Route path="*" element={Error} />
        <Route path="/" element={Dashboard} />
        <Route path="/register" element={Register} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
