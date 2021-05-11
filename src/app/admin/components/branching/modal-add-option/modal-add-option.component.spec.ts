import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOptionComponent } from './modal-add-option.component';

describe('ModalAddOptionComponent', () => {
  let component: ModalAddOptionComponent;
  let fixture: ComponentFixture<ModalAddOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
