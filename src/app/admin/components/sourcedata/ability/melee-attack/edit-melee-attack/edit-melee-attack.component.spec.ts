import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeleeAttackComponent } from './edit-melee-attack.component';

describe('EditMeleeAttackComponent', () => {
  let component: EditMeleeAttackComponent;
  let fixture: ComponentFixture<EditMeleeAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeleeAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeleeAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
