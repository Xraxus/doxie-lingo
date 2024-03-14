import styles from "./Chatbox.module.css";
import OpenAI from "openai";
import { useContext, useId } from "react";
import { ChatContext } from "./Chatbox";

export default function ChatboxUserInput() {
  const { userMessage, setChatLog, selectedLanguage, setUserMessage } =
    useContext(ChatContext);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const nextMessageId = useId();

  function addUserMessage() {
    setChatLog((prevChatLog) =>
      prevChatLog.concat({
        id: nextMessageId,
        role: "user",
        content: userMessage,
      })
    );
    setUserMessage("");
  }

  async function sendTranslationRequest() {
    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
      temperature: 0.5,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful expert translator.`,
        },
        {
          role: "user",
          content: `Translate text below, separated by ### to ${selectedLanguage}.
          ###
          ${userMessage}
          ###`,
        },
      ],
    });

    console.log(response);
    setChatLog((prevChatLog) =>
      prevChatLog.concat({
        id: response.id,
        role: response.choices[0].message.role,
        content: response.choices[0].message.content,
      })
    );
  }

  return (
    <form
      className={styles.userInput}
      onSubmit={(event) => {
        event.preventDefault();
        sendTranslationRequest();
        addUserMessage();
      }}
    >
      <textarea
        type="text"
        placeholder="How are you?"
        aria-label="Message to translate"
        value={userMessage}
        onChange={(event) => setUserMessage(event.target.value)}
        required
      />
      <button aria-label="submit">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </form>
  );
}
