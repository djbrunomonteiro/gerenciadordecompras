import { IVenda } from './../../models/venda';
import { createAction, props } from "@ngrx/store";

//Relativo a GET ALL

export const VendasGet = createAction(
    '[Vendas GET] Obter Vendas'
)

export const VendasSetSuccess = createAction(
    '[Vendas SET SUCESSO] Sucesso ao Gravar Vendas'
)

export const VendasSetError = createAction(
    '[Vendas SET ERROR] Error ao Gravar Vendas'
)

export const VendasSet = createAction(
    '[Vendas SET] Gravar Todos Os Vendas',
    props<{itens: IVenda[]}>()
)


//Relativo a NEW One

export const VendaGet = createAction (
    '[Venda GET] Obter Venda no Banco de dados',
    props<{id: string}>()
)

export const VendaSet = createAction (
    '[Venda SET] Gravar Venda no Banco de dados',
    props<{item: IVenda}>()
)

export const VendaSetStore = createAction (
    '[Venda SET STORE] Grava Venda no Store',
    props<{item: IVenda}>()
)

export const VendaError = createAction(
    '[Venda ERROR] Error a gravar novo Venda'
)

export const VendaSuccess = createAction(
    '[Venda SUCESSO] Sucesso a Gravar novo Venda',
)

//Relativo UPDATE

export const VendaUpdate = createAction (
    '[Venda UPDATE] Update Venda no Banco de Dados',
    props<{id: string, changes: Partial<IVenda>}>()
)

export const VendaUpdateStore = createAction (
    '[Venda UPDATE] Update Venda no Store',
    props<{id: string, changes: Partial<IVenda>}>()
)

export const VendaUpdateError = createAction(
    '[Venda UP ERROR] Error Update Venda'
)

export const VendaUpdateSuccess = createAction(
    '[Venda UP SUCESSO] Sucesso Update Venda'
)

//Relativo Delete
export const VendaDelete = createAction (
    '[Venda DELETE] Delete Venda no Banco de dados',
    props<{id: string}>()
)

export const VendaDeleteStore = createAction (
    '[Venda DELETE] Delete Venda no Store',
    props<{id: string}>()
)

export const VendaDeleteSucesso = createAction (
    '[Venda DELETE SUCESSO] Sucesso a deletar Venda',
)
export const VendaDeleteError = createAction(
    '[Venda DELETE ERROR] Error Delete Venda'
)


export const VendasActionType = {
    VendasGet,
    VendasSet,
    VendasSetSuccess,
    VendasSetError,
    VendaSet,
    VendaSetStore,
    VendaGet,
    VendaError,
    VendaSuccess,
    VendaUpdate,
    VendaUpdateStore,
    VendaUpdateError,
    VendaUpdateSuccess,
    VendaDelete,
    VendaDeleteStore,
    VendaDeleteSucesso,
    VendaDeleteError,
}