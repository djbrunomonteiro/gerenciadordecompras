import { ProdutoViewComponent } from './produto/produto-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasEditorComponent } from './compras/compras-editor/compras-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { VendaEditorComponent } from './vendas/venda-editor/venda-editor.component';

import { DataPickerComponent } from './data-picker/data-picker.component';




@NgModule({
  declarations: [
    ComprasEditorComponent,
    ProdutoViewComponent,
    VendaEditorComponent,
    DataPickerComponent
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
    ProdutoViewComponent,
    VendaEditorComponent,
    DataPickerComponent
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
