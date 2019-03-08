import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tituloPagina: string = "Bienvenido";

	image: string = null;

  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  tomarFoto(){
    let opciones: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( opciones )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
