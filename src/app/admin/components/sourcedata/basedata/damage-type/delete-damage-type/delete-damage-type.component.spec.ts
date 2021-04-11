import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDamageTypeComponent } from './delete-damage-type.component';

describe('DeleteDamageTypeComponent', () => {
  let component: DeleteDamageTypeComponent;
  let fixture: ComponentFixture<DeleteDamageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDamageTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDamageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
