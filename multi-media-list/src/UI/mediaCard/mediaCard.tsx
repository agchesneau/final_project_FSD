"use client";
import Image from "next/image";
import Book from "../../../public/placeholder_book.svg";
import TV from "../../../public/placeholder_tv.svg";
import Movie from "../../../public/placeholder_movie.svg";
import styles from "./mediaCard.module.css";

export default function MediaCard({
  media,
  onClickMedia,
}: {
  media: Media;
  onClickMedia: (id: number, name: string) => void;
}) {
  const handleClickMedia = () => {
    media.mediaID ? onClickMedia(media.mediaID, media.name) : null;
  };
  return (
    <div className={styles.imageContainer}>
      <Image
        src={media.type === "tv" ? TV : media.type === "movie" ? Movie : Book}
        alt="placeholder"
        className={styles.image}
        width={400}
        height={600}
        onClick={handleClickMedia}
        priority
      />
      <h2 className={styles.title}>{media.name}</h2>
    </div>
  );
}
