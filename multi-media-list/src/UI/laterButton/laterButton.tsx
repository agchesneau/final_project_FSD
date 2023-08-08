"use client";
import Image from "next/image";
import styles from "./laterButton.module.css";

export default function LaterButton({
  onClick,
  isOn,
}: {
  onClick: () => void;
  isOn: boolean;
}) {
  const alt = isOn ? "remove from up next list" : "add to up next list";
  const style = isOn ? styles.on : styles.off;

  return (
    <div className={styles.container} onClick={onClick}>
      <Image
        src="/clock.svg"
        width={50}
        height={50}
        alt={alt}
        className={style}
        title="add to list"
      />
    </div>
  );
}
