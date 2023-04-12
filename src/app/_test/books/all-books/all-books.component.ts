import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IBooks} from '../../../models/IBooks';
import {BooksService} from '../../../administration/services/books.service';
import {IBooksResponse} from "../../../models/IBooksResponse";
import {BookResponse} from "../../../models/book-response";


@Component({
    selector: 'app-books',
    templateUrl: './all-books.component.html',
    styleUrls: ['./all-books.component.css'],
    providers: [ConfirmationService, MessageService]
})

export class AllBooksComponent implements OnInit {
    bookForm: FormGroup = {} as FormGroup;
    books: IBooks[];
    categories: String[] = [];
    book: IBooks;
    displayDialog: boolean;
    loading: boolean;
    totalBooksCount: number = 0;
    first: number = 0;
    currentPage: number = 1;
    booksPerPage: number = 10;
    rowsPerPageOptions: number[] = [8, 2 * 8, 4 * 8];
    public validationErros?: { [p: string]: string };
    protected readonly console = console;

    constructor(private booksService: BooksService,
                public confirmationService: ConfirmationService,
                public messageService: MessageService,
                private formBuilder: FormBuilder
    ) {
        this.books = [];
        this.book = {} as IBooks;
        this.displayDialog = false;
        this.loading = false;
    }

    ngOnInit(): void {
        const trim = (str: string) => str.trim();
        this.getBooks();
        this.getCategories();
        this.bookForm = this.formBuilder.group({
            title: [trim, Validators.required],
            author: [trim, Validators.required],
            publisher: [trim, Validators.required],
            category: ['', Validators.compose([
                // Validators.required,
                value => {
                    console.log(value.value)
                    return this.categories.includes(value.value) ? null : {invalidCategory: true}
                }
            ])],
            publishingDate: ['', Validators.compose([
                Validators.required,
                value => {
                    const date = new Date(value.value);
                    const today = new Date();
                    return date < today ? null : {invalidDate: true};
                }
            ])],
            edition: ['', Validators.compose([Validators.required, Validators.min(1)])],
            pages: ['', Validators.compose([Validators.required, Validators.min(1)])],
            noOfCopies: ['', Validators.compose([Validators.required, Validators.min(1)])],
            shelfNo: ['', Validators.compose([Validators.required, Validators.min(1)])],
            // image: ['', Validators.required],
        });
    }

    getBooks(): void {
        this.loading = true;
        this.booksService.getBooks(this.currentPage, this.booksPerPage).subscribe(
            (response: IBooksResponse) => {
                this.books = response.data;
                this.loading = false;
                this.totalBooksCount = response.pagination.total_books_count;
                // this.currentPage = response.pagination.current;
                // this.booksPerPage = response.pagination.limit;

            }, (error) => {
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to get books.'
                    });
                this.loading = false;
            }
        )
    }

    getCategories(): void {
        this.booksService.getCategories().subscribe(
            (response: any) => {
                this.categories = response.data;
                // console.log(this.categories)
            }, (error) => {
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to get categories.',
                        life: 5000
                    });
            }
        )
    }

    onPageChange(event: any): void {
        console.log(event);
        this.currentPage = event.page + 1;
        this.booksPerPage = event.rows;
        this.getBooks();
    }

    showDialogToAdd(): void {
        this.book = {} as IBooks;
        this.displayDialog = true;
    }

    editBook(book: IBooks): void {
        this.book = {...book};
        this.book.publishingDate = new Date(this.book.publishingDate);
        this.displayDialog = true;
    }

    confirmDeleteBook(book: IBooks): void {
        // console.log('confirmDeleteBook.',book)
        this.book = book;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this book?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => {
                console.log(book)
                this.deleteConfirmed();
            },
        });
    }

    deleteConfirmed(): void {
        console.log('deleteConfirmed.')
        this.deleteBook();
        this.confirmationService.close();
        // this.messageService.add({
        //     severity: 'success',
        //     summary: 'Success',
        //     detail: 'Book deleted.',
        //     life: 5000
        // });
        this.getBooks();

    }

    saveBook(): void {
        this.validationErros = {};
        if (this.book._id) {
            this.booksService.updateBook(this.book).subscribe(
                (response: IBooks) => {
                    this.book = response;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Book updated.',
                        life: 5000
                    });
                    this.getBooks();
                    //   this.books[this.findIndexById(this.book._id)] = this.book;
                    this.displayDialog = false;
                },
                (error) => {
                    // console.log(error.message)
                    this.validationErros = this.formatError(error.message)
                    // console.log(this.formatError(error.message));
                    // console.log(this.validationErros['title']);
                    let keys = Object.keys(this.validationErros);
                    for (let key of keys) {
                        console.log(key);
                        this.messageService.add({
                            key: key,
                            severity: 'error',
                            summary: 'Error',
                            detail: this.validationErros[key],
                            // life: 5000
                        });
                    }
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update book.',
                        life: 5000
                    });
                }
            );
        } else {
            this.booksService.addBook(this.book).subscribe(
                (response: BookResponse) => {
                    this.books.push(response.data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Book added.',
                        life: 5000
                    });
                    this.displayDialog = false;
                },
                (error) => {
                    // console.log(error.message)
                    this.validationErros = this.formatError(error.message)
                    // console.log(this.formatError(error.message));
                    // console.log(this.validationErros['title']);
                    let keys = Object.keys(this.validationErros);
                    for (let key of keys) {
                        console.log(key);
                        this.messageService.add({
                            key: key,
                            severity: 'error',
                            summary: 'Error',
                            detail: this.validationErros[key],
                            // life: 5000
                        });
                    }
                    // for (let e of error.error){
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message,
                        // life: 5000
                    });
                    // }
                }
            );
        }
        this.getBooks();
    }

    deleteBook(): void {
        // console.log('deleteBook')
        // console.log(this.book._id)
        // return;
        this.displayDialog = false;
        if (this.book._id) {
            this.booksService.deleteBook(this.book._id).subscribe(
                () => {
                    console.log('deleteBook')
                    this.books.splice(this.findIndexById(this.book._id), 1);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Book deleted.',
                        life: 5000
                    });
                    this.getBooks();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete book.',
                        life: 5000
                    });
                }
            );
        }

    }

    cancel(): void {
        this.displayDialog = false;
    }

    onRowSelect(event: { data: IBooks; }): void {
        this.book = event.data;
        this.displayDialog = true;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    formatError(error: string): { [key: string]: string } {
        const errors: { [key: string]: string } = {};
        error = error.replace("Error: ", "");
        error.split(",").forEach((error) => {
            let [key, ...value] = error.split(":");
            key = key.substring(key.indexOf("[") + 1, key.indexOf("]"))
            errors[key.trim()] = value.join(":").split("==>")[1].trim();
        });
        return errors;
    }

}


