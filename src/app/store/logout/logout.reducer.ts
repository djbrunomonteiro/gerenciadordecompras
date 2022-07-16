import { Action} from '@ngrx/store';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../app-state';


export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: Action): AppState {
    if (action.type === 'CLEAR_STATE') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = [clearState];