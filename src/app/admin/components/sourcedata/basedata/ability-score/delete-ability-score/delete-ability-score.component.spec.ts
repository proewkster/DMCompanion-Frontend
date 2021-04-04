import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAbilityScoreComponent } from './delete-ability-score.component';

describe('DeleteAbilityScoreComponent', () => {
  let component: DeleteAbilityScoreComponent;
  let fixture: ComponentFixture<DeleteAbilityScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAbilityScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAbilityScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
