import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasEditorComponent } from './compras/compras-editor/compras-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    ComprasEditorComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ],
  exports:[
    ComprasEditorComponent,
  ],
  providers: []
})
export class ModalsModule {
  static forRoot() {
    return {
        ngModule: ModalsModule,
    };
  }
 }
