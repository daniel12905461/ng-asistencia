import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from '../../services/funcionario.service';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { CreateFuncionarioComponent } from './create-funcionario/create-funcionario.component';

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.css']
})
export class ListFuncionarioComponent implements OnInit {
  objects: any[] = [];
  modalOptions: NgbModalOptions = {};
  showModal = false;

  constructor(
    private modalService: NgbModal,
    private baseService: FuncionarioService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.baseService.getAll().subscribe(res => {
      this.objects = res.data;
    });
  }

  create(){
    const modalRef = this.modalService.open(
      CreateFuncionarioComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Crear Nuevo';

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });
  }

  edit(id: any){
    const modalRef = this.modalService.open(
      CreateFuncionarioComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Editar';
    modalRef.componentInstance.id = id;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });

  }

  eliminar(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
          this.baseService.delete(id).subscribe(
            (data: any) => {
              // console.log(res);
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }
      });
  }

  enable(id: any) {
    this.baseService.enabled(id).subscribe(
      data => {
        this.list();
      },
      error => {
        // console.log('error ' + error);
        this.alertSwal.showSwallError(error.error);
        this.list();
      }
    );
  }
}
