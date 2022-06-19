import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compras-editor',
  templateUrl: './compras-editor.component.html',
  styleUrls: ['./compras-editor.component.css']
})
export class ComprasEditorComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nome: ['', [Validators.required]],
    fornecedor: [''],
    quantidade: ['', [Validators.required]],
    valor_compra: ['', [Validators.required]],
    custo_frete: [''],
    custo_outros: this.formBuilder.array([])
  });

  custosControl = this.form.get('custo_outros') as FormArray;

  constructor(
    private formBuilder:  FormBuilder,
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {
  }

  criarInput(){
    this.custosControl.push(
      this.formBuilder.group({
        desc: ['', [Validators.required]],
        valor: ['', [Validators.required]]
      })
    )
  }

  removerInput(index){
    if(this.custosControl.length){
      this.custosControl.removeAt(index)
    }
  }

  salvar(){
    this.modalController.dismiss(this.form.value)
  }

}
