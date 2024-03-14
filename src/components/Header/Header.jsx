import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div>
        <h1>DoxieLingo</h1>
        <p>Perfect translation Every Time</p>
      </div>
    </div>
  );
}
