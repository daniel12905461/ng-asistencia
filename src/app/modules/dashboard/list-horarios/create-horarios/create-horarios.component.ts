import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { HorarioService } from 'src/app/modules/services/horario.service';

@Component({
  selector: 'app-create-horarios',
  templateUrl: './create-horarios.component.html',
  styleUrls: ['./create-horarios.component.css']
})
export class CreateHorariosComponent implements OnInit {
  basicForm!: FormGroup;
  @Input() title: string = "";
  @Input() id: string = "";
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: HorarioService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.id !== "") {
      this.baseService.getById(this.id).subscribe( data => {
        this.basicForm.setValue({
          hora_inicio: moment(data.data.hora_inicio, 'HH:mm:ss').format('HH:mm:ss'),
          hora_inicio_reseso:  moment(data.data.hora_inicio_reseso, 'HH:mm:ss').format('HH:mm:ss'),
          hora_fin_reseso:  moment(data.data.hora_fin_reseso, 'HH:mm:ss').format('HH:mm:ss'),
          hora_fin:  moment(data.data.hora_fin, 'HH:mm:ss').format('HH:mm:ss'),
          domingo: data.data.domingo,
          lunes: data.data.lunes,
          martes: data.data.martes,
          miercoles: data.data.miercoles,
          jueves: data.data.jueves,
          viernes: data.data.viernes,
          sabado: data.data.sabado,
          id: ''
        });
      });
    }
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      hora_inicio: ['', [Validators.required]],
      hora_inicio_reseso: [''],
      hora_fin_reseso: [''],
      hora_fin: ['', [Validators.required]],
      domingo: [false],
      lunes: [false],
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false],
      id: ''
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
   hola(){
    console.log("dsadads")
   }
}
