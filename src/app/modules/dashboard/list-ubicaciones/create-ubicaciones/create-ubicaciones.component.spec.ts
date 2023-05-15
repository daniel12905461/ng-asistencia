import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUbicacionesComponent } from './create-ubicaciones.component';

describe('CreateUbicacionesComponent', () => {
  let component: CreateUbicacionesComponent;
  let fixture: ComponentFixture<CreateUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUbicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
