import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProficiencyComponent } from './add-proficiency.component';

describe('AddProficiencyComponent', () => {
  let component: AddProficiencyComponent;
  let fixture: ComponentFixture<AddProficiencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProficiencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
