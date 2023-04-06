import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksRoutes } from './books.routing';
import { BookItemComponent } from './bookItem/bookItem.component';

@NgModule({
  imports: [CommonModule, BooksRoutes],
  declarations: [BooksComponent, BookItemComponent],
})
export class BooksModule {}
