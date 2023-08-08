export {};

declare global {
  interface Media {
    id: number;
    name: string;
    type: string = "book" | "movie" | "TV";
    link?: string | null;
    imgURI?: string | null;
  }
}
