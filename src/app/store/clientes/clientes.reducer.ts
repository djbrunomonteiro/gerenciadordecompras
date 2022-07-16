
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ICliente } from "src/app/models/cliente";
import { ClientesActionType } from "./clientes.actions";

export interface ClientesState extends EntityState<ICliente>{};

export const adapter: EntityAdapter<ICliente> = createEntityAdapter<ICliente>();

export const inititalState: ClientesState = adapter.getInitialState({
})

export const ClienteReducer = createReducer(
    inititalState,

    on(ClientesActionType.ClientesSet, (state, action)=>{
        return adapter.addMany(action.itens, state)
    }),
    on(ClientesActionType.ClienteSetStore, (state, action)=>{
        return adapter.addOne(action.item, state)
    }),
    on(ClientesActionType.ClienteDelete, (state, action)=>{
        return adapter.removeOne(action.id, state)
    }),
    on(ClientesActionType.ClienteUpdate, (state, action)=>{
        return adapter.updateOne({id: action.id, changes: action.changes}, state)
    }),

)

