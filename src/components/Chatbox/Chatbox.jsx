import { createContext, useState } from "react";

import styles from "./Chatbox.module.css";

import ChatboxMessagesList from "./ChatboxMessagesList";
import ChatboxUserInput from "./ChatboxUserInput";
import ChatboxLanguageSelection from "./ChatboxLanguageSelection";

export const ChatContext = createContext();

export default function Chatbox() {
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");
  const [userMessage, setUserMessage] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      id: "0",
      role: "assistant",
      content:
        "Select the language you want me to translate into, then type your text and hit send! ",
    },
  ]);

  return (
    <div className={styles.chatbox}>
      <ChatContext.Provider
        value={{
          chatLog,
          setChatLog,
          selectedLanguage,
          setSelectedLanguage,
          userMessage,
          setUserMessage,
        }}
      >
        <ChatboxMessagesList />
        <ChatboxUserInput />
        <ChatboxLanguageSelection />
      </ChatContext.Provider>
    </div>
  );
}
