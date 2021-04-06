import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProficiencyComponent } from './delete-proficiency.component';

describe('DeleteProficiencyComponent', () => {
  let component: DeleteProficiencyComponent;
  let fixture: ComponentFixture<DeleteProficiencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProficiencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
