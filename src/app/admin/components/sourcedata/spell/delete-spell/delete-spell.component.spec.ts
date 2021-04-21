import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpellComponent } from './delete-spell.component';

describe('DeleteSpellComponent', () => {
  let component: DeleteSpellComponent;
  let fixture: ComponentFixture<DeleteSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
