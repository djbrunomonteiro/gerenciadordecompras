import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasEditorComponent } from './compras/compras-editor/compras-editor.component';
import { ComprasListaComponent } from './compras/compras-lista/compras-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ComprasEditorComponent,
    ComprasListaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ComprasEditorComponent,
    ComprasListaComponent
  ]
})
export class ModalsModule {
  static forRoot() {
    return {
        ngModule: ModalsModule,
    };
  }
 }
