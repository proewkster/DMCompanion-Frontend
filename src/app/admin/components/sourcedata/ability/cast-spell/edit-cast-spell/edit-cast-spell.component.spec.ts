import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCastSpellComponent } from './edit-cast-spell.component';

describe('EditCastSpellComponent', () => {
  let component: EditCastSpellComponent;
  let fixture: ComponentFixture<EditCastSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCastSpellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCastSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
