import { AuthService } from 'src/app/services/auth.service';
import { MiscService } from 'src/app/services/misc.service';
import { ICompra } from './../../models/compra';
import { IUser } from './../../models/user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { ComprasEditorComponent } from 'src/app/modals/compras/compras-editor/compras-editor.component';
import { ComprasActionType } from 'src/app/store/compras/compras.actions';
import { selectCompras, selectUser } from 'src/app/store/app-selectors';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit, ViewWillEnter {

  userData: IUser;
  compras: ICompra[] = [];
  loading = false;
  
  constructor(
    public modalController: ModalController,
    private store: Store,
    public misc: MiscService,
    public auth: AuthService
    ) {}


  ngOnInit() {
    this.getDados();
  }

  ionViewWillEnter(): void {
    if(!this.compras){
      this.getDados();
    }
  }

  getDados(){
    this.loading = true;
    this.store.select(selectUser).subscribe((res: IUser)=>{this.userData = res;});
    this.getCompras();

  }

  getCompras(){
    this.store.dispatch(ComprasActionType.ComprasGet());
    this.store.select(selectCompras).subscribe((res: ICompra[])=>{
      this.compras = res;
      this.loading = false;
    })
  }

  async openModal(tipo: string, compra?: any) {
    const modal =  await this.modalController.create({
      component: ComprasEditorComponent,
      componentProps: {
        userData: this.userData,
        compra
      },
    });
    modal.onDidDismiss().then((res) => {
      switch(res.data){
        case null || undefined:
          break;
        default:
          if(res.data.id){
            this.store.dispatch(ComprasActionType.CompraUpdate({id: res.data.id,  changes: res.data}));
          }else{
            this.store.dispatch(ComprasActionType.CompraSet({item: res.data}));
          }
      }


    });
    return await modal.present();
  }
}
