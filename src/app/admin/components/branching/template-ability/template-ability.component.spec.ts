import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAbilityComponent } from './template-ability.component';

describe('TemplateAbilityComponent', () => {
  let component: TemplateAbilityComponent;
  let fixture: ComponentFixture<TemplateAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
