import { createAction, props } from "@ngrx/store";
import { ICompra } from "src/app/models/compra";



//Relativo a GET ALL

export const ComprasGet = createAction(
    '[Compras GET] Obter Compras'
)

export const ComprasSetSuccess = createAction(
    '[Compras SET SUCESSO] Sucesso ao Gravar Compras'
)

export const ComprasSetError = createAction(
    '[Compras SET ERROR] Error ao Gravar Compras'
)

export const ComprasSet = createAction(
    '[Compras SET] Gravar Todos Os Compras',
    props<{itens: ICompra[]}>()
)


//Relativo a NEW One

export const CompraGet = createAction (
    '[Compra GET] Obter Compra no Banco de dados',
    props<{id: string}>()
)

export const CompraSet = createAction (
    '[Compra SET] Gravar Compra no Banco de dados',
    props<{item: ICompra}>()
)

export const CompraSetStore = createAction (
    '[Compra SET STORE] Grava Compra no Store',
    props<{item: ICompra}>()
)

export const CompraError = createAction(
    '[Compra ERROR] Error a gravar novo Compra'
)

export const CompraSuccess = createAction(
    '[Compra SUCESSO] Sucesso a Gravar novo Compra',
)

//Relativo UPDATE

export const CompraUpdate = createAction (
    '[Compra UPDATE] Update Compra no Banco de Dados',
    props<{id: string, changes: Partial<ICompra>}>()
)

export const CompraUpdateStore = createAction (
    '[Compra UPDATE] Update Compra no Store',
    props<{id: string, changes: Partial<ICompra>}>()
)

export const CompraUpdateError = createAction(
    '[Compra UP ERROR] Error Update Compra'
)

export const CompraUpdateSuccess = createAction(
    '[Compra UP SUCESSO] Sucesso Update Compra'
)

//Relativo Delete
export const CompraDelete = createAction (
    '[Compra DELETE] Delete Compra no Banco de dados',
    props<{id: string}>()
)

export const CompraDeleteStore = createAction (
    '[Compra DELETE] Delete Compra no Store',
    props<{id: string}>()
)

export const CompraDeleteSucesso = createAction (
    '[Compra DELETE SUCESSO] Sucesso a deletar Compra',
)
export const CompraDeleteError = createAction(
    '[Compra DELETE ERROR] Error Delete Compra'
)


export const ComprasActionType = {
    ComprasGet,
    ComprasSet,
    ComprasSetSuccess,
    ComprasSetError,
    CompraSet,
    CompraSetStore,
    CompraGet,
    CompraError,
    CompraSuccess,
    CompraUpdate,
    CompraUpdateStore,
    CompraUpdateError,
    CompraUpdateSuccess,
    CompraDelete,
    CompraDeleteStore,
    CompraDeleteSucesso,
    CompraDeleteError,
}