import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/user";

export interface UserState extends EntityState<IUser> {}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();


export const UserSetStore = createAction (
    '[USER SET STORE] Set User in Store',
    props<{user: IUser}>()
);

export const UserSetData = createAction (
    '[USER SET DATA] Set User in DataBase',
    props<{user: IUser}>()
);

export const UserGet = createAction (
    '[USER GET] Get User ID',
    props<{id: string}>()
);

export const UserNew = createAction (
    '[USER NEW] Set new User',
    props<{user: IUser}>()
);

export const UserUpdate = createAction (
    '[USER UPDATE] Update of User',
    props<{id: string, changes: Partial<IUser>}>()
)

export const UserDelete = createAction (
    '[USER DELETE] Delete of User',
    props<{id: string}>()
)

export const UserSuccess = createAction (
    '[SUCCESS] Success User',
)

export const UserError = createAction (
    '[USER ERROR] Error User'
)

export const UserActionTypes = {
    UserSetStore,
    UserSetData,
    UserGet,
    UserUpdate,
    UserDelete,
    UserSuccess,
    UserError
}