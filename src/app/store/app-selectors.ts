import { IProduto } from './../models/produto';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReducer from './user/user.reduce';
import * as fromComprasReducer from './compras/compras.reducer';
import * as fromVendasReducer from './vendas/vendas.reducer';
import * as fromClientesReducer from './clientes/clientes.reducer';

export const userState =
  createFeatureSelector<fromUserReducer.UserState>('userState');

export const comprasState =
  createFeatureSelector<fromComprasReducer.ComprasState>('comprasState');

export const vendasState =
  createFeatureSelector<fromVendasReducer.VendasState>('vendasState');

export const clientesState =
  createFeatureSelector<fromClientesReducer.ClientesState>('clientesState');

export const selectUser = createSelector(userState, (elements) => {
  return Object.values(elements.entities)[0];
});

export const selectCompras = createSelector(comprasState, (elements) => {
  return Object.values(elements.entities);
});

export const selectVendas = createSelector(vendasState, (elements) => {
  return Object.values(elements.entities);
});

export const selectClientes = createSelector(clientesState, (elements) => {
  return Object.values(elements.entities);
});

export const selectProdutos = createSelector(selectCompras, (elements) => {
  const result = [];
  elements.forEach((elem) => {
    elem.produtos.forEach((res: IProduto) => result.push({...res, fornecedor: elem.fornecedor, colecao: elem.nome}));
  });
  return result;
});
