import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpellDamageComponent } from './add-spell-damage.component';

describe('AddSpellDamageComponent', () => {
  let component: AddSpellDamageComponent;
  let fixture: ComponentFixture<AddSpellDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpellDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpellDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
