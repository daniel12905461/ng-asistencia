import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @Input() latitud!: number;
  @Input() longitud!: number;
  @Output() changeLatLong: EventEmitter<{ lat: any, lon: any }> = new EventEmitter<{ lat: any, lon: any }>();
  // la: number = this.latitud;
  // lo: number = this.longitud;
  la: number = -66.31726388;
  lo: number = -17.40999945;
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

  constructor(
  ) {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([this.la,this.lo]),
        zoom: 12,
      }),
    });
  }

  ngOnInit(): void {

    this.la = this.latitud;
    this.lo = this.longitud;
    console.log(this.la,this.lo);

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

		modify.on(['modifystart', 'modifyend'], (evt) => {
			target!.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';

			let coord = iconFeature.getGeometry()!.getCoordinates();
			coord = transform(coord, 'EPSG:3857', 'EPSG:4326');
			let lon = coord[1];
			let lat = coord[0];
			this.changeLatLong.emit({lat: lat, lon: lon});

      (document.getElementById('longitud') as HTMLInputElement).value = lon.toString();
      (document.getElementById('latitud') as HTMLInputElement).value = lat.toString();
		});
		const overlaySource = modify.getOverlay().getSource();
		overlaySource.on(['addfeature', 'removefeature'], function (evt: any) {
			target!.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
		});

		this.map.addInteraction(modify);

    // return this.map.setTarget(undefined);

    // iconFeature.set('geometry', new Point(fromLonLat([laAux, loAux])));
  }

}
