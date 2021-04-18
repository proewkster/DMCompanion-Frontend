import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModifierComponent } from './delete-modifier.component';

describe('DeleteModifierComponent', () => {
  let component: DeleteModifierComponent;
  let fixture: ComponentFixture<DeleteModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
