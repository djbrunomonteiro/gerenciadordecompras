import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReducer from './user/user.reduce';
import * as fromComprasReducer from './compras/compras.reducer';

export const userState = createFeatureSelector<fromUserReducer.UserState>('userState');
export const comprasState = createFeatureSelector<fromComprasReducer.ComprasState>('comprasState');

export const selectUser = createSelector(userState, (elements) => {
  return Object.values(elements.entities)[0];
});
export const selectCompras = createSelector(comprasState, (elements) => {
  return Object.values(elements.entities);
});
