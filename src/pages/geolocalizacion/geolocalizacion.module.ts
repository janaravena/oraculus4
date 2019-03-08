import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeolocalizacionPage } from './geolocalizacion';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GeolocalizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(GeolocalizacionPage),
    ComponentsModule
  ],
})
export class GeolocalizacionPageModule {}
