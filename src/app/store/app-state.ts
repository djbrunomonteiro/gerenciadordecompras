import { ActionReducerMap } from '@ngrx/store';
import * as fromUserReducer from './user/user.reduce';
import * as fromComprasReducer from './compras/compras.reducer';

export interface AppState{
    userState: fromUserReducer.UserState,
    comprasState: fromComprasReducer.ComprasState
}

export const appReducers: ActionReducerMap<AppState> = {
    userState: fromUserReducer.userReducer,
    comprasState:fromComprasReducer.CompraReducer
}