import {IBooks} from "./IBooks";

export interface BookResponse {
    data: IBooks;
}

export interface Book {
    _id: number;
    title: string;
}

export interface Member {
    _id: number;
    full_name: string;
}

export interface Emp {
    _id: number;
    firstName: string;
    lastName: string;
}

export interface BorrowedBook {
    _id: number;
    member: Member;
    book: Book;
    emp: Emp;
    status: string;
    expected_date: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    returned_date: Date;
}

export interface BorrowedBooks {
    data: BorrowedBook[];
}