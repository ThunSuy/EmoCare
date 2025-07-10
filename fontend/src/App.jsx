import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";
import Login from './pages/Login';
import VerifyCode from './pages/VerifyCode';
import TestAPI from './components/TestAPI';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
