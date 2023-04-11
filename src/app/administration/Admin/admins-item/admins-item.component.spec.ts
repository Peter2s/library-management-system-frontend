import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsItemComponent } from './admins-item.component';

describe('AdminsItemComponent', () => {
  let component: AdminsItemComponent;
  let fixture: ComponentFixture<AdminsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
