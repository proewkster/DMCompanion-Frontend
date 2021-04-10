import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatComponent } from './edit-feat.component';

describe('EditFeatComponent', () => {
  let component: EditFeatComponent;
  let fixture: ComponentFixture<EditFeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
