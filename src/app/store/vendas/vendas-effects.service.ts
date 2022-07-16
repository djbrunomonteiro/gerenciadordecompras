import { VendaService } from './../../services/venda.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MiscService } from 'src/app/services/misc.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VendasActionType } from './vendas.actions';
import { IVenda } from 'src/app/models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendasEffectsService {

  constructor(
    private vendasService: VendaService,
    private store: Store,
    private actions$: Actions,
    private misc: MiscService,
    private router: Router
  ) {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(VendasActionType.VendasGet),
      switchMap(() =>
        this.vendasService.getAll().pipe(
          map((res: IVenda[]) => {
            this.store.dispatch(VendasActionType.VendasSet({ itens: res }));
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
          return VendasActionType.VendasSetError();
        } else {
          return VendasActionType.VendasSetSuccess();
        }
      })
    )
  );

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(VendasActionType.VendaGet),
      switchMap((action) =>
        this.vendasService.getOne(action.id).pipe(
          map((res: any) => {
            this.store.dispatch(
              VendasActionType.VendaSetStore({ item: res })
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
      ),
      map((res) => {
        if (this.misc.checkError(res)) {
          return VendasActionType.VendaError();
        } else {
          return VendasActionType.VendaSuccess();
        }
      })
    )
  );

  setNewOne = createEffect(() =>
    this.actions$.pipe(
      ofType(VendasActionType.VendaSet),
      switchMap((action) => {
        console.log(action.item);
        return of(
          this.vendasService
            .addOne(action.item)
            .then((res) => {
              console.log(res);
              this.store.dispatch(VendasActionType.VendaGet({ id: res }));
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
          return VendasActionType.VendaError();
        } else {
          this.misc.presentToast('Item adicionado com sucesso!')
          return VendasActionType.VendaSuccess();
        }
      })
    )
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(VendasActionType.VendaUpdate),
      switchMap((action) => {
        return of(
          this.vendasService
            .updateOne(action.changes)
            .then((res) => {
              console.log(res);
              this.store.dispatch(
                VendasActionType.VendaGet({ id: action.id })
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
          return VendasActionType.VendaUpdateError();
        } else {
          this.misc.presentToast('Item atualizado com sucesso!')
          return VendasActionType.VendaUpdateSuccess();
        }
      })
    )
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(VendasActionType.VendaDelete),
      switchMap((action) => {
        return of(
          this.vendasService
            .deleteOne(action.id)
            .then((res) => {
              console.log(res);
              VendasActionType.VendaDeleteStore({ id: action.id });
            })
            .catch((err) => {
              console.error(err);
              return { error: true };
            })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          return VendasActionType.VendaDeleteError();
        } else {
          return VendasActionType.VendaDeleteSucesso();
        }
      })
    )
  );
}
