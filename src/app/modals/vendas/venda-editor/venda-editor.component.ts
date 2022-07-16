import { selectVendas } from './../../../store/app-selectors';
import { ICliente } from './../../../models/cliente';
import { IProduto } from './../../../models/produto';
import { IVenda } from './../../../models/venda';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { IUser } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { selectClientes, selectProdutos } from 'src/app/store/app-selectors';
import { ClientesActionType } from 'src/app/store/clientes/clientes.actions';
import { VendasActionType } from 'src/app/store/vendas/vendas.actions';

@Component({
  selector: 'app-venda-editor',
  templateUrl: './venda-editor.component.html',
  styleUrls: ['./venda-editor.component.css']
})
export class VendaEditorComponent implements OnInit {

  @Input() userData: IUser;
  @Input() venda: IVenda;

  form = this.formBuilder.group({
    id: [''],
    id_user: [''],
    data: ['', [Validators.required]],
    dados_cliente: this.formBuilder.group({
      id: [Math.floor(Date.now() * Math.random()).toString(36)],
      nome: ['', [Validators.required]],
      whats: ['',[Validators.required]],
      tel: [''],
      email: [''],
      instagram: [''],
      endereco: this.formBuilder.group({
        logradouro: [''],
        numero: [''],
        bairro: [''],
        cep: ['',],
        uf: [''],
        cidade: [''],
        complemento: [''],
        referencia: [''],
      }),
    }),
    dados_venda: this.formBuilder.array([]),
  });

  controlCliente = this.form.get('dados_cliente') as FormGroup;
  controlVendas = this.form.get('dados_venda') as FormArray;


  sliderAtual;
  slidesLength = 2;
  slides;

  produtos: IProduto[] = [];
  clientes: ICliente[] = [];
  vendas: IVenda[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private alertController: AlertController,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getProdutos();
    switch (this.venda) {
      case null || undefined:
        this.form.patchValue({
          id_user: this.userData?.id,
        });
        this.criarInput('produtos');
        break;
      default:
        // this.form.patchValue({
        //   id: this.compra.id,
        //   id_user: this.compra.id_user,
        //   nome: this.compra.nome,
        //   fornecedor: this.compra.fornecedor,
        //   data: this.compra.data,
        //   custo_frete: this.compra.custo_frete,
        // });

        // if (this.compra.custo_outros.length) {
        //   this.compra.custo_outros.forEach(() => {
        //     this.criarInput('custos');
        //   });
        //   this.form.patchValue({
        //     custo_outros: this.compra.custo_outros,
        //   });
        // }

        // if (this.compra.produtos.length) {
        //   this.compra.produtos.forEach(() => {
        //     this.criarInput('produtos');
        //   });
        //   this.form.patchValue({
        //     produtos: this.compra.produtos,
        //   });
        // }

        console.log(this.form.value);

        break;
    }
  }

  criarInput(tipo: string) {
    switch (tipo) {
      case 'produtos':
        this.controlVendas.push(
          this.formBuilder.group({
            id_produto: ['', [Validators.required]],
            quantidade: ['1', [Validators.required]],
            valor_und: ['', [Validators.required]],
            valor_total: ['', [Validators.required]],
          })
        );
        break;
    }
  }

  removerInput(tipo: string, index: number) {
    switch (tipo) {
      case 'produtos':
        if (this.controlVendas.length) {
          this.controlVendas.removeAt(index);
        }
        break;
    }
  }

  getSwiper(swiper: any) {
    if (!swiper) {
      return;
    }
    this.slides = swiper;
    this.sliderAtual = this.slides.realIndex;
  }

  controlSwiper(acao: string) {
    if (!this.slides) {
      return;
    }
    switch (acao) {
      case 'next':
        this.slides.slideNext();
        this.sliderAtual = this.slides.realIndex;
        break;
      case 'prev':
        this.slides.slidePrev();
        this.sliderAtual = this.slides.realIndex;
        break;
    }
  }

  getProdutos(){
    this.store.select(selectProdutos).subscribe((res: IProduto[])=>{
      this.produtos = res;
      console.log(this.produtos);
      
    })
  }

  getValorProduto(idProduto){
    if(!this.produtos.length || !idProduto){return 0}
    const produtoRef = this.produtos.filter(elem => String(elem.id_produto) === String(idProduto))[0]
    console.log(produtoRef);
    console.log(idProduto);
    
    if(produtoRef?.valor_venda){
      return produtoRef.valor_venda
    }else{
      return produtoRef.valor_sugerido
    }
  }

  salvarCliente(){
    const data = {...this.controlCliente.value, id_user: this.form.value.id_user}
    this.store.dispatch(ClientesActionType.ClienteSet({item: data}));
    console.log( data);
  }

  getClientes(){
    this.store.select(selectClientes).subscribe((res)=>{
      this.clientes = res;
    });
  }

  salvarVenda(){
    const data =  {
      id: this.form.value.id,
      id_user: this.form.value.id_user,
      data: this.form.value.data,
      dados_venda: this.controlVendas.value
    }
    this.store.dispatch(VendasActionType.VendaSet({item: data}));
  }

  getVendas(){
    this.store.select(selectVendas).subscribe((res)=>{
      this.vendas = res;
    });
  }

}
