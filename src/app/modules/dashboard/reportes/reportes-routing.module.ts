import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component: ReportesComponent,
  // },
  {
    path:'por-mes',
    component: ReportesComponent,
  },
  {
    path:'funcionarios',
    component: FuncionariosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
