import { IBooks } from "./IBooks";
export interface BookResponse {
  data: IBooks;
  pagination: {
    total_books_count:number;
    pages: number;
    current: number;
    limit: number;
  };


}
