import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDamageTypeComponent } from './edit-damage-type.component';

describe('EditDamageTypeComponent', () => {
  let component: EditDamageTypeComponent;
  let fixture: ComponentFixture<EditDamageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDamageTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDamageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
