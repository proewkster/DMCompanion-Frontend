import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSourceComponent } from './delete-source.component';

describe('DeleteSourceComponent', () => {
  let component: DeleteSourceComponent;
  let fixture: ComponentFixture<DeleteSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
