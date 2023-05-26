import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { FuncionarioService } from '../../services/funcionario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
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

  constructor(
    private baseService: GestionService,
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit(): void {
    const year = 2023;
    const month = 5;
    this.datesOfMonth = this.getDatesOfMonth(year, month);

    this.list();
    this.listFuncionarios();
  }

  list() {
    this.baseService.getById('1').subscribe((res: any) => {
      this.gestion = res.data;
    });
  }

  listFuncionarios(){
    this.funcionarioService.getDiasTrabajados('1').subscribe((res:any) => {
      this.funcionarios = res.data;
      this.objects = JSON.parse(JSON.stringify(this.funcionarios));

      debugger;
      for (let i = 0; i < this.funcionarios.length; i++) {
        for (let j = 0; j < this.datesOfMonth.length; j++) {
          this.objects[i]["dias"][j] = this.verificarExitsFecha(this.datesOfMonth[j].date.format('YYYY-MM-DD'), this.datesOfMonth[j].date.locale('en').format('dd'), this.funcionarios[i]["dias"], this.funcionarios[i]["rol"]["horario"])
        }
      }

      console.log(this.objects);
      console.log(this.funcionarios);
    })
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
}
