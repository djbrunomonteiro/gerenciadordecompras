import { createAction, props } from "@ngrx/store";
import { ICliente } from "src/app/models/cliente";

//Relativo a GET ALL

export const ClientesGet = createAction(
    '[Clientes GET] Obter Clientes'
)

export const ClientesSetSuccess = createAction(
    '[Clientes SET SUCESSO] Sucesso ao Gravar Clientes'
)

export const ClientesSetError = createAction(
    '[Clientes SET ERROR] Error ao Gravar Clientes'
)

export const ClientesSet = createAction(
    '[Clientes SET] Gravar Todos Os Clientes',
    props<{itens: ICliente[]}>()
)


//Relativo a NEW One

export const ClienteGet = createAction (
    '[Cliente GET] Obter Cliente no Banco de dados',
    props<{id: string}>()
)

export const ClienteSet = createAction (
    '[Cliente SET] Gravar Cliente no Banco de dados',
    props<{item: ICliente}>()
)

export const ClienteSetStore = createAction (
    '[Cliente SET STORE] Grava Cliente no Store',
    props<{item: ICliente}>()
)

export const ClienteError = createAction(
    '[Cliente ERROR] Error a gravar novo Cliente'
)

export const ClienteSuccess = createAction(
    '[Cliente SUCESSO] Sucesso a Gravar novo Cliente',
)

//Relativo UPDATE

export const ClienteUpdate = createAction (
    '[Cliente UPDATE] Update Cliente no Banco de Dados',
    props<{id: string, changes: Partial<ICliente>}>()
)

export const ClienteUpdateStore = createAction (
    '[Cliente UPDATE] Update Cliente no Store',
    props<{id: string, changes: Partial<ICliente>}>()
)

export const ClienteUpdateError = createAction(
    '[Cliente UP ERROR] Error Update Cliente'
)

export const ClienteUpdateSuccess = createAction(
    '[Cliente UP SUCESSO] Sucesso Update Cliente'
)

//Relativo Delete
export const ClienteDelete = createAction (
    '[Cliente DELETE] Delete Cliente no Banco de dados',
    props<{id: string}>()
)

export const ClienteDeleteStore = createAction (
    '[Cliente DELETE] Delete Cliente no Store',
    props<{id: string}>()
)

export const ClienteDeleteSucesso = createAction (
    '[Cliente DELETE SUCESSO] Sucesso a deletar Cliente',
)
export const ClienteDeleteError = createAction(
    '[Cliente DELETE ERROR] Error Delete Cliente'
)


export const ClientesActionType = {
    ClientesGet,
    ClientesSet,
    ClientesSetSuccess,
    ClientesSetError,
    ClienteSet,
    ClienteSetStore,
    ClienteGet,
    ClienteError,
    ClienteSuccess,
    ClienteUpdate,
    ClienteUpdateStore,
    ClienteUpdateError,
    ClienteUpdateSuccess,
    ClienteDelete,
    ClienteDeleteStore,
    ClienteDeleteSucesso,
    ClienteDeleteError,
}