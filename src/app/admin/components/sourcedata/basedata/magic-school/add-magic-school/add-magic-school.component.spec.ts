import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMagicSchoolComponent } from './add-magic-school.component';

describe('AddMagicSchoolComponent', () => {
  let component: AddMagicSchoolComponent;
  let fixture: ComponentFixture<AddMagicSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMagicSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMagicSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
