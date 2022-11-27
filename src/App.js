import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SendMessage from "./components/SendMessage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<SendMessage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
