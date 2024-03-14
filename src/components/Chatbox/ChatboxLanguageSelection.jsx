import { useContext } from "react";
import { ChatContext } from "./Chatbox";
import styles from "./Chatbox.module.css";

import franceFlag from "../../assets/fr-flag.png";
import japanFlag from "../../assets/jpn-flag.png";
import spainFlag from "../../assets/sp-flag.png";
import polandFlag from "../../assets/pl-flag.png";

export default function ChatboxLanguageSelection() {
  const { selectedLanguage, setSelectedLanguage } = useContext(ChatContext);

  const languages = [
    { flag: spainFlag, language: "spanish" },
    { flag: franceFlag, language: "french" },
    { flag: japanFlag, language: "japanese" },
    { flag: polandFlag, language: "polish" },
  ];

  return (
    <div className={styles.languagesContainer}>
      {languages.map((item) => (
        <button
          key={item.language}
          onClick={() => {
            setSelectedLanguage(item.language);
          }}
          className={
            selectedLanguage === item.language ? styles.activeLanguage : ""
          }
        >
          <img src={item.flag} alt={item.language} />
        </button>
      ))}
    </div>
  );
}
