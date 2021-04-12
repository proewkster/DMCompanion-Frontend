import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbilityComponent } from './add-ability.component';

describe('AddAbilityComponent', () => {
  let component: AddAbilityComponent;
  let fixture: ComponentFixture<AddAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
