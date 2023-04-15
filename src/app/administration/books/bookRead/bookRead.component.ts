import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMembers } from 'src/app/models/IMembers';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MembersService } from "../../services/members.service";


@Component({
  selector: "app-bookRead",
  templateUrl: "./bookRead.component.html",
  styleUrls: ["./bookRead.component.css"],
  providers: [MessageService],
})
export class BookReadComponent implements OnInit {
  readBook: FormGroup;
  filteredMembers: IMembers[] = [];
  member: any;
  constructor(
    private booksService: BooksService,
    private MembersService: MembersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.readBook = this.fb.group({
      member: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const data = {
      member_id: this.readBook.get("member")?.value._id,
      book_id: this.activatedRoute.snapshot.params["id"],
    };
    console.log(data);
    this.booksService.readBook(data).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: "success",
          summary: "success",
          detail: "success !!! ",
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
      },
    });
  }

  Autocomplete(event: any): void {
    console.log();
    const fullName = { full_name: this.readBook.get("member")?.value };
    this.MembersService.search(fullName).subscribe((members) => {
      this.filteredMembers = members.data;
      console.log(members);
    });
  }
}
