import MediaRow from "@/UI/mediaRow/mediaRow";
import ErrorMsg from "@/UI/errorMessage/errorMsg";
import { createContext, useEffect, useState } from "react";
import LogOutButton from "@/UI/logOutButton/logOutButton";
import { logout } from "@/models/UserModel";
import styles from "./allLists.module.css";
import AddMedia from "@/UI/addMedia/addMedia";

const ErrorContext = createContext({ error: false, message: "" });

export default function AllLists({
  upNext,
  started,
  finished,
}: {
  upNext: Media[];
  started: Media[];
  finished: Media[];
}) {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleLogOut = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    // Add a global error event listener
    const errorHandler = (event: ErrorEvent) => {
      setError(true);
      setMessage(event.message || "An error occurred");
    };

    window.addEventListener("error", errorHandler);

    return () => {
      // Clean up the error event listener when the component unmounts
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  return (
    <div>
      <div className={styles.logOutContainer}>
        <LogOutButton onClick={handleLogOut} />
      </div>
      <ErrorContext.Provider value={{ error, message }}>
        {error && <ErrorMsg message={message} />}
        <MediaRow list={upNext} rowName="Up Next" />
        <MediaRow list={started} rowName="Started" />
        <MediaRow list={finished} rowName="Finished" />
      </ErrorContext.Provider>
    </div>
  );
}
