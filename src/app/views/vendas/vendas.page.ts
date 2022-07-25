import { VendaEditorComponent } from './../../modals/vendas/venda-editor/venda-editor.component';
import { IVenda } from './../../models/venda';
import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MiscService } from 'src/app/services/misc.service';
import { selectUser, selectVendas } from 'src/app/store/app-selectors';
import { VendasActionType } from 'src/app/store/vendas/vendas.actions';
import { ClientesActionType } from 'src/app/store/clientes/clientes.actions';



@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit, ViewWillEnter {

  userData: IUser;
  vendas: IVenda[] = [];

  loading = false;

  constructor(
    public modalController: ModalController,
    private store: Store,
    public misc: MiscService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.getDados();
  }

  ionViewWillEnter(): void {
    if(!this.vendas.length){
      this.getDados();
    }
  }

  getDados(){
    this.loading = true;
    this.store.select(selectUser).subscribe((res: IUser)=>{
      this.userData = res;      
    });
    this.store.dispatch(ClientesActionType.ClientesGet());
    this.getVendas();
  }

  async openModal(venda?: any) {
    const modal =  await this.modalController.create({
      component: VendaEditorComponent,
      componentProps: {
        userData: this.userData,
        venda
      },
    });
    modal.onDidDismiss().then((res) => {
    });
    return await modal.present();
  }

  getVendas(){
    this.store.dispatch(VendasActionType.VendasGet());
    this.store.select(selectVendas).subscribe(res =>{
      this.vendas = res;
      this.loading = false;
      
    })
  }

  getQtdItens(vendaRef: IVenda): number{
    const qtds = [];
    if(vendaRef){
      vendaRef.dados_venda.map(elem =>{
        qtds.push(elem.quantidade);
      })
      return qtds.reduce((prev,curr)=> Number(prev) + Number(curr));
    }else{
      return 0;
    }
  }

  getTotal(vendaRef: IVenda): number{
    const total = [];
    if(vendaRef){
      vendaRef.dados_venda.map(elem =>{
        total.push(elem.valor_total);
      })
      return total.reduce((prev,curr)=> Number(prev) + Number(curr));
    }else{
      return 0;
    }
  }



}
