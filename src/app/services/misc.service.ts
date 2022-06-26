import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  formataDataBr(data){
    if(!data) return;
    const dataRef = new Date(data).toLocaleDateString("pt-br", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    if(dataRef === 'Invalid Date'){
      return ''
    }
   
    return dataRef;
  }

  checkError(res: any){
    if(res.hasOwnProperty('error')){
      console.error(res.message)
      return true         
    } else{
      return false
    }
  }
}
