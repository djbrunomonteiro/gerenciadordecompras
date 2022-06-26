import { MiscService } from 'src/app/services/misc.service';
import { ICompra } from './../../models/compra';
import { IUser } from './../../models/user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComprasEditorComponent } from 'src/app/modals/compras/compras-editor/compras-editor.component';
import { ComprasActionType } from 'src/app/store/compras/compras.actions';
import { selectCompras, selectUser } from 'src/app/store/app-selectors';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  userData: IUser;
  compras: ICompra[] = [];
  constructor(
    public modalController: ModalController,
    private store: Store,
    public misc: MiscService
    ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((res: IUser)=>{
      this.userData = res;
    });
    this.getCompras();
  }

  getCompras(){
    this.store.dispatch(ComprasActionType.ComprasGet());
    this.store.select(selectCompras).subscribe((res: ICompra[])=>{
      this.compras = res;
    })
  }

  async openModal(tipo: string, compra?: any) {
    const modal =  await this.modalController.create({
      component: ComprasEditorComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 0.5, 1],
      componentProps: {
        userData: this.userData,
        compra
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.store.dispatch(ComprasActionType.CompraSet({item: res.data}))
      }
    });
    return await modal.present();
  }
}
