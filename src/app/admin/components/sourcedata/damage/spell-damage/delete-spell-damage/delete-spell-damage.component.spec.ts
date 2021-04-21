import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpellDamageComponent } from './delete-spell-damage.component';

describe('DeleteSpellDamageComponent', () => {
  let component: DeleteSpellDamageComponent;
  let fixture: ComponentFixture<DeleteSpellDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpellDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpellDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
