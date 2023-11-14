import { createReducer, on } from '@ngrx/store';
import { InvoiceSummary } from '../core/models/invoice';
import { save } from './total.actions';

export interface TotalState {
  total: InvoiceSummary;
}

export const initialState: TotalState = {
  total: {
    totalGross: 0,
    totalNet: 0,
    totalVat: 0,
  },
};

export const totalReducer = createReducer(
  initialState,
  on(
    save,
    (state, { data }): TotalState => ({
      ...state,
      total: data.total,
    }),
  ),
);
