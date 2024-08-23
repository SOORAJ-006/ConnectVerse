import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import ForgetPassword from './components/forgetPasword/ForgetPassword'
import ResetPassword from './components/resetPassword/ResetPassword'
import DashBoard from "./components/dashBoard/DashBoard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
