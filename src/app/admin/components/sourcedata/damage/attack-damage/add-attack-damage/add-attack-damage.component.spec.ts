import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttackDamageComponent } from './add-attack-damage.component';

describe('AddAttackDamageComponent', () => {
  let component: AddAttackDamageComponent;
  let fixture: ComponentFixture<AddAttackDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttackDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttackDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
