import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListFuncionarioComponent } from './list-funcionario/list-funcionario.component';
import { CreateFuncionarioComponent } from './list-funcionario/create-funcionario/create-funcionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreateRolesComponent } from './list-roles/create-roles/create-roles.component';
import { ListHorariosComponent } from './list-horarios/list-horarios.component';
import { CreateHorariosComponent } from './list-horarios/create-horarios/create-horarios.component';
import { ListUbicacionesComponent } from './list-ubicaciones/list-ubicaciones.component';
import { CreateUbicacionesComponent } from './list-ubicaciones/create-ubicaciones/create-ubicaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ListFuncionarioComponent,
    CreateFuncionarioComponent,
    ListRolesComponent,
    CreateRolesComponent,
    ListHorariosComponent,
    CreateHorariosComponent,
    ListUbicacionesComponent,
    CreateUbicacionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardModule { }
