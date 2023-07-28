import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Update from "./pages/Update";

function App() {
  

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<Update />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
