import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUbicacionesComponent } from './list-ubicaciones.component';

describe('ListUbicacionesComponent', () => {
  let component: ListUbicacionesComponent;
  let fixture: ComponentFixture<ListUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUbicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
