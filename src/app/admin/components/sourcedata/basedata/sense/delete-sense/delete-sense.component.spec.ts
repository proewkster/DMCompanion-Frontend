import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSenseComponent } from './delete-sense.component';

describe('DeleteSenseComponent', () => {
  let component: DeleteSenseComponent;
  let fixture: ComponentFixture<DeleteSenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
