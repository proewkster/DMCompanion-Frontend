import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttackDamageComponent } from './edit-attack-damage.component';

describe('EditAttackDamageComponent', () => {
  let component: EditAttackDamageComponent;
  let fixture: ComponentFixture<EditAttackDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttackDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAttackDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
