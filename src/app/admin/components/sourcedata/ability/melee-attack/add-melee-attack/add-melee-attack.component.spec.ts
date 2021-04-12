import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeleeAttackComponent } from './add-melee-attack.component';

describe('AddMeleeAttackComponent', () => {
  let component: AddMeleeAttackComponent;
  let fixture: ComponentFixture<AddMeleeAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeleeAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeleeAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
