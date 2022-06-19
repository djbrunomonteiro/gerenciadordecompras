
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ICompra } from "src/app/models/compra";
import { ComprasActionType } from "./compras.actions";

export interface ComprasState extends EntityState<ICompra>{};

export const adapter: EntityAdapter<ICompra> = createEntityAdapter<ICompra>();

export const inititalState: ComprasState = adapter.getInitialState({
})

export const CompraReducer = createReducer(
    inititalState,

    on(ComprasActionType.ComprasSet, (state, action)=>{
        return adapter.addMany(action.itens, state)
    }),
    on(ComprasActionType.CompraSetStore, (state, action)=>{
        return adapter.addOne(action.item, state)
    }),
    on(ComprasActionType.CompraDelete, (state, action)=>{
        return adapter.removeOne(action.id, state)
    }),
    on(ComprasActionType.CompraUpdate, (state, action)=>{
        return adapter.updateOne({id: action.id, changes: action.changes}, state)
    }),

)

