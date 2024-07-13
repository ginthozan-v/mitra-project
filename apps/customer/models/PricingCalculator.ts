export type ProductType = {
  productId: string;
  itemId: number;
  quantity: number;
  isActive: true;
  isWrapper: true;
  region: string;
  series: string;
  infraType: string;
  az: string;
  vCPU: number;
  memory: number;
  osFlavor?: { id: number; osFlavorCode: number } | {};
  billingType: string;
  duration: number;
  storages: any[];
  networks: any[];
};

export type PricingItem = {
  index: number;
  productCode: string;
  billingType: string;
  duration: number;
  quantity: number;
  noOfUnits: number;
};

export type PricingPayload = {
  currency: string;
  promoCode: string;
  pricingItems: PricingItem[];
};
