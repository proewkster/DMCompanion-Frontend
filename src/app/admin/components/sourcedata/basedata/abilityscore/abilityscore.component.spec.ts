import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityscoreComponent } from './abilityscore.component';

describe('AbilityscoreComponent', () => {
  let component: AbilityscoreComponent;
  let fixture: ComponentFixture<AbilityscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
