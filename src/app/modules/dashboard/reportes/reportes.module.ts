import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportesComponent,
    DetalleComponent,
    FuncionariosComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule  
  ]
})
export class ReportesModule { }
