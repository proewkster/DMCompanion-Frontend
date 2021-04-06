import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSenseComponent } from './add-sense.component';

describe('AddSenseComponent', () => {
  let component: AddSenseComponent;
  let fixture: ComponentFixture<AddSenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
