import { Store } from '@ngrx/store';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ComprasActionType } from 'src/app/store/compras/compras.actions';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private alertController: AlertController,
    private menuController: MenuController,
    private store: Store
  ) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated){
      this.store.dispatch(ComprasActionType.ComprasGet())
    }
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      header: 'Deseja Sair do Aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => this.alertController.dismiss(),
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            this.auth.logOut();
            this.menuController.close();
          },
        },
      ],
    });

    await alert.present();
  }

}
