import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaEffectComponent } from './add-area-effect.component';

describe('AddAreaEffectComponent', () => {
  let component: AddAreaEffectComponent;
  let fixture: ComponentFixture<AddAreaEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAreaEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreaEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
