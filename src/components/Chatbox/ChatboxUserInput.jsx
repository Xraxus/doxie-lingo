import styles from "./Chatbox.module.css";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ChatContext } from "./Chatbox";

export default function ChatboxUserInput() {
  const {
    userMessage,
    setChatLog,
    selectedLanguage,
    setUserMessage,
    setWarning,
  } = useContext(ChatContext);
  const API_KEY = import.meta.env.VITE_API_KEY;

  function addUserMessage() {
    setChatLog((prevChatLog) =>
      prevChatLog.concat({
        id: uuidv4(),
        role: "user",
        content: userMessage,
      })
    );
    setUserMessage("");
  }

  async function sendTranslationRequest() {
    try {
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
            content: `Translate to ${selectedLanguage}: ${userMessage}`,
          },
        ],
        max_tokens: 250,
      });

      if (response.choices[0].finish_reason !== "stop") {
        setWarning(
          "Warning: answer may not be complete due to: " +
            response.choices[0].finish_reason
        );
      }

      setChatLog((prevChatLog) =>
        prevChatLog.concat({
          id: response.id,
          role: response.choices[0].message.role,
          content: response.choices[0].message.content,
        })
      );
    } catch (err) {
      console.error(err);
      setWarning("Error: " + err?.error?.message);
    }
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
