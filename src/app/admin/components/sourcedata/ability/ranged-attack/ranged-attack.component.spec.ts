import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedAttackComponent } from './ranged-attack.component';

describe('RangedAttackComponent', () => {
  let component: RangedAttackComponent;
  let fixture: ComponentFixture<RangedAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangedAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangedAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
