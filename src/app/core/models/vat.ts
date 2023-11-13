export interface VatRate {
  name: string;
  value: number;
}
export const vatRates: VatRate[] = [
  { name: '23%', value: 23 },
  { name: '8%', value: 8 },
  { name: '5%', value: 5 },
  { name: '0%', value: 0 },
];
