import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBorrowedComponent } from './list-borrowed.component';

describe('ListBorrowedComponent', () => {
  let component: ListBorrowedComponent;
  let fixture: ComponentFixture<ListBorrowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBorrowedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBorrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
