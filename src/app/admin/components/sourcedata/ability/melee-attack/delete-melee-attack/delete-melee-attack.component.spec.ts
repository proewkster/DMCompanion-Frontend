import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMeleeAttackComponent } from './delete-melee-attack.component';

describe('DeleteMeleeAttackComponent', () => {
  let component: DeleteMeleeAttackComponent;
  let fixture: ComponentFixture<DeleteMeleeAttackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMeleeAttackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMeleeAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
