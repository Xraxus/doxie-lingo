import { useContext } from "react";
import styles from "./Chatbox.module.css";
import { ChatContext } from "../Chatbox/Chatbox";

export default function ChatboxMessagesList() {
  const { chatLog } = useContext(ChatContext);

  const messagess = chatLog.map((message) => (
    <p
      key={message.id}
      className={`${styles.message} ${
        message.role === "assistant" ? styles.assistantMessage : ""
      }`}
    >
      {message.content}
    </p>
  ));

  return <div className={styles.messagesList}>{messagess}</div>;
}
