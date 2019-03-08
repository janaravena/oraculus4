import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

	tituloPagina: string = "Chat-Room ";

    messages = [];
    nickname = '';
    message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
  
  	this.nickname = this.navParams.get('nickname');

  	this.tituloPagina += this.nickname
 
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast(user + ' abandonó el chat');
      } else {
        this.showToast(user + ' se unió al chat');
      }
    });
  }
 
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}