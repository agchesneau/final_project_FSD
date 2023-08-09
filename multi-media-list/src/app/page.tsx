"use client";
import styles from "./page.module.css";
import Authentication from "@/components/authentication/authentication";
import AllLists from "@/components/allLists/allLists";
import { getUser } from "@/models/UserModel";
import { use, useEffect, useState } from "react";

export default function Home() {
  const list = [
    { id: 1, name: "Drive", type: "movie" },
    { id: 2, name: "The Martian", type: "book" },
    { id: 3, name: "The Expanse", type: "TV" },
    { id: 4, name: "The Handmaid's Tail", type: "TV" },
    { id: 5, name: "MacBeth", type: "book" },
    { id: 6, name: "The Shining", type: "book" },
    { id: 7, name: "Six Feet Under", type: "TV" },
    { id: 8, name: "The Wire", type: "TV" },
    { id: 9, name: "The Sopranos", type: "TV" },
    { id: 10, name: "The Godfather", type: "movie" },
  ];
  const [loggedIn, setLoggedIn] = useState(false);
  const checkUser = async () => {
    const res = await getUser();
    res === "user logged in" ? setLoggedIn(true) : setLoggedIn(false);
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <main className={styles.main}>
      {!loggedIn ? <Authentication /> : <AllLists />}
    </main>
  );
}
