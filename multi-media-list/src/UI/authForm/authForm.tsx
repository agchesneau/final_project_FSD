import styles from "./authForm.module.css";

export default function AuthForm({
  getUsername,
  getPassword,
}: {
  getUsername: (username: string) => void;
  getPassword: (password: string) => void;
}) {
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    getUsername(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    getPassword(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="username" className={styles.text}>
          username :
        </label>
        <input
          type="text"
          name="userame"
          id="username"
          onChange={handleChangeUsername}
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.text}>
          password :
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChangePassword}
          className={styles.input}
        />
      </div>
    </div>
  );
}
