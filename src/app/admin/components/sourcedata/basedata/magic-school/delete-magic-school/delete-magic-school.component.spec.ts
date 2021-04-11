import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMagicSchoolComponent } from './delete-magic-school.component';

describe('DeleteMagicSchoolComponent', () => {
  let component: DeleteMagicSchoolComponent;
  let fixture: ComponentFixture<DeleteMagicSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMagicSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMagicSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
