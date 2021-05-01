import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFeatComponent } from './template-feat.component';

describe('TemplateFeatComponent', () => {
  let component: TemplateFeatComponent;
  let fixture: ComponentFixture<TemplateFeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
