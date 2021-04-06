import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMagicSchoolComponent } from './edit-magic-school.component';

describe('EditMagicSchoolComponent', () => {
  let component: EditMagicSchoolComponent;
  let fixture: ComponentFixture<EditMagicSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMagicSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMagicSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
