import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeedComponent } from './edit-speed.component';

describe('EditSpeedComponent', () => {
  let component: EditSpeedComponent;
  let fixture: ComponentFixture<EditSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
