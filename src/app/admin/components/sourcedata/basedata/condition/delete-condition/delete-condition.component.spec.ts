import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConditionComponent } from './delete-condition.component';

describe('DeleteConditionComponent', () => {
  let component: DeleteConditionComponent;
  let fixture: ComponentFixture<DeleteConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
