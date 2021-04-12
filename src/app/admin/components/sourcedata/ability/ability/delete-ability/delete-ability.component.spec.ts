import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAbilityComponent } from './delete-ability.component';

describe('DeleteAbilityComponent', () => {
  let component: DeleteAbilityComponent;
  let fixture: ComponentFixture<DeleteAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
