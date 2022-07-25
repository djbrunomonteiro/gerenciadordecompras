import { ClientesService } from './../../services/clientes.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MiscService } from 'src/app/services/misc.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClientesActionType } from './clientes.actions';
import { ICliente } from 'src/app/models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesEffectsService {

  constructor(
    private clientesService: ClientesService,
    private store: Store,
    private actions$: Actions,
    private misc: MiscService,
    private router: Router
  ) {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientesActionType.ClientesGet),
      switchMap(() =>
        this.clientesService.getAll().pipe(
          map((res: ICliente[]) => {
            console.log(res);
            
            this.store.dispatch(ClientesActionType.ClientesSet({ itens: res }));
            return res;
          }),
          catchError((err) => {
            console.error(err);
            return of({ error: true });
          })
        )
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          return ClientesActionType.ClientesSetError();
        } else {
          return ClientesActionType.ClientesSetSuccess();
        }
      })
    )
  );

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientesActionType.ClienteGet),
      switchMap((action) => {
        console.log(action);
        
        return this.clientesService.getOne(action.id).pipe(
          map((res: any) => {
            this.store.dispatch(
              ClientesActionType.ClienteSetStore({ item: res })
            );
            return res;
          }),
          catchError((err) => {
            console.error(err);
            return of({
              error: true,
            });
          })
        )

      }
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          return ClientesActionType.ClienteError();
        } else {
          return ClientesActionType.ClienteSuccess();
        }
      })
    )
  );

  setNewOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientesActionType.ClienteSet),
      switchMap((action) => {
        console.log(action.item);
        return of(
          this.clientesService
            .addOne(action.item)
            .then((res) => {
              console.log(res);
              this.store.dispatch(ClientesActionType.ClienteGet({ id: res }));
            })
            .catch((err) => {
              console.error(err);
              return { error: true };
            })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          this.misc.presentToast('Não foi possivel salvar item, Tente novamente!')
          return ClientesActionType.ClienteError();
        } else {
          this.misc.presentToast('Item adicionado com sucesso!')
          return ClientesActionType.ClienteSuccess();
        }
      })
    )
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientesActionType.ClienteUpdate),
      switchMap((action) => {
        return of(
          this.clientesService
            .updateOne(action.changes)
            .then((res) => {
              console.log(res);
              this.store.dispatch(
                ClientesActionType.ClienteGet({ id: action.id })
              );
            })
            .catch((err) => {
              console.error(err);
              return { error: true };
            })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          this.misc.presentToast('Não foi possivel autualizar item, Tente novamente!')
          return ClientesActionType.ClienteUpdateError();
        } else {
          this.misc.presentToast('Item atualizado com sucesso!')
          return ClientesActionType.ClienteUpdateSuccess();
        }
      })
    )
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientesActionType.ClienteDelete),
      switchMap((action) => {
        return of(
          this.clientesService
            .deleteOne(action.id)
            .then((res) => {
              console.log(res);
              ClientesActionType.ClienteDeleteStore({ id: action.id });
            })
            .catch((err) => {
              console.error(err);
              return { error: true };
            })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          return ClientesActionType.ClienteDeleteError();
        } else {
          return ClientesActionType.ClienteDeleteSucesso();
        }
      })
    )
  );
}
