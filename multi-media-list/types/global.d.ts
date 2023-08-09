export {};

declare global {
  interface Media {
    mediaID?: number;
    name: string;
    type: string = "book" | "movie" | "TV";
    link?: string | null;
    imgURI?: string | null;
  }

  interface Diary {
    id?: number;
    mediaID: number;
    event: string;
    entryDate: string;
    notes: string;
  }
}
