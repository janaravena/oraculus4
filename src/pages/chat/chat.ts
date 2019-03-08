import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Socket } from 'ng-socket-io';

import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	tituloPagina: string = "Chatbox";

	nickname = '';

  recordar = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private nativeStorage: NativeStorage) {
    this.recuperarNickname();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  unirseAlChat() {

    if (this.recordar) {
      this.guardarNickname();
    }
    
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ChatroomPage', { nickname: this.nickname });
    
  }

  guardarNickname() {
    this.nativeStorage.setItem('nickname', {valor: this.nickname, desde: 'chat'})
      .then(
        () => console.log('Item guardado'),
        error => console.error('Error al guardar el item: ', error)
      );
  }

  recuperarNickname() {
    this.nativeStorage.getItem('nickname')
      .then(
        data => {
          console.log(data)
          this.nickname = data.valor;
          this.recordar = true;
        },
        error => console.error('Error al recuperar item: ', error)
      );
  }

  limpiarNickname() {
    this.nativeStorage.remove('nickname')
      .then(
        () => console.log('Item eliminado'),
        error => console.error('Error al borrar item: ', error)
      );
  }

  cambiaToggle() {
    if (!this.recordar) {
      this.limpiarNickname();
      this.nickname = '';
    }
  }

}
