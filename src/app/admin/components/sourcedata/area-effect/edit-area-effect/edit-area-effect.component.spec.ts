import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAreaEffectComponent } from './edit-area-effect.component';

describe('EditAreaEffectComponent', () => {
  let component: EditAreaEffectComponent;
  let fixture: ComponentFixture<EditAreaEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAreaEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAreaEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
