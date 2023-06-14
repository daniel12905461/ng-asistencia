import { Component, Input, OnInit } from '@angular/core';


import 'ol/ol.css';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { OSM, Vector as VectorSource } from 'ol/source';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Draw, Modify, Snap } from 'ol/interaction';
import { fromLonLat, get, toLonLat, transform } from 'ol/proj';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import TileJSON from 'ol/source/TileJSON';
import * as olProj from 'ol/proj';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiaService } from 'src/app/modules/services/dia.service';
import { RolesService } from 'src/app/modules/services/roles.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  la: number = -66.31377067821559;
  lo: number = -17.39633043368893;
  map!: Map;
  iconStyle: Style = new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: 'green' }),
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    }),
  });
  source!: VectorSource;
  // modify!: Modify;
  // iconFeature!: Feature;
  // raster: any;
  // vector: VectorLayer;
  vector: VectorLayer<VectorSource> | undefined;

  title: string = "";
  detalle: string = "";
  estado: string = "";
  @Input() id: string = "";
  @Input() idRol: string = "";
  isLoading = false;
  rol: any;
  dia: any;

  constructor(
    public activeModal: NgbActiveModal,
    public baseService: DiaService,
    public rolesService: RolesService,
  ) {
  }

  ngOnInit(): void {

		this.source = new VectorSource();

    this.vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
        stroke: new Stroke({ color: '#ffcc33', width: 3 }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: '#ffcc33' }),
        }),
      }),
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vector
      ],
      view: new View({
        center: fromLonLat([this.la, this.lo]),
        zoom: 14,
      }),
      target: 'map'
    });

    if (this.id !== "") {
      this.baseService.getById(this.id).subscribe( data => {
        // this.basicForm.setValue({
        //   nombre: data.data.nombre,
        //   latitud: data.data.latitud,
        //   longitud: data.data.longitud,
        // });
        this.title = data.data.nombre;
        this.detalle = data.data.fecha;
        this.estado = data.data.estado;
        this.dia = data.data;
        for (let index = 0; index < data.data.horas.length; index++) {
          // this.la = data.data.horas[i].latitud;
          // this.lo = data.data.horas[i].longitud;
          // console.log(this.la,this.lo);
          // iconFeature.set('geometry', new Point(fromLonLat([this.la, this.lo])));
          // this.map.getView().setCenter(fromLonLat([this.la, this.lo]));
          const hora = data.data.horas[index];
          const iconFeature = new Feature({
            geometry: new Point(fromLonLat([hora.longitud, hora.latitud])),
            name: 'Punto ' + index,
          });

          iconFeature.setStyle(this.iconStyle);

          this.source.addFeature(iconFeature);
        }
      });
    }
    this.listRol()
  }

  // setLonLat(valore:{ lat: any, lon: any }) {
  //   this.basicForm.patchValue({
  //     latitud: valore.lat,
  //     longitud: valore.lon,
  //   });
  //   console.log(this.basicForm.value);
	// };

  listRol(){
    this.rolesService.getById(this.idRol).subscribe((res: any) => {
      this.rol = res.data;
      console.log(this.rol);
    })
  }
}
