import { Component, Input, OnInit } from "@angular/core";
import { BooksService } from "../../services/books.service";
import { MembersService } from "../../services/members.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { IMembers } from "src/app/models/IMembers";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: "app-bookBorrow",
  templateUrl: "./bookBorrow.component.html",
  styleUrls: ["./bookBorrow.component.css"],
  providers:[MessageService]
})
export class BookBorrowComponent implements OnInit {
  @Input("book") book: any;
  visible: boolean = false;
  borrowBook: FormGroup;
  filteredMembers: IMembers[] = [];
  member: any;
  constructor(
    private booksService: BooksService,
    private MembersService: MembersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService : MessageService
  ) {
    this.borrowBook = this.fb.group({
      member: ["", [Validators.required]],
      returnDate: ["", [Validators.required, this.dateValidator]],
    });
  }

  ngOnInit() {}
  dateValidator(control: FormControl) {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    if (inputDate <= currentDate) {
      return { dateAfterToday: true };
    }
    return null;
  }
  onSubmit() {  
    console.log(this.borrowBook.get("member")?.value);
    const data = {
      member_id:this.borrowBook.get("member")?.value._id,
      book_id: this.activatedRoute.snapshot.params["id"],
      expectedDate: this.borrowBook.get('returnDate')?.value ,
    };
    console.log(data);
    this.booksService.borrowBook(data).subscribe(
      {
        next: (res) => {
          this.messageService.add({
            severity: "success",
            summary: "success",
            detail: 'success !!! ',
            life: 5000,
          });
        },
        error: (err) => {
          console.log("Error", err);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message.error,
            life: 5000,
          });
        }
      });
  }
  
  Autocomplete(event: any): void {
    console.log()
    const fullName = { full_name: this.borrowBook.get("member")?.value };
    this.MembersService.search(fullName).subscribe((members) => {
      this.filteredMembers = members.data;
      console.log(members);
    });
  }
}
