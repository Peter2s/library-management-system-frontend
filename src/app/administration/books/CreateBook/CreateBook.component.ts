import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooksService } from '../../services/books.service';
import { FormService } from '../../../shared/services/Form.service';

@Component({
  selector: "app-CreateBook",
  templateUrl: "./CreateBook.component.html",
  styleUrls: ["./CreateBook.component.css"],
})
export class CreateBookComponent implements OnInit {
  createBook: FormGroup;
  categories  :string[]= [];
  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private formService: FormService
  ) {
    this.createBook = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      publisher: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      category: ["", Validators.required],
      publishingDate: ["", [Validators.required]],
      pages: ["", [Validators.required, Validators.min(1)]],
      noOfCopies: ["", [Validators.required, Validators.min(1)]],
      shelfNo: ["", [Validators.required, Validators.min(0)]],
      image: ["", Validators.required],

    
    });
  }
  get title() {
    return this.createBook.get("title");
  }
  get author() {
    return this.createBook.get("author");
  }
  get publisher() {
    return this.createBook.get("publisher");
  }
  get pages() {
    return this.createBook.get("pages");
  }
  get publishingDate() {
    return this.createBook.get("publishingDate");
  }
  get category() {
    return this.createBook.get("category");
  }
  get noOfCopies() {
    return this.createBook.get("noOfCopies");
  }
  get shelfNo() {
    return this.createBook.get("shelfNo");
  }
  get image() {
    return this.createBook.get("image");
  }


  ngOnInit() {
    this.booksService.bookCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  onSubmit() {
    if (this.createBook.valid) {
      console.log(this.createBook.value);
    } else {
      // get all errors
      this.formService.handelError(this.createBook);
    }
  }
}
