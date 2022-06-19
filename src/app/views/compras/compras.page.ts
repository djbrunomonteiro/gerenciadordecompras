import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComprasEditorComponent } from 'src/app/modals/compras/compras-editor/compras-editor.component';
import { ComprasActionType } from 'src/app/store/compras/compras.actions';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  constructor(
    public modalController: ModalController,
    private store: Store
    ) {}

  ngOnInit(
    
  ) {}

  async openModal(tipo: string) {
    let modal;
    switch (tipo) {
      case 'editor':
        modal = await this.modalController.create({
          component: ComprasEditorComponent,
          initialBreakpoint: 1,
          breakpoints: [0, 0.5, 1],
          componentProps: {
          },
        });
        break;
      default:
        break;
    }

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.store.dispatch(ComprasActionType.CompraSet({item: res.data}))
      }
    });
    return await modal.present();
  }
}
