import Image from "next/image";
import styles from "./errorMsg.module.css";
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={styles.error}>
      <div className={styles.iconContainer}>
        <Image
          src="/error.svg"
          alt="error"
          width={200}
          height={200}
          className={styles.icon}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>Oops!</h1>
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  );
}
