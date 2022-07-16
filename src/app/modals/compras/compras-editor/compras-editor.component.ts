import { UploadsService } from './../../../services/uploads.service';
import { element } from 'protractor';
import { ICompra } from 'src/app/models/compra';
import { IUser } from './../../../models/user';
import { Store } from '@ngrx/store';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController, ViewWillEnter } from '@ionic/angular';
import { selectUser } from 'src/app/store/app-selectors';
import { Camera } from '@capacitor/camera';
import { randomInt } from 'crypto';
import { getStorage, ref } from "firebase/storage";

@Component({
  selector: 'app-compras-editor',
  templateUrl: './compras-editor.component.html',
  styleUrls: ['./compras-editor.component.css'],
})
export class ComprasEditorComponent implements OnInit, AfterViewInit,ViewWillEnter {
  @Input() userData: IUser;
  @Input() compra: ICompra;
  @ViewChild('ioncontent') ionContent;

  form = this.formBuilder.group({
    id: [''],
    id_user: [''],
    nome: ['', [Validators.required]],
    fornecedor: [''],
    data: ['', [Validators.required]],
    custo_frete: [''],
    custo_outros: this.formBuilder.array([]),
    produtos: this.formBuilder.array([]),
    total: [''],
  });

  custosControl = this.form.get('custo_outros') as FormArray;
  produtosControl = this.form.get('produtos') as FormArray;

  sliderAtual = 0;
  slidesLength = 2;
  slides: any;

  fotosUpload: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private alertController: AlertController,
    private uploadsService: UploadsService
  ) {}


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ionViewWillEnter(): void {
    switch (this.compra) {
      case null || undefined:
        this.form.patchValue({
          id_user: this.userData.id,
        });
        break;
      default:
        this.form.patchValue({
          id: this.compra.id,
          id_user: this.compra.id_user,
          nome: this.compra.nome,
          fornecedor: this.compra.fornecedor,
          data: this.compra.data,
          custo_frete: this.compra.custo_frete,
        });

        if (this.compra.custo_outros.length) {
          this.compra.custo_outros.forEach(() => {
            this.criarInput('custos');
          });
          this.form.patchValue({
            custo_outros: this.compra.custo_outros,
          });
        }

        if (this.compra.produtos.length) {
          this.compra.produtos.forEach(() => {
            this.criarInput('produtos');
          });
          this.form.patchValue({
            produtos: this.compra.produtos,
          });
        }

        console.log(this.form.value);

        break;
    }
  }

  criarInput(tipo: string) {
    switch (tipo) {
      case 'custos':
        this.custosControl.push(
          this.formBuilder.group({
            desc: ['', [Validators.required]],
            valor: ['', [Validators.required]],
          })
        );
        break;
      case 'produtos':
        this.produtosControl.push(
          this.formBuilder.group({
            id_produto: [Math.floor(Date.now() * Math.random()).toString(36)],
            nome_produto: ['', [Validators.required]],
            valor_compra: ['', [Validators.required]],
            porcentagem: ['', [Validators.required]],
            valor_sugerido: [''],
            valor_venda: [''],
            quantidade: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            fotos: [[]],
          })
        );
        break;
    }
  }

  removerInput(tipo: string, index: number) {
    switch (tipo) {
      case 'custos':
        if (this.custosControl.length) {
          this.custosControl.removeAt(index);
        }
        break;
      case 'produtos':
        if (this.produtosControl.length) {
          this.produtosControl.removeAt(index);
        }
        break;
    }
  }

  async alertConfirm() {
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
            this.salvar();
          },
        },
      ],
    });

    await alert.present();
  }

  salvar() {
    const data = { ...this.form.value, total: 0 };
    this.modalController.dismiss(data);
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
        this.ionContent.scrollToTop(500);
        this.calcular();
        break;
      case 'prev':
        this.slides.slidePrev();
        this.sliderAtual = this.slides.realIndex;
        this.ionContent.scrollToTop(500);
        break;
    }
  }

  enableBtn(): boolean {
    if (!this.slides) {
      return false;
    }
    switch (this.slides.realIndex) {
      case 0:
        if (
          this.form.value.nome &&
          this.form.value.data &&
          this.custosControl.valid
        ) {
          return true;
        } else {
          return false;
        }
      default:
        if (this.produtosControl.valid) {
          return true;
        } else {
          return false;
        }
    }
  }

  calcular() {
    const produtosRef = this.form.value.produtos as Array<any>;
    if (produtosRef.length) {
      produtosRef.forEach((elem, i) => {
        const vCompra = this.produtosControl
          .at(i)
          .get('valor_compra') as FormControl;
        const porcentagem = this.produtosControl
          .at(i)
          .get('porcentagem') as FormControl;
        const vSugerido = this.produtosControl
          .at(i)
          .get('valor_sugerido') as FormControl;
        const calcPorc =
          (parseFloat(vCompra.value) * parseFloat(porcentagem.value)) / 100;
        const custoPorProd = this.getValorCustos() / this.getQtdProduto();
        const result =
          calcPorc +
          parseFloat(vCompra.value) +
          parseFloat(String(custoPorProd));

        if (result) {
          vSugerido.setValue(parseFloat(String(result)).toFixed(2));
        }
      });
    }
  }

  getQtdProduto(): number {
    const results = [0];
    if (this.form.value.produtos.length) {
      this.form.value.produtos.forEach((element) => {
        if (element.quantidade) {
          results.push(element.quantidade);
        }
      });
      return Number(results.reduce((prev, curr) => prev + curr));
    } else {
      return 0;
    }
  }

  getValorCompraProduto(): number {
    const results = [0];
    if (this.form.value.produtos.length) {
      this.form.value.produtos.forEach((element) => {
        if (element.valor_compra) {
          results.push(element.valor_compra);
        }
      });
      return Number(results.reduce((prev, curr) => prev + curr));
    } else {
      return 0;
    }
  }

  getValorDeCompra(): number {
    const results = [0];
    if (this.form.value.produtos.length) {
      this.form.value.produtos.forEach((element) => {
        if (element.valor_compra) {
          results.push(element.valor_compra);
        }
      });
      return Number(results.reduce((prev, curr) => prev + curr));
    } else {
      return 0;
    }
  }

  getValorCustos(): number {
    const results = [];
    let result;
    if (this.form.value.custo_outros.length) {
      const outrosRef = this.form.value.custo_outros as Array<any>;
      outrosRef.forEach((element) => results.push(element.valor));
    }

    if (results.length) {
      result =
        Number(this.form.value.custo_frete) +
        Number(results.reduce((prev, curr) => prev + curr));
    } else {
      result = Number(this.form.value.custo_frete);
    }

    return result;
  }

  teste(event: any) {
    console.log(event);
  }

  async checkCamera() {
    return new Promise(async (resolve) => {
      const camera = await Camera.checkPermissions();
      if (camera.photos === 'granted') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async uploadFotos(index) {
    if (await this.checkCamera()) {
      const images = await Camera.pickImages({
        quality: 50,
        width: 500,
        limit: 5,
      });
      switch (images.photos.length) {
        case 0:
          break;
        default:
          images.photos.forEach((elem) => {
            const fileName = new Date().getTime() + '.jpeg';
            this.uploadsService
              .uploadImagem(elem, 'produtos', fileName)
              .then((res: any) => {
                const fotosControl = this.produtosControl.at(index).value.fotos as Array<string>;
                fotosControl.push(res);
              })
              .catch((err) => console.error(err));

            console.log(this.form.value);
          });
          break;
      }
    } else {
      const check = await Camera.requestPermissions();
    }
  }
}
