import { createAction, props } from '@ngrx/store';
import { InvoiceSummary } from '../core/models/invoice';

export const save = createAction(
  '[Invoice] Save Total',
  props<{ total: InvoiceSummary }>(),
);
