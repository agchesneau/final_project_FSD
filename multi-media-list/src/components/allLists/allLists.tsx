import MediaRow from "@/UI/mediaRow/mediaRow";
import ErrorMsg from "@/UI/errorMessage/errorMsg";
import { createContext, use, useEffect, useState } from "react";
import LogOutButton from "@/UI/logOutButton/logOutButton";
import { logout } from "@/models/UserModel";
import styles from "./allLists.module.css";
import { getNextList } from "@/models/NextListModel";
import { getStarted, getCompleted } from "@/models/DiaryModel";

const ErrorContext = createContext({ error: false, message: "" });

export default function AllLists() {
  const [upNextList, setUpNextList] = useState<Media[]>([]);
  const [startedList, setStartedList] = useState<Media[]>([]);
  const [finishedList, setFinishedList] = useState<Media[]>([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleLogOut = () => {
    logout();
    window.location.reload();
  };
  useEffect(() => {
    const getNextElements = async () => {
      const res = await getNextList();
      console.log(res);
      setUpNextList(res);
    };
    const getStartedElements = async () => {
      const res = await getStarted();
      console.log(res);
      setStartedList(res);
    };
    const getFinishedElements = async () => {
      const res = await getCompleted();
      console.log(res);
      setFinishedList(res);
    };
    getNextElements();
    getStartedElements();
    getFinishedElements();
  }, []);
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
        <MediaRow list={upNextList} rowName="Up Next" />
        <MediaRow list={startedList} rowName="Started" />
        <MediaRow list={finishedList} rowName="Finished" />
      </ErrorContext.Provider>
    </div>
  );
}
