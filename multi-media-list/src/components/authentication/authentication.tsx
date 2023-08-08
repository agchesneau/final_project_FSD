"use client";
import AuthForm from "@/UI/authForm/authForm";
import { useState } from "react";
import styles from "./authentication.module.css";
import { register, login } from "../../models/UserModel";
export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [choseLogin, setChoseLogin] = useState(false);
  const submit = choseLogin ? "Log in" : "Sign up";
  const handleSubmit = async () => {
    const res = choseLogin
      ? await login(username, password)
      : await register(username, password);
    if (res === "success") {
      window.location.reload();
    } else {
      setError(res);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <p
          className={!choseLogin ? styles.selectedText : styles.text}
          onClick={() => setChoseLogin(false)}
        >
          Sign up
        </p>
        <p className={styles.text}>|</p>
        <p
          className={choseLogin ? styles.selectedText : styles.text}
          onClick={() => setChoseLogin(true)}
        >
          Log in
        </p>
      </div>
      <AuthForm getUsername={setUsername} getPassword={setPassword} />
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} onClick={handleSubmit}>
        {submit}
      </button>
    </div>
  );
}
