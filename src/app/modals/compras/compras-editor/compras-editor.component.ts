import { ICompra } from 'src/app/models/compra';
import { IUser } from './../../../models/user';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { selectUser } from 'src/app/store/app-selectors';

@Component({
  selector: 'app-compras-editor',
  templateUrl: './compras-editor.component.html',
  styleUrls: ['./compras-editor.component.css']
})
export class ComprasEditorComponent implements OnInit {

  @Input() userData: IUser;
  @Input() compra: ICompra;

  form = this.formBuilder.group({
    id: [''],
    id_user: [''],
    nome: ['', [Validators.required]],
    fornecedor: [''],
    quantidade: ['', [Validators.required]],
    data: [''],
    valor_compra: ['', [Validators.required]],
    custo_frete: [''],
    custo_outros: this.formBuilder.array([]),
    total: ['']
  });

  custosControl = this.form.get('custo_outros') as FormArray;

  constructor(
    private formBuilder:  FormBuilder,
    public modalController: ModalController,
    
  ) { }

  ngOnInit(): void {
    switch(this.compra){
      case null || undefined:
        this.form.patchValue({
          id_user: this.userData.id
        })
        break;
      default:
        this.form.patchValue({
          id: this.compra.id,
          id_user: this.compra.id_user,
          nome: this.compra.nome,
          fornecedor: this.compra.fornecedor,
          quantidade: this.compra.quantidade,
          data: this.compra.data,
          valor_compra: this.compra.valor_compra,
          custo_frete: this.compra.custo_frete,
        });

        if(this.compra.custo_outros.length){
          this.compra.custo_outros.forEach((res)=>{
            this.criarInput();
          });
          this.form.patchValue({
            custo_outros: this.compra.custo_outros
          })

          console.log(this.compra.custo_outros);
          
        }

        console.log(this.form.value);
        
        break;

    }

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
    const data ={...this.form.value, total: this.somarTotal()}
    this.modalController.dismiss(data)
  }

  somarTotal(): number{ 
    const outrosResult = []
    let result = this.form.value.valor_compra + this.form.value.custo_frete;
    if(this.custosControl.length){
      const outros = this.form.value.custo_outros as Array<any>;
      outros.forEach(element => outrosResult.push(element.valor));
      result = result + outrosResult.reduce((prev, curr)=> prev+curr);  
    }
    return result  
  }

}
