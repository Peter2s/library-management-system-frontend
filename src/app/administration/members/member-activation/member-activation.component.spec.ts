import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberActivationComponent } from './member-activation.component';

describe('MemberActivationComponent', () => {
  let component: MemberActivationComponent;
  let fixture: ComponentFixture<MemberActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberActivationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
