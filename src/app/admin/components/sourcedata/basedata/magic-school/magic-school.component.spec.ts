import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicSchoolComponent } from './magic-school.component';

describe('MagicSchoolComponent', () => {
  let component: MagicSchoolComponent;
  let fixture: ComponentFixture<MagicSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
