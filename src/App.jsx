import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./style.css";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/admin/UserDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
           <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
