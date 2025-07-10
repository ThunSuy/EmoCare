import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";
import Login from './pages/Login';
import VerifyCode from './pages/VerifyCode';
import TestAPI from './components/TestAPI';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestAPI />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify-code" element={<VerifyCode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
