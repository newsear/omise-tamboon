export type Currency = 'THB';

export type Charity = {
  id: number;
  currency: Currency;
  image: string;
  name: string;
};

export type Payment = {
  id: number;
  amount: number;
  charitiesId: number;
  currency: Currency;
};
