import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  checkError(res: any){
    if(res.hasOwnProperty('error')){
      console.error(res.message)
      return true         
    } else{
      return false
    }
  }
}
