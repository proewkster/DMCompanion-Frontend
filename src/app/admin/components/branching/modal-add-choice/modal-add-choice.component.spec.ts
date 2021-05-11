import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddChoiceComponent } from './modal-add-choice.component';

describe('ModalAddChoiceComponent', () => {
  let component: ModalAddChoiceComponent;
  let fixture: ComponentFixture<ModalAddChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
