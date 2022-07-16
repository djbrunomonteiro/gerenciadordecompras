import { ModalController } from '@ionic/angular';
import { IProduto } from './../../models/produto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.css']
})
export class ProdutoViewComponent implements OnInit {
  @Input() produto: IProduto;

  slides;
  sliderAtual;
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit(): void {
    console.log(this.produto);
    
  }

  getSwiper(swiper: any) {
    if (!swiper) {
      return;
    }
    this.slides = swiper;
    this.sliderAtual = this.slides.realIndex;
  }

}
