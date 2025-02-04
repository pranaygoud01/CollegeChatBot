import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'; 
import { motion } from 'framer-motion'; 
import { easeOut } from 'framer-motion';
import { IoIosChatboxes } from "react-icons/io";
import { companyInfo } from './CompanyInfo';

const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'AIzaSyBVH8rqVm4UhrrjPgHTXDaQoKEEtdYmNgY';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const [status, setStatus] = useState(true);
  const inputRef = useRef(null);
  const chatRef = useRef(null); 

  const addMessage = () => {
    const message = inputRef.current.value.trim();
    if (!message) return;

    setHistory((prevHistory) => [...prevHistory, { role: "man", message }]);
    inputRef.current.value = "";
    setStatus(false);
    setLoading(true);

    setHistory((prevHistory) => [...prevHistory, { role: "bot", message: "loading" }]);
    generateMsg(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addMessage();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  const generateMsg = async (userMessage) => {
    try {
      const response = await axios.post(API_URL, {
        contents: [
          {
            parts: [
              {
                text: `Here is some company info: ${companyInfo} Now, answer the following question without using asterisks or special symbols: ${userMessage}`,
              }
            ]
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const botResponse = response.data.candidates[0]?.content.parts[0]?.text.replace(/[*_~`]/g, '') || "Sorry, I didn't get that!";
      
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1] = { role: "bot", message: botResponse };
        return updatedHistory;
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1] = { role: "bot", message: "Oops! Something went wrong." };
        return updatedHistory;
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      animate={{ scale: [0.6, 1] }}
      transition={{ duration: 0.2, ease: easeOut }}
      className="flex flex-col shadow-xl rounded-[35px] bg-white p-8 h-[90vh] w-[400px] max-lg:w-full max-lg:h-full max-lg:rounded-none relative"
    >
      <h1 className="font-bold text-[#272727] text-2xl">New Chat</h1>

      {status ? (
        <div className="flex-1 text-[#696969f5] gap-4 font-semibold text-xl max-lg:text-[18px] flex justify-center flex-col items-center overflow-y-auto mt-4">
          <IoIosChatboxes className="text-4xl " />
          <p>How can I help you? Send me Hi 👋</p>
        </div>
      ) : (
        <div
          ref={chatRef}
          className="flex-1 flex flex-col gap-3 overflow-y-auto pb-20 hide-scrollbar mt-5 font-semibold text-[#525252f6]"
        >
          {history.map((item, index) => (
            <div
              key={index}
              className={`h-fit px-4 py-3  w-fit max-w-[86%] ${
                item.role === "man"
                  ? "bg-blue-500 text-white self-end rounded-l-xl rounded-br-xl"
                  : "bg-neutral-100 rounded-r-xl rounded-bl-xl"
              }`}
            >
              {item.message === "loading" ? (
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                </div>
              ) : (
                <p>{item.message}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-7 bg-white pt-1 left-4 flex gap-3 right-4">
        <input
          type="text"
          placeholder="Send a message..."
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-4 border rounded-[23px] focus:outline-none font-semibold bg-neutral-50 focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-neutral-200 text-[#1f1f1f] font-bold rounded-[24px] w-4/12 flex justify-center items-center"
          onClick={addMessage}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatPage;
