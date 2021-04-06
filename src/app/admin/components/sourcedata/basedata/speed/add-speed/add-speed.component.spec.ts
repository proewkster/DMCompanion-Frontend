import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpeedComponent } from './add-speed.component';

describe('AddSpeedComponent', () => {
  let component: AddSpeedComponent;
  let fixture: ComponentFixture<AddSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
