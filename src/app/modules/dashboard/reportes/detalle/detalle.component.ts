import { Component, Input, OnInit } from '@angular/core';


import 'ol/ol.css';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Draw, Modify, Snap } from 'ol/interaction';
import { fromLonLat, get, toLonLat, transform } from 'ol/proj';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import TileJSON from 'ol/source/TileJSON';
import * as olProj from 'ol/proj';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiaService } from 'src/app/modules/services/dia.service';


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
      fill: new Fill({color: 'green'}),
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    }),
  });
  source!: VectorSource;
  modify!: Modify;
  iconFeature!: Feature;
  raster: any;
  vector: any;

  title: string = "";
  detalle: string = "";
  estado: string = "";
  @Input() id: string = "";
  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    public baseService: DiaService,
  ) {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([this.la,this.lo]),
        zoom: 14,
      }),
    });
  }

  ngOnInit(): void {

		const iconFeature = new Feature({
			geometry: new Point(fromLonLat([this.la, this.lo])),
			name: 'Null Island',
			population: 4000,
			rainfall: 500,
		});

		iconFeature.setStyle(this.iconStyle);

		this.raster = new TileLayer({
			source: new OSM(),
		});

		const source = new VectorSource({
			features: [iconFeature]
		});

		this.vector = new VectorLayer({
			source,
			style: {
				'fill-color': 'rgba(255, 255, 255, 0.2)',
				'stroke-color': '#ffcc33',
				'stroke-width': 3,
				'circle-radius': 7,
				'circle-fill-color': '#ffcc33',
			},
		});

    this.map.addLayer(
      this.vector
    );

		const extent = get('EPSG:3857')!.getExtent().slice();
		extent[0] += extent[0];
		extent[2] += extent[2];

    this.map.setTarget("map");

    const target = document.getElementById('map');

		const modify = new Modify({
			hitDetection: this.vector,
			source: source
		});

		modify.on(['modifystart', 'modifyend'], function (evt) {
			target!.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';

			let coord = iconFeature.getGeometry()!.getCoordinates();
			coord = transform(coord, 'EPSG:3857', 'EPSG:4326');
			let lon = coord[1];
			let lat = coord[0];
			// changeLatLong(lat, lon);

      (document.getElementById('longitud') as HTMLInputElement).value = lon.toString();
      (document.getElementById('latitud') as HTMLInputElement).value = lat.toString();
      console.log(lat, lon);
		});
		const overlaySource = modify.getOverlay().getSource();
		overlaySource.on(['addfeature', 'removefeature'], function (evt: any) {
			target!.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
		});
    (document.getElementById('longitud') as HTMLInputElement).value = this.lo.toString();
    (document.getElementById('latitud') as HTMLInputElement).value = this.la.toString();

		this.map.addInteraction(modify);

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
        if (data.data.horas.length !== 0){
          this.la = data.data.horas[0].latitud;
          this.lo = data.data.horas[0].longitud;
          console.log(this.la,this.lo);
          iconFeature.set('geometry', new Point(fromLonLat([this.la, this.lo])));
          this.map.getView().setCenter(fromLonLat([this.la, this.lo]));
        }
      });
    }
  }

  // setLonLat(valore:{ lat: any, lon: any }) {
  //   this.basicForm.patchValue({
  //     latitud: valore.lat,
  //     longitud: valore.lon,
  //   });
  //   console.log(this.basicForm.value);
	// };
}
