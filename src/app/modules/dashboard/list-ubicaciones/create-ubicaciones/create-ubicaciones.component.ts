import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { UbicacionService } from 'src/app/modules/services/ubicacion.service';

@Component({
  selector: 'app-create-ubicaciones',
  templateUrl: './create-ubicaciones.component.html',
  styleUrls: ['./create-ubicaciones.component.css']
})
export class CreateUbicacionesComponent implements OnInit {
  basicForm!: FormGroup;
  @Input() title!: string;
  @Input() id!: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: UbicacionService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.id !== undefined) {
      this.baseService.getById(this.id).subscribe( data => {
        this.basicForm.setValue({
          nombres: data.data.nombres,
          apellidos: data.data.apellidos,
          ci: data.data.ci,
        });
      });
    }
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      logitud: ['', [Validators.required]],
    });
  }

  register(basicForm: any) {
    this.isLoading = true;
    if (this.id === undefined) {
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
    } else {
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
    }
  }
   hola(){
    console.log("dsadads")
   }
}
