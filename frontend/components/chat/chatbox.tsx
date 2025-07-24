"use client";
// import { backend } from 'declarations/backend';

// import { useState, useRef } from 'react';
export function ChatBox() {
  //      const [chat, setChat] = useState([
  //     {
  //       system: { content: "I'm a sovereign AI agent living on the Internet Computer. Ask me anything." }
  //     }
  //   ]);
  //   const [inputValue, setInputValue] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  //   const chatBoxRef = useRef(null);
  //   const askAgent = async (messages) => {
  //     try {
  //       const response = await backend.chat(messages);
  //       setChat((prevChat) => {
  //         const newChat = [...prevChat];
  //         newChat.pop();
  //         newChat.push({ system: { content: response } });
  //         return newChat;
  //       });
  //     } catch (e) {
  //       console.log(e);
  //       const eStr = String(e);
  //       const match = eStr.match(/(SysTransient|CanisterReject), \\+"([^\\"]+)/);
  //       if (match) {
  //         alert(match[2]);
  //       }
  //       setChat((prevChat) => {
  //         const newChat = [...prevChat];
  //         newChat.pop();
  //         return newChat;
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  return <div></div>;
}
