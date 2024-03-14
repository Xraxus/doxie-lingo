import { createContext, useState, useEffect } from "react";

import styles from "./Chatbox.module.css";

import ChatboxMessagesList from "./ChatboxMessagesList";
import ChatboxUserInput from "./ChatboxUserInput";
import ChatboxLanguageSelection from "./ChatboxLanguageSelection";

export const ChatContext = createContext();

export default function Chatbox() {
  const [warning, setWarning] = useState("");
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

  useEffect(() => {
    if (warning) {
      const timerId = setTimeout(() => {
        setWarning("");
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [warning]);

  return (
    <div className={styles.chatbox}>
      {warning && <p className={styles.warning}>{warning}</p>}
      <ChatContext.Provider
        value={{
          chatLog,
          setChatLog,
          selectedLanguage,
          setSelectedLanguage,
          userMessage,
          setUserMessage,
          warning,
          setWarning,
        }}
      >
        <ChatboxMessagesList />
        <ChatboxUserInput />
        <ChatboxLanguageSelection />
      </ChatContext.Provider>
    </div>
  );
}
