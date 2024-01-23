import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/modules/services/funcionario.service';
import { GestionService } from 'src/app/modules/services/gestion.service';
import { UbicacionService } from 'src/app/modules/services/ubicacion.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  ubicaciones: any;
  funcionarios: any;
  gestion: any;

  constructor(
    private baseService: GestionService,
    private ubicacionService: UbicacionService,
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit(): void {

    this.list();
    this.listFuncionarios();
    this.listUbicaciones();
  }

  list() {
    this.baseService.getById('1').subscribe((res: any) => {
      this.gestion = res.data;
    });
  }

  listFuncionarios(){
    this.funcionarioService.getAll().subscribe((res:any) => {
      this.funcionarios = res.data;
      console.log(this.funcionarios);
    })
  }

  listUbicaciones() {
    this.ubicacionService.getAll().subscribe((res: any) => {
      this.ubicaciones = res.data;
    });
  }

  onChangeUbicaionSelect(event: any){
    // this.listFuncionarios(this.gestion.meses[i].id);
    // this.datesOfMonth = this.getDatesOfMonth(this.year, this.gestion.meses[i].numero-1);
    // this.mesNombre = this.gestion.meses[i].nombre;
  }

}
