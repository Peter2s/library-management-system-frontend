import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSuperAdminComponent } from './get-super-admin.component';

describe('GetSuperAdminComponent', () => {
  let component: GetSuperAdminComponent;
  let fixture: ComponentFixture<GetSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSuperAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
