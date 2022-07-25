import { DataPickerComponent } from './../../data-picker/data-picker.component';
import { selectVendas } from './../../../store/app-selectors';
import { ICliente } from './../../../models/cliente';
import { IProduto } from './../../../models/produto';
import { IVenda } from './../../../models/venda';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController, ViewWillEnter } from '@ionic/angular';
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
export class VendaEditorComponent implements OnInit, ViewWillEnter {

  @Input() userData: IUser;
  @Input() venda: IVenda;
  @ViewChild('ioncontent') ionContent;

  form = this.formBuilder.group({
    id: [''],
    id_user: [''],
    data: ['', [Validators.required]],
    dados_cliente: this.formBuilder.group({
      id: [''],
      id_ref: [''],
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
    dados_pagamento: this.formBuilder.array([]),
  });

  controlCliente = this.form.get('dados_cliente') as FormGroup;
  controlData = this.form.get('data') as FormControl;
  controlVendas = this.form.get('dados_venda') as FormArray;
  controlPagamento = this.form.get('dados_pagamento') as FormArray;


  sliderAtual;
  slidesLength = 3;
  slides;

  produtos: IProduto[] = [];
  clientes: ICliente[] = [];
  vendas: IVenda[] = [];

  qtdParcelas = [];
  isOpenData = false;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private alertController: AlertController,
    private store: Store,
    public popoverCtrl: PopoverController
  ) { }


  ngOnInit(): void {
    this.getDados();
    this.gerarParcelas(13);

  }

  ionViewWillEnter(): void {
    if(!this.clientes.length || !this.produtos.length){
      this.getDados();
    }
  }

  gerarParcelas(qtd: number){
    const result = [];
    for (let index = 1; index < qtd; index++) {
      result.push(index)
    }
    this.qtdParcelas = result;
  }

  async openData(index: number, tipo: string){
    const popover = await this.popoverCtrl.create({
      component: DataPickerComponent,
    });

    await popover.present();

    await popover.onDidDismiss().then((res)=>{
      if(res.data){
        switch (tipo){
          case 'data_prev':
            this.controlPagamento.at(index).patchValue({
              data_prev: res.data
            })
          break;
          case 'data_pag':
            this.controlPagamento.at(index).patchValue({
              data_pag: res.data
            })
          break;

        }
        console.log(this.controlPagamento.value);
      }
      
    });

  }

  selectParcelas(quantidade){
    if(quantidade.detail.value){
      for (let index = 1; index < quantidade.detail.value; index++) {
        this.criarInput('pagamentos')
      }
    }

    console.log(this.controlPagamento.value);
    
  }
  teste(){
    console.log(this.controlPagamento.value);
    
  }

  getDados(){
    this.getProdutos();
    this.getClientes();
    switch (this.venda) {
      case null || undefined:
        this.form.patchValue({
          id_user: this.userData?.id,
          data: new Date().toISOString()
        });
        this.criarInput('produtos');
        this.criarInput('pagamentos');
        break;
      default:
        this.form.patchValue({
          id: this.venda,
          id_user: this.venda.id_user,
          data: this.venda.data,
          dados_cliente: this.venda.dados_cliente,
        });

        if(this.venda.dados_venda.length){
          this.venda.dados_venda.forEach(() => {
            this.criarInput('produtos');
          });

          this.form.patchValue({
            dados_venda: this.venda.dados_venda,
          })
        }else{
          this.criarInput('produtos');
        }

        if(this.venda.dados_pagamento){
          this.venda.dados_pagamento.forEach(() => {
            this.criarInput('pagamentos');
          });
          this.form.patchValue({
            dados_pagamento: this.venda.dados_pagamento,
          })
        }else{
          this.criarInput('pagamentos');
        }
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
      case 'pagamentos':
        this.controlPagamento.push(
          this.formBuilder.group({
            parcela: ['', [Validators.required]],
            status: [false, [Validators.required]],
            data_prev: [''],
            data_pag: [''],
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
      case 'pagamentos':
        if (this.controlPagamento.length) {
          this.controlPagamento.removeAt(index);
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

  controlNext(): boolean{
    switch(this.sliderAtual){
      case 0:
        if(this.controlCliente.valid && this.controlData.valid){
          return true;
        }else{
          return false
        }
      case 1:
        if(this.controlVendas.valid){
          return true;
        }else{
          return false
        }

      case 2:
        if(this.controlPagamento.valid){
          return true;
        }else{
          return false
        }

      default:
        return false;
    }

  }

  controlSwiper(acao: string) {
    if (!this.slides) {return;}
    switch (acao) {
      case 'next':
        this.slides.slideNext();
        this.sliderAtual = this.slides.realIndex;
        this.ionContent.scrollToTop(500);
        break;
      case 'prev':
        this.slides.slidePrev();
        this.sliderAtual = this.slides.realIndex;
        this.ionContent.scrollToTop(500);
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
    if(produtoRef?.valor_venda){
      return produtoRef.valor_venda
    }else{
      return produtoRef.valor_sugerido
    }
  }

  salvarCliente(){
    const id = this.controlCliente.value.id_ref;
    if(id){
      let data = {...this.controlCliente.value, id_user: this.form.value.id_user}
      this.store.dispatch(ClientesActionType.ClienteUpdate({id: this.controlCliente.value.id, changes: data}));
    }else{
      this.controlCliente.patchValue({ id_ref: Math.floor(Date.now() * Math.random()).toString(36)});
      let newData = {...this.controlCliente.value, id_user: this.form.value.id_user}
      this.store.dispatch(ClientesActionType.ClienteSet({item: newData}));
    }
  }

  getClientes(){
    this.store.dispatch(ClientesActionType.ClientesGet());
    this.store.select(selectClientes).subscribe((res)=>{
      this.clientes = res;
    });
  }

  salvarVenda(){
    const data =  {
      id: this.form.value.id,
      id_user: this.form.value.id_user,
      data: new Date(this.form.value.data),
      id_cliente: this.controlCliente.value.id_ref,
      dados_venda: this.controlVendas.value,
      dados_pagamento: this.controlPagamento.value,
    }

    if(data.id){
      this.store.dispatch(VendasActionType.VendaUpdate({id: data.id, changes: data}));
    }else{
      this.store.dispatch(VendasActionType.VendaSet({item: data}));
    }

  }

  getVendas(){
    this.store.select(selectVendas).subscribe((res)=>{
      this.vendas = res;
    });
  }

  salvarDados(){
    this.salvarCliente();
    setTimeout(()=>{
      this.salvarVenda();
      this.form.reset();
      this.modalController.dismiss();
    },500)

  }

  selecionarCliente(){
    const idClienteRef = this.controlCliente.value.id_ref;
    if(idClienteRef){
      const clienteRef = this.clientes.filter(elem => elem.id_ref === idClienteRef)[0];
      if(!clienteRef){return}
      this.controlCliente.patchValue({
        id: clienteRef?.id,
        id_ref: clienteRef?.id_ref,
        nome: clienteRef.nome,
        whats: clienteRef.whats,
        tel: clienteRef.tel,
        email: clienteRef.email,
        instagram: clienteRef.instagram,
        endereco: {
          logradouro: clienteRef.endereco.logradouro,
          numero: clienteRef.endereco.numero,
          bairro: clienteRef.endereco.bairro,
          cep: clienteRef.endereco.cep,
          uf: clienteRef.endereco.uf,
          cidade: clienteRef.endereco.cidade,
          complemento: clienteRef.endereco.complemento,
          referencia: clienteRef.endereco.referencia,
        },
      })

      console.log(this.controlCliente.value);
      
    }
    
  }


  async alertConfirmar() {
    const alert = await this.alertController.create({
      header: 'Deseja Salvar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            this.alertController.dismiss();
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            this.salvarDados();
          },
        },
      ],
    });

    await alert.present();
  }

}
