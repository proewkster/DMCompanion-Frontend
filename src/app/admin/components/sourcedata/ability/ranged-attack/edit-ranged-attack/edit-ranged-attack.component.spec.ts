import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRangedAttackComponent } from './edit-ranged-attack.component';

describe('EditRangedAttackComponent', () => {
  let component: EditRangedAttackComponent;
  let fixture: ComponentFixture<EditRangedAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRangedAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRangedAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
