import styles from "./Chatbox.module.css";
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

  async function addUserMessage() {
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
      const response = await fetch("/.netlify/functions/translate", {
        method: "POST",
        body: JSON.stringify({ userMessage, selectedLanguage }),
      });

      if (!response.ok) {
        throw new Error("Failed to translate message");
      }

      const translatedMessage = await response.json();

      setChatLog((prevChatLog) =>
        prevChatLog.concat({
          id: uuidv4(),
          role: "assistant",
          content: translatedMessage,
        })
      );
    } catch (error) {
      console.error(error);
      setWarning("Error: " + error.message);
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
