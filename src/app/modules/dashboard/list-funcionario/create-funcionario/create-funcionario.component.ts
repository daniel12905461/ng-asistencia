import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { FuncionarioService } from 'src/app/modules/services/funcionario.service';

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

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: FuncionarioService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.createForm();

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
        });
      });
    }
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      celular: [''],
      foto: [' '],
      fecha_nac: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: [''],
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
