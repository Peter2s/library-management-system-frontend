import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestBooksComponent } from './best-books.component';

describe('BestBooksComponent', () => {
  let component: BestBooksComponent;
  let fixture: ComponentFixture<BestBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
