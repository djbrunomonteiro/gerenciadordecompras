import { ICompra } from './../../models/compra';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MiscService } from 'src/app/services/misc.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ComprasActionType } from './compras.actions';
import { of } from 'rxjs';
import { CompraService } from 'src/app/services/compra.service';

@Injectable({
  providedIn: 'root'
})

export class ComprasEffectsService {
  constructor(
    private comprasService: CompraService,
    private store: Store,
    private actions$: Actions,
    private misc: MiscService,
    private router: Router
  ) {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ComprasActionType.ComprasGet),
      switchMap(() =>
        this.comprasService.getAll().pipe(
          map((res: ICompra[]) => {
            this.store.dispatch(ComprasActionType.ComprasSet({ itens: res }));
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
          return ComprasActionType.ComprasSetError();
        } else {
          return ComprasActionType.ComprasSetSuccess();
        }
      })
    )
  );

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ComprasActionType.CompraGet),
      switchMap((action) =>
        this.comprasService.getOne(action.id).pipe(
          map((res: any) => {
            this.store.dispatch(
              ComprasActionType.CompraSetStore({ item: res })
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
          return ComprasActionType.CompraError();
        } else {
          return ComprasActionType.CompraSuccess();
        }
      })
    )
  );

  setNewOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ComprasActionType.CompraSet),
      switchMap((action) => {
        console.log(action.item);
        return of(
          this.comprasService
            .addOne(action.item)
            .then((res) => {
              console.log(res);
              this.store.dispatch(ComprasActionType.CompraGet({ id: res }));
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
          return ComprasActionType.CompraError();
        } else {
          this.misc.presentToast('Item adicionado com sucesso!')
          return ComprasActionType.CompraSuccess();
        }
      })
    )
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ComprasActionType.CompraUpdate),
      switchMap((action) => {
        return of(
          this.comprasService
            .updateOne(action.changes)
            .then((res) => {
              console.log(res);
              this.store.dispatch(
                ComprasActionType.CompraGet({ id: action.id })
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
          return ComprasActionType.CompraUpdateError();
        } else {
          this.misc.presentToast('Item atualizado com sucesso!')
          return ComprasActionType.CompraUpdateSuccess();
        }
      })
    )
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(ComprasActionType.CompraDelete),
      switchMap((action) => {
        return of(
          this.comprasService
            .deleteOne(action.id)
            .then((res) => {
              console.log(res);
              ComprasActionType.CompraDeleteStore({ id: action.id });
            })
            .catch((err) => {
              console.error(err);
              return { error: true };
            })
        );
      }),
      map((res) => {
        if (this.misc.checkError(res)) {
          return ComprasActionType.CompraDeleteError();
        } else {
          return ComprasActionType.CompraDeleteSucesso();
        }
      })
    )
  );
}
