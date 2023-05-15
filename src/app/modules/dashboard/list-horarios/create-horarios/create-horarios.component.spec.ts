import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHorariosComponent } from './create-horarios.component';

describe('CreateHorariosComponent', () => {
  let component: CreateHorariosComponent;
  let fixture: ComponentFixture<CreateHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
