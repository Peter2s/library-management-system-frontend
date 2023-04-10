export interface IBooks {
  _id: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  publishingDate: Date;
  edition: number;
  pages: number;
  noOfCopies: number;
  shelfNo: number;
  available: number;
  borrowedCopies: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
