import { Payment } from 'src/common/types';

export const summaryDonations = (payments: Payment[]): number => {
  return payments.reduce((totalAmount, payment) => totalAmount + payment.amount, 0);
};
