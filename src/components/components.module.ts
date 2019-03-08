import { NgModule } from '@angular/core';
import {IonicModule}  from 'ionic-angular';

import { EncabezadoComponent } from './encabezado/encabezado';
@NgModule({
	declarations: [EncabezadoComponent],
	imports: [IonicModule],
	exports: [EncabezadoComponent]
})
export class ComponentsModule {}
