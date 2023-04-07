import { Component, Input, OnInit } from '@angular/core';
import { IBooks } from 'src/app/models/IBooks';

@Component({
  selector: "app-bookItem",
  templateUrl: "./bookItem.component.html",
  styleUrls: ["./bookItem.component.css"],
})
export class BookItemComponent implements OnInit {
  @Input() bookItem!: IBooks;

  constructor() {}
  ngOnInit() {}
 
}
