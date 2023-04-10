import { IBooks } from "./IBooks";

export interface IBooksResponse {
  data: Array<IBooks> ;
  pagination: {
    total_books_count:number;
    pages: number;
    current: number;
    limit: number;
  };
}
