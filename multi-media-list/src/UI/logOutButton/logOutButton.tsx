import styles from "./logOutButton.module.css";
export default function LogOutButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      Log out
    </button>
  );
}
