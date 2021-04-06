import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpeedComponent } from './delete-speed.component';

describe('DeleteSpeedComponent', () => {
  let component: DeleteSpeedComponent;
  let fixture: ComponentFixture<DeleteSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
