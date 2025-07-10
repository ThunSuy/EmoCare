import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";
import Login from './pages/Login';
import VerifyCode from './pages/VerifyCode';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1 className='underline bg-red-400'>Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify-code" element={<VerifyCode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
