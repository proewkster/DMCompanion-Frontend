import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRaceComponent } from './template-race.component';

describe('TemplateRaceComponent', () => {
  let component: TemplateRaceComponent;
  let fixture: ComponentFixture<TemplateRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
