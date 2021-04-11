import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamageTypeComponent } from './add-damage-type.component';

describe('AddDamageTypeComponent', () => {
  let component: AddDamageTypeComponent;
  let fixture: ComponentFixture<AddDamageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDamageTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDamageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
