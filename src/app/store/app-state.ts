import { ActionReducerMap } from '@ngrx/store';
import * as fromUserReducer from './user/user.reduce';
import * as fromComprasReducer from './compras/compras.reducer';
import * as fromClientesReducer from './clientes/clientes.reducer';
import * as fromVendasReducer from './vendas/vendas.reducer';

export interface AppState{
    userState: fromUserReducer.UserState,
    comprasState: fromComprasReducer.ComprasState,
    clientesState: fromClientesReducer.ClientesState,
    vendasState: fromVendasReducer.VendasState,
}

export const appReducers: ActionReducerMap<AppState> = {
    userState: fromUserReducer.userReducer,
    comprasState:fromComprasReducer.CompraReducer,
    clientesState: fromClientesReducer.ClienteReducer,
    vendasState: fromVendasReducer.VendaReducer,

}