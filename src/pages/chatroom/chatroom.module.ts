import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomPage } from './chatroom';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChatroomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatroomPage),
    ComponentsModule
  ],
})
export class ChatroomPageModule {}
