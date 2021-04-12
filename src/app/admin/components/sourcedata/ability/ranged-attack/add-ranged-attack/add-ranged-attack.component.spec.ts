import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRangedAttackComponent } from './add-ranged-attack.component';

describe('AddRangedAttackComponent', () => {
  let component: AddRangedAttackComponent;
  let fixture: ComponentFixture<AddRangedAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRangedAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRangedAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
