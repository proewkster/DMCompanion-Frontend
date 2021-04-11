import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbilityScoreComponent } from './add-ability-score.component';

describe('AddAbilityScoreComponent', () => {
  let component: AddAbilityScoreComponent;
  let fixture: ComponentFixture<AddAbilityScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbilityScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbilityScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
