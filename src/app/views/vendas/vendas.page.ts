import { VendaEditorComponent } from './../../modals/vendas/venda-editor/venda-editor.component';
import { IVenda } from './../../models/venda';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MiscService } from 'src/app/services/misc.service';
import { selectUser } from 'src/app/store/app-selectors';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit {

  userData: IUser;
  vendas: IVenda[] = [];

  constructor(
    public modalController: ModalController,
    private store: Store,
    public misc: MiscService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.store.select(selectUser).subscribe((res: IUser)=>{
      this.userData = res;      
    });
  }

  async openModal(tipo: string, compra?: any) {
    const modal =  await this.modalController.create({
      component: VendaEditorComponent,
      componentProps: {
        userData: this.userData,
        compra
      },
    });
    modal.onDidDismiss().then((res) => {
      // switch(res.data){
      //   case null || undefined:
      //     break;
      //   default:
      //     if(res.data.id){
      //       this.store.dispatch(ComprasActionType.CompraUpdate({id: res.data.id,  changes: res.data}));
      //     }else{
      //       this.store.dispatch(ComprasActionType.CompraSet({item: res.data}));
      //     }
      // }


    });
    return await modal.present();
  }

}
