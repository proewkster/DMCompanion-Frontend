import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpellDamageComponent } from './edit-spell-damage.component';

describe('EditSpellDamageComponent', () => {
  let component: EditSpellDamageComponent;
  let fixture: ComponentFixture<EditSpellDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpellDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpellDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
