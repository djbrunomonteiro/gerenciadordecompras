import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from '@ngrx/store';
import { IUser } from "src/app/models/user";
import { UserActionTypes } from './user.actions';

export interface UserState extends EntityState<IUser> {}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: UserState = adapter.getInitialState({});

export const userReducer = createReducer(
    initialState,
    on(UserActionTypes.UserSetStore, (state, action) => {
      return adapter.addOne(action.user, state);
    }),
    on(UserActionTypes.UserDelete, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
    on(UserActionTypes.UserUpdate, (state, action) => {
      return adapter.updateOne({ id: action.id, changes: action.changes }, state);
    }),
  );