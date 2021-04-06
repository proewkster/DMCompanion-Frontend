import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSenseComponent } from './edit-sense.component';

describe('EditSenseComponent', () => {
  let component: EditSenseComponent;
  let fixture: ComponentFixture<EditSenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
