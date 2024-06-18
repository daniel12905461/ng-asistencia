import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { PermisoService } from '../../services/permiso.service';
import { AlertSwallService } from 'src/app/core/alert-swall.service';

@Component({
  selector: 'app-list-permisos',
  templateUrl: './list-permisos.component.html',
  styleUrls: ['./list-permisos.component.css'],
})
export class ListPermisosComponent implements OnInit {
  ubicaciones: any;
  funcionarios: any;
  gestion: any;
  permisos: any;

  constructor(
    private baseService: PermisoService,
    private gestionService: GestionService,
    private ubicacionService: UbicacionService,
    private funcionarioService: FuncionarioService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.list();
    this.listGestion();
    this.listFuncionarios();
    this.listUbicaciones();
  }

  list() {
    this.baseService.getAll().subscribe((res: any) => {
      this.permisos = res.data;
    });
  }

  listGestion(){
    this.gestionService.getById('1').subscribe((res: any) => {
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

  aceptarPermiso(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then((res: any) => {
        console.log(res.value);
        if (res.value === true) {
          this.baseService.enabled(id).subscribe(
            (data: any) => {
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }else{
          this.list();
        }
      });

  }

}
