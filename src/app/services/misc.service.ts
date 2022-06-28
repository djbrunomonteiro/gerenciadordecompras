import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    public toastController: ToastController
  ) { }

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

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'bottom',
      color: 'primary',
      duration: 2000,
      buttons:[
        {
          side: 'end',
          icon: 'close-outline',
          handler: () => {
            this.toastController.dismiss();
          }
        }
      ]
    });
    toast.present();
    const { role } = await toast.onDidDismiss();
  }
}
