import { useEffect } from "react";
import styles from "./Chatbox.module.css";
import OpenAI from "openai";
import { useState } from "react";
import ChatboxMessagesList from "./ChatboxMessagesList";

export default function Chatbox() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");
  const [userMessage, setUserMessage] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      id: "0",
      role: "assistant",
      content:
        "Select the language you want me to translate into, then type your text and hit send! ",
    },
    {
      id: "1",
      role: "user",
      content: "Siema siema tu dobre ziomale nie wiem co sie stało z nami ",
    },
    {
      id: "2",
      role: "assistant",
      content:
        "Select the language you want me to translate into, then type your text and hit send! ",
    },
  ]);

  async function sendTranslationRequest() {
    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
      temperature: 0.7,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful expert translator. Your job is to translate recieved text to ${selectedLanguage}.`,
        },
        {
          role: "user",
          content: `${userMessage}`,
        },
      ],
    });

    console.log(response);
    // setChatMessages((prevChatMessages) =>
    //   prevChatMessages.concat(response.choices[0].message)
    // );
  }

  return (
    <div className={styles.chatbox}>
      <ChatboxMessagesList chatLog={chatLog} />
      <button onClick={sendTranslationRequest}>send</button>
    </div>
  );
}
