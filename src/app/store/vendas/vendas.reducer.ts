
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { IVenda } from "src/app/models/venda";
import { VendasActionType } from "./vendas.actions";


export interface VendasState extends EntityState<IVenda>{};

export const adapter: EntityAdapter<IVenda> = createEntityAdapter<IVenda>();

export const inititalState: VendasState = adapter.getInitialState({
})

export const VendaReducer = createReducer(
    inititalState,

    on(VendasActionType.VendasSet, (state, action)=>{
        return adapter.addMany(action.itens, state)
    }),
    on(VendasActionType.VendaSetStore, (state, action)=>{
        return adapter.addOne(action.item, state)
    }),
    on(VendasActionType.VendaDelete, (state, action)=>{
        return adapter.removeOne(action.id, state)
    }),
    on(VendasActionType.VendaUpdate, (state, action)=>{
        return adapter.updateOne({id: action.id, changes: action.changes}, state)
    }),

)

