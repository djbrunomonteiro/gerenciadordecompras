import { IVenda } from 'src/app/models/venda';
import { IProduto } from './../models/produto';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReducer from './user/user.reduce';
import * as fromComprasReducer from './compras/compras.reducer';
import * as fromVendasReducer from './vendas/vendas.reducer';
import * as fromClientesReducer from './clientes/clientes.reducer';
import { Timestamp } from "firebase/firestore";


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

export const selectClientes = createSelector(clientesState, (elements) => {
  return Object.values(elements?.entities);
});

export const selectProdutos = createSelector(selectCompras, (elements) => {
  const result = [];
  elements.forEach((elem) => {
    elem.produtos.forEach((res: IProduto) => result.push({...res, fornecedor: elem.fornecedor, colecao: elem.nome}));
  });
  return result;
});

export const selectVendas = createSelector(
  vendasState,
  selectClientes,
  (vendas, clientes) => {
  const all = Object.values(vendas.entities);
  const result = all.map((elem: IVenda )=>{
    let data = '';
    if(elem.data){
      data = Timestamp.fromDate(new Date(elem.data.seconds * 1000 + elem.data.nanoseconds / 1000000) ).toDate().toISOString()
    }
    const dados_cliente = clientes.filter(item => item.id_ref === elem.id_cliente)[0]
    return {...elem, dados_cliente, data}
  })
  return result
});
