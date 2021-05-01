import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchingRaceComponent } from './branching-race.component';

describe('BranchingRaceComponent', () => {
  let component: BranchingRaceComponent;
  let fixture: ComponentFixture<BranchingRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchingRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchingRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
