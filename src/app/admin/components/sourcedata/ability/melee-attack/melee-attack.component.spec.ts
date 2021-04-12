import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeleeAttackComponent } from './melee-attack.component';

describe('MeleeAttackComponent', () => {
  let component: MeleeAttackComponent;
  let fixture: ComponentFixture<MeleeAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeleeAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeleeAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
