import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBorrowedComponent } from './current-borrowed.component';

describe('CurrentBorrowedComponent', () => {
  let component: CurrentBorrowedComponent;
  let fixture: ComponentFixture<CurrentBorrowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBorrowedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBorrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
