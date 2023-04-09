export interface IBooks {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  publishingDate: Date;
  pages: number;
  noOfCopies: number;
  shelfNo: number;
  available: number;
  borrowedCopies: number;
  //image: string;
  created_at?: Date;
  updated_at?: Date;
}
