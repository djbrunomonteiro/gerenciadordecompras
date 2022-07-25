import { ProdutoViewComponent } from './../../modals/produto/produto-view.component';
import { IProduto } from './../../models/produto';
import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { MiscService } from 'src/app/services/misc.service';
import { selectProdutos } from 'src/app/store/app-selectors';
import { ComprasActionType } from 'src/app/store/compras/compras.actions';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit, ViewWillEnter {

  produtos = [];

  loading = false;

  constructor(
    public modalController: ModalController,
    private store: Store,
    public misc: MiscService,
    public auth: AuthService
  ) { }


  ngOnInit() {
    this.getProdutos();
  }

  ionViewWillEnter(): void {
    if(!this.produtos.length){
      this.getProdutos();
    }
  }

  getProdutos(){
    this.loading = true;
    this.produtos = [];
    this.store.dispatch(ComprasActionType.ComprasGet());
    this.store.select(selectProdutos).subscribe((res: IProduto[])=>{
      this.produtos = res;
      this.loading = false;
    })
  }

  async openModal(produto: IProduto) {
    const modal =  await this.modalController.create({
      component: ProdutoViewComponent,
      componentProps: {
        produto
      },
    });
    modal.onDidDismiss().then((res) => {
      console.log(res);
    });
    return await modal.present();
  }

}
