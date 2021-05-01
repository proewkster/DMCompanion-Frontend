import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchingFeatComponent } from './branching-feat.component';

describe('BranchingFeatComponent', () => {
  let component: BranchingFeatComponent;
  let fixture: ComponentFixture<BranchingFeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchingFeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchingFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
