export type PaymentGateway = {
  id: number;
  logo: string;
  title: Title;
  currencySupported: string;
  transactionLimit: number;
  active: boolean;
  uniqueKey: string;
  paymentMethodResponseList: PaymentMethod[];
  preferred: boolean;
};

export type PaymentMethod = {
  id: string;
  maskedCardNumber: string;
  paymentType: string;
  icon: string;
  preferred: boolean;
};

export type Title = {
  en: string;
  fr: string;
};
