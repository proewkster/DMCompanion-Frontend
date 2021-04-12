import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCastSpellComponent } from './add-cast-spell.component';

describe('AddCastSpellComponent', () => {
  let component: AddCastSpellComponent;
  let fixture: ComponentFixture<AddCastSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCastSpellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCastSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
