import {Injectable, NgZone} from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Socket } from 'ng-socket-io';
import { NativeStorage } from '@ionic-native/native-storage';

interface location {
	lat: number;
	lng: number;
}


@Injectable()
export class TrackerProvider {

	public watch: any;
	public lat: number = 0;
	public lng: number = 0;
	public locations: location[] = [];
	public locations2: location[] = [];
	public locationsAll: location[] = [];

	constructor(public zone: NgZone,
		public backgroundGeolocation: BackgroundGeolocation,
		public geolocation: Geolocation,
		private socket: Socket,
		private nativeStorage: NativeStorage
		) {

	}

	public startTracking() {

		this.unirseAlChat();

		const config: BackgroundGeolocationConfig = {
			desiredAccuracy: 10,
			stationaryRadius: 20,
			distanceFilter: 30,
			debug: true, //  enable this hear sounds for background-geolocation life-cycle.
			stopOnTerminate: false, // enable this to clear background location settings when the app terminates
		};

		this.backgroundGeolocation.configure(config)
		.subscribe((location: BackgroundGeolocationResponse) => {

			console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);


			// Update inside of Angular's zone
			this.zone.run(() => {
				this.lat = location.latitude;
				this.lng = location.longitude;
				console.log("ZONE 1");
				let newLocation: location = {
					lat: location.latitude,
					lng: location.longitude
				};
				this.locations.push(newLocation);
				this.locationsAll.push(newLocation);
				this.sendMessage('latitud1: ' + newLocation.lat + ', longitud1: ' + newLocation.lng)
			});
		}, (err) => {
			console.log(err);
		});

		this.backgroundGeolocation.start();

		// Background tracking
		let options = {
			frequency: 6000,
			enableHighAccuracy: true
		};

		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
			console.log(position);

			let newLocation: location = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			this.locations2.push(newLocation);
			this.locationsAll.push(newLocation);
			this.sendMessage('latitud2: ' + newLocation.lat + ', longitud2: ' + newLocation.lng)

			this.zone.run(() => {
				console.warn("ZONE 2");
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
			});
		});
	}

	public stopTracking() {
		this.salirDelChat();
		console.log('stopTracking');
		console.warn("STOP TRACKING");
		console.warn(this.locations.length);
		console.warn(this.locations);
		console.warn("STOP TRACKING2");
		console.warn(this.locations2.length);
		console.warn(this.locations2);
		this.backgroundGeolocation.finish();
		this.watch.unsubscribe();

	}

	unirseAlChat() {

		this.nativeStorage.getItem('nickname')
		.then(
			data => {
				console.log('nickname: ' + data.valor);
				this.socket.connect();
				this.socket.emit('set-nickname', data.valor);
			},
			error => {
				console.error('Error al recuperar item: ', error)
				this.socket.connect();
				this.socket.emit('set-nickname', 'geo loca seg');
			} 
		);
	}

	sendMessage(mensaje: string) {
		this.socket.emit('add-message', { text: mensaje });
	}

	salirDelChat() {
		this.socket.disconnect();
	}

}