import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSpellComponent } from './template-spell.component';

describe('TemplateSpellComponent', () => {
  let component: TemplateSpellComponent;
  let fixture: ComponentFixture<TemplateSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateSpellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
