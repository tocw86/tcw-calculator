import { createAction, props } from '@ngrx/store';
import { TotalState } from './total.reducer';

export const save = createAction(
  '[Invoice] Save Total',
  props<{ data: TotalState }>(),
);
