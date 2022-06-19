import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserActionTypes } from './user.actions';
import { map, switchMap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEffectsService {

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store
  ) { }

  getUser = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActionTypes.UserGet),
    switchMap((action) => {
      return this.userService.getUser(action.id).pipe(
        map((res: IUser) => {
          if(res){
            this.store.dispatch(UserActionTypes.UserSetStore({user: res}))
          }
        }),
        catchError((err) =>{
          console.log(err); 
          this.store.dispatch(UserActionTypes.UserError())           
          return err
        })
      );
    }),
    map(() => UserActionTypes.UserSuccess())
  )
);

  setItem = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActionTypes.UserSetData),
    switchMap((action) => {
      return this.userService.addUser(action.user)
        .then(()=>{
          this.store.dispatch(UserActionTypes.UserGet({id: action.user.id }))    
        })
        .catch((err)=>{
          console.error(err);
          UserActionTypes.UserError();
          return err
        })
    })
  )
);


}