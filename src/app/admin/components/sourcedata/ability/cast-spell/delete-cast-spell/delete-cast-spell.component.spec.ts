import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCastSpellComponent } from './delete-cast-spell.component';

describe('DeleteCastSpellComponent', () => {
  let component: DeleteCastSpellComponent;
  let fixture: ComponentFixture<DeleteCastSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCastSpellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCastSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
