import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchingAbilityComponent } from './branching-ability.component';

describe('BranchingAbilityComponent', () => {
  let component: BranchingAbilityComponent;
  let fixture: ComponentFixture<BranchingAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchingAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchingAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
