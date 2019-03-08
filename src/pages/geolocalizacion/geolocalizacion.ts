import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { TrackerProvider } from '../../providers/tracker/tracker';

/**
 * Generated class for the GeolocalizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-geolocalizacion',
 	templateUrl: 'geolocalizacion.html',
 })
 export class GeolocalizacionPage {

 	tituloPagina: string = "Geo Localización";

 	posicionActual: any;
 	posicion: any;

 	observarPosicion: any;
 	bagColor: string;

 	direcion: string;

 	constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public locationTracker: TrackerProvider
 		) {
 		this.posicionActual = {latitude: 0, longitude: 0}
 		this.posicion = {latitude: 0, longitude: 0}
 		this.obtenerPosicionActual();
 		this.posicionTiempoReal();
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad GeolocalizacionPage');
 	}

 	obtenerPosicionActual() {
 		this.geolocation.getCurrentPosition().then((resp) => {
 			this.posicionActual = resp.coords;
 		}).catch((error) => {
 			console.log('Error obteniendo locacion', error);
 		});
 	}

 	posicionTiempoReal() {
 		this.observarPosicion = this.geolocation.watchPosition()
 		//.filter((p) => p.coords !== undefined) //Filter Out Errors
 		.subscribe((data) => {
 			// data can be a set of coordinates, or an error (if an error occurred).
 			// data.coords.latitude
 			// data.coords.longitude
 			this.posicion = data.coords;
 		});
 		this.bagColor = 'secondary';
 	}

 	pararSeguimiento() {
 		this.observarPosicion.unsubscribe();
 		this.bagColor = 'danger';
 	}

 	obtenerDireccion() {

 		this.nativeGeocoder.reverseGeocode(this.posicionActual.latitude, this.posicionActual.longitude)
 		.then((data : any) => {
 			this.direcion = data[0];
 			console.log(this.direcion)
 		})
 		.catch((error: any) => console.error(error));
 	}

 	iniciarBackgroundGeolocation(){
 		this.locationTracker.startTracking();
 	}

 	pararBackgroundGeolocation(){
 		this.locationTracker.stopTracking();
 	}

 }
