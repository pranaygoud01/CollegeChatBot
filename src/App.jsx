import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
;
import ChatPage from "./pages/ChatPage";
import Box from "./components/Box";

const App = () => {
  return (
    <div className='bg-gray-50 max-lg:bg-white h-[100vh] max-lg:h-[93vh] w-full flex justify-center items-center'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
