import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetModifierTypeComponent } from './get-modifier-type.component';

describe('GetModifierTypeComponent', () => {
  let component: GetModifierTypeComponent;
  let fixture: ComponentFixture<GetModifierTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetModifierTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetModifierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
