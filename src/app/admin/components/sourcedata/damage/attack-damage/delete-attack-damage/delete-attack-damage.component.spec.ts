import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttackDamageComponent } from './delete-attack-damage.component';

describe('DeleteAttackDamageComponent', () => {
  let component: DeleteAttackDamageComponent;
  let fixture: ComponentFixture<DeleteAttackDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAttackDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAttackDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
