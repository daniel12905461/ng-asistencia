import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { FuncionarioService } from 'src/app/modules/services/funcionario.service';
import { RolesService } from 'src/app/modules/services/roles.service';
import { UbicacionService } from 'src/app/modules/services/ubicacion.service';

@Component({
  selector: 'app-create-funcionario',
  templateUrl: './create-funcionario.component.html',
  styleUrls: ['./create-funcionario.component.css']
})
export class CreateFuncionarioComponent implements OnInit {
  basicForm!: FormGroup;
  @Input() title: string = "";
  @Input() id: string = "";
  isLoading = false;
  roles: any[] = [];
  ubicaciones: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: FuncionarioService,
    public rolesService: RolesService,
    public ubicacionService: UbicacionService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listHorarios();
    this.listUbicaciones();

    if (this.id !== "") {
      this.baseService.getById(this.id).subscribe( data => {
        this.basicForm.setValue({
          nombres: data.data.nombres,
          apellidos: data.data.apellidos,
          ci: data.data.ci,
          celular: data.data.celular,
          foto: data.data.foto,
          fecha_nac: data.data.fecha_nac,
          user: data.data.user,
          password: data.data.password,
          id_rols: data.data.id_rols,
          id_ubicaciones: data.data.id_ubicaciones,
        });
      });
    }

    // this.basicForm.get('celular')!.valueChanges.subscribe((val: any) => {
    //   debugger;
    //   if (val && val.length > 8) {
    //     console.log('El número de celular no puede tener más de 8 dígitos.');
    //     // Aquí puedes manejar la lógica para mostrar un mensaje de error o deshacer el cambio, por ejemplo:
    //     this.basicForm.get('celular')!.setValue(val.slice(0, 8)); // Limitar el valor a 8 dígitos
    //   } else {
    //     console.log(val);
    //   }
    // });
  }

  listHorarios(){
    this.rolesService.getAll().subscribe(data => {
      this.roles = data.data;
    })
    console.log(this.roles);
  }

  listUbicaciones(){
    this.ubicacionService.getAll().subscribe(data => {
      this.ubicaciones = data.data;
    })
    console.log(this.ubicaciones);
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      celular: ['', [Validators.required, Validators.maxLength(8)]],
      foto: [' '],
      fecha_nac: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: [''],
      id_rols: ['', [Validators.required]],
      id_ubicaciones: ['', [Validators.required]],
    });
  }

  register(basicForm: any) {
    this.isLoading = true;
    if (this.id !== "") {
      this.baseService
        .update(this.id, basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error);
          }
        );
    } else {
      this.baseService
        .create(basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    }
  }
}
