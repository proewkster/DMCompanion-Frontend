import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbilityScoreComponent } from './edit-ability-score.component';

describe('EditAbilityScoreComponent', () => {
  let component: EditAbilityScoreComponent;
  let fixture: ComponentFixture<EditAbilityScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbilityScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbilityScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
