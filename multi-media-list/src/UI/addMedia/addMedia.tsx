import Image from "next/image";
import styles from "../mediaCard/mediaCard.module.css";
export default function AddMedia({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src="/addMedia.svg"
        alt="add media"
        className={styles.image}
        width={400}
        height={600}
        onClick={onClick}
      />
    </div>
  );
}
