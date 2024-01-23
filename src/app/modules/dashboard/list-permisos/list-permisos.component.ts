import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-list-permisos',
  templateUrl: './list-permisos.component.html',
  styleUrls: ['./list-permisos.component.css'],
})
export class ListPermisosComponent implements OnInit {
  ubicaciones: any;
  funcionarios: any;
  gestion: any;
  listDias = [
    {"dia":"domingo", "d":"Su"},
    {"dia":"lunes", "d":"Mo"},
    {"dia":"martes", "d":"Tu"},
    {"dia":"miercoles", "d":"We"},
    {"dia":"jueves", "d":"Th"},
    {"dia":"viernes", "d":"Fr"},
    {"dia":"sabado", "d":"Sa"},
  ];

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
