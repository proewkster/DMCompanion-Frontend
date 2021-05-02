import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateModifierComponent } from './template-modifier.component';

describe('TemplateModifierComponent', () => {
  let component: TemplateModifierComponent;
  let fixture: ComponentFixture<TemplateModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
