import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TotalState } from './total.reducer';
import { InvoiceSummary } from '../core/models/invoice';

export const selectTotal = (state: TotalState): InvoiceSummary => state.total;
export const selectInvoiceSummary = createSelector(
  selectTotal,
  (total) => total,
);
