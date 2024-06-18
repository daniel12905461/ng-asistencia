import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { FuncionarioService } from '../../services/funcionario.service';
import * as moment from 'moment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComponent } from './detalle/detalle.component';
import { UbicacionService } from '../../services/ubicacion.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  ubicaciones: any;
  gestion: any;
  funcionarios: any;
  datesOfMonth: { date: moment.Moment, dayName: string }[] = [];
  objects: any;
  listDias = [
    {"dia":"domingo", "d":"Su"},
    {"dia":"lunes", "d":"Mo"},
    {"dia":"martes", "d":"Tu"},
    {"dia":"miercoles", "d":"We"},
    {"dia":"jueves", "d":"Th"},
    {"dia":"viernes", "d":"Fr"},
    {"dia":"sabado", "d":"Sa"},
  ];
  year = 2024;
  mesNombre = 'Enero';
  modalOptions: NgbModalOptions = {};
  showModal = false;

  constructor(
    private modalService: NgbModal,
    private baseService: GestionService,
    private ubicacionService: UbicacionService,
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit(): void {
    const month = 1;
    this.datesOfMonth = this.getDatesOfMonth(this.year, month-1);

    this.list();
    this.listFuncionarios('1');
    this.listUbicaciones();
  }

  list() {
    this.baseService.getById('1').subscribe((res: any) => {
      this.gestion = res.data;
    });
  }

  listFuncionarios(idMes: string){
    this.funcionarioService.getDiasTrabajados(idMes).subscribe((res:any) => {
      this.funcionarios = res.data;
      this.objects = JSON.parse(JSON.stringify(this.funcionarios));

      // debugger;
      for (let i = 0; i < this.funcionarios.length; i++) {
        for (let j = 0; j < this.datesOfMonth.length; j++) {
          this.objects[i]["dias"][j] = this.verificarExitsFecha(this.datesOfMonth[j].date.format('YYYY-MM-DD'), this.datesOfMonth[j].date.locale('en').format('dd'), this.funcionarios[i]["dias"], this.funcionarios[i]["rol"]["horario"])
        }
      }

      console.log(this.objects);
      console.log(this.funcionarios);
    })
  }

  listUbicaciones() {
    this.ubicacionService.getAll().subscribe((res: any) => {
      this.ubicaciones = res.data;
    });
  }

  getDatesOfMonth(year: number, month: number): { date: moment.Moment, dayName: string }[] {
    moment.locale('es'); // Establecer el idioma en español
    const startDate = moment({ year, month, day: 1 });
    const endDate = moment(startDate).endOf('month');
    const dates: { date: moment.Moment, dayName: string }[] = [];

    while (startDate.isSameOrBefore(endDate)) {
      const dateObj = {
        date: moment(startDate),
        // dayName: startDate.format('dd')
        dayName: startDate.format('ddd')
        // dayName: startDate.format('dddd')
      };
      dates.push(dateObj);
      startDate.add(1, 'day');
    }

    return dates;
  }

  verificarExitsFecha(fecha: string, fechaName: string, diasTrabajadosArray: any, diasArray: any){
    for (let index = 0; index < diasTrabajadosArray.length; index++) {
      if (fecha === diasTrabajadosArray[index].fecha) {
        return diasTrabajadosArray[index];
      }
    }
    for (let j = 0; j < this.listDias.length; j++) {
      if(this.listDias[j].d === fechaName){
        if (diasArray[this.listDias[j].dia] === 0) {
          return {nombre: "", numero: 0, estado: "Null", detalle: "", fecha: fecha, id: 1}
        }
      }
    }
    return {nombre: "", numero: 0, estado: "Falta", detalle: "", fecha: fecha, id: 1}
  }

  onChangeMesSelect(event: any){
    console.log(event.target.value);
    // debugger;
    for (let i = 0; i < this.gestion.meses.length; i++) {
      if (this.gestion.meses[i].id+"" === event.target.value) {
          this.listFuncionarios(this.gestion.meses[i].id);
          this.datesOfMonth = this.getDatesOfMonth(this.year, this.gestion.meses[i].numero-1);
          this.mesNombre = this.gestion.meses[i].nombre;
      }
    }
  }

  onChangeUbicaionSelect(event: any){
    // this.listFuncionarios(this.gestion.meses[i].id);
    // this.datesOfMonth = this.getDatesOfMonth(this.year, this.gestion.meses[i].numero-1);
    // this.mesNombre = this.gestion.meses[i].nombre;
  }

  detalle(id: any, idRol: any){
    const modalRef = this.modalService.open(
      DetalleComponent,
      this.modalOptions
    );
    // modalRef.componentInstance.title = 'Editar';
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.idRol = idRol;

    modalRef.result.then(result => {
      // if (result) {
      //   this.list();
      // }
    });

  }

  // SumatoriaHorasRetraso(funcionarioHoras: any){
  //   // debugger;
  //   const sumaHoras = moment();
  //   for (let i = 0; i < funcionarioHoras.dias.length; i++) {
  //     const duracion = moment.duration(funcionarioHoras.dias[i].hora_retrasos);
  //     sumaHoras.add(duracion);
  //   }

  //   return sumaHoras.format("h:mm:ss");
  // }

  SumatoriaHorasRetraso(funcionarioHoras: any) {
    let sumaDuracion = moment.duration(); // Inicializar la suma de duraciones a cero

    for (let i = 0; i < funcionarioHoras.dias.length; i++) {
      const duracion = moment.duration(funcionarioHoras.dias[i].hora_retrasos);
      sumaDuracion.add(duracion);
    }

    return this.formatDuration(sumaDuracion); // Utilizar una función auxiliar para formatear la duración en horas:minutos:segundos
  }

  formatDuration(duration: any) {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${hours}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(number: any) {
    return number.toString().padStart(2, "0");
  }

}
