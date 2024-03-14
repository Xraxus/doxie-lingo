import styles from "./Chatbox.module.css";

export default function ChatboxMessagesList({ chatLog }) {
  const messagess = chatLog.map((message) => (
    <p
      key={message.id}
      className={`${styles.message} ${
        message.role === "assistant" && styles.assistantMessage
      }`}
    >
      {message.content}
    </p>
  ));

  return <div className={styles.messagesList}>{messagess}</div>;
}
