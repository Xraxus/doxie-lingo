import { useEffect } from "react";
import styles from "./Chatbox.module.css";
import OpenAI from "openai";
import { useState } from "react";

export default function Chatbox() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [selectedLanguage, setSelectedLanguage] = useState("Japanese");
  const [userMessage, setUserMessage] = useState("");

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
      {/* {chatMessages.map((message) => (
        <p>
          {message.role}: {message.content}
        </p>
      ))} */}
      <button onClick={sendTranslationRequest}>send</button>
    </div>
  );
}
