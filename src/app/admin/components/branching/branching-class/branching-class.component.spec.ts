import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchingClassComponent } from './branching-class.component';

describe('BranchingClassComponent', () => {
  let component: BranchingClassComponent;
  let fixture: ComponentFixture<BranchingClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchingClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
