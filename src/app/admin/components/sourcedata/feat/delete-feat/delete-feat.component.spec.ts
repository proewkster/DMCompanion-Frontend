import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeatComponent } from './delete-feat.component';

describe('DeleteFeatComponent', () => {
  let component: DeleteFeatComponent;
  let fixture: ComponentFixture<DeleteFeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
