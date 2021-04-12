import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRangedAttackComponent } from './delete-ranged-attack.component';

describe('DeleteRangedAttackComponent', () => {
  let component: DeleteRangedAttackComponent;
  let fixture: ComponentFixture<DeleteRangedAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRangedAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRangedAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
