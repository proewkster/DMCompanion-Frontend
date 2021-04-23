import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAreaEffectComponent } from './delete-area-effect.component';

describe('DeleteAreaEffectComponent', () => {
  let component: DeleteAreaEffectComponent;
  let fixture: ComponentFixture<DeleteAreaEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAreaEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAreaEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
