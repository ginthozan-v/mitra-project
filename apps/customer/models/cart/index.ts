/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 15 August 2022, 17:43
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export type PaymentDetail = {
  paymentMethodCode: string;
  currencyCode: string;
};

export type BillingDetail = {
  isBillingTCAgreed: boolean;
  billingMode: string; // 'PREPAID' or 'POSTPAID'
};

export class CartItem {
  productId: string;
  itemId: number;
  quantity: number;
  isActive: boolean;
  isWrapper?= false;
  region = 'RHDC_CLIENT';
  series = 'x86';
  infraType = 'General-purpose';
  az = 'AZ1';
  vCPU = 2;
  memory = 4;
  osFlavor?: {
    id: number;
    osFlavorCode: string;
  };
  billingType = 'MONTHLY';
  duration = 1;
  storages = [
    {
      diskType: 'SSD',
      size: 40,
      isDefaultStorage: true,
    },
  ];
  networks = [
    {
      isDefault: true,
      infraType: 'ELB',
      bandwidth: 1,
      quantity: 1,
    },
  ];
  public constructor(item?: Partial<CartItem>) {
    Object.assign(this, item);
  }
  static get(cartItemData: CartItem_View) {
    const cartItem = new CartItem();
    cartItem.itemId = cartItemData.id;
    cartItem.quantity = cartItemData.summary.quantity;
    cartItem.isActive = cartItemData.summary.isActive;
    cartItem.isWrapper = cartItemData.detail.isWrapper || true;
    cartItem.region = cartItemData.detail.region?.code;
    cartItem.series = cartItemData.detail.series?.code;
    cartItem.infraType = cartItemData.detail.infraType?.code;
    cartItem.az = cartItemData.detail.availabilityZone?.code;
    cartItem.vCPU = cartItemData.detail.vCPU;
    cartItem.memory = cartItemData.detail.memory;
    if (cartItemData.detail.osFlavor) {
      cartItem.osFlavor = {
        id: cartItemData.detail.osFlavor.id,
        osFlavorCode: cartItemData.detail.osFlavor.code,
      };
    }
    cartItem.billingType = cartItemData.summary.billingType;
    cartItem.duration = cartItemData.summary.duration;
    cartItem.storages = cartItemData.detail.storages?.map<any>((storage) => ({
      id: storage.id,
      diskType: storage.diskType.code,
      size: storage.size,
      isDefault: storage.isDefault || true,
    }));
    cartItem.networks = cartItemData.detail.networks.map<any>((network) => ({
      id: network.id,
      infraType: network.infraType.code,
      bandwidth: network.bandwidth,
      quantity: network.quantity,
    }));
    return cartItem;
  }
}

export type Cart = {
  visitId: string;
  summary: CartSummary;
  pricing: CartPricing;
  paymentDetail: CartPaymentDetail;
  items: CartItem_View[];
};

export type CartItem_View = {
  id: number;
  productId: string;
  productCode: string;
  summary: CartItemSummary;
  detail: CartItemDetail;
  pricing: CartItemPricing;
  discount: CartItemDiscount;
};

export type CartItemDetailSubtype = {
  code: string;
  name: string;
};

export class CartItemDetail {
  region: CartItemDetailSubtype;
  availabilityZone: CartItemDetailSubtype;
  series: CartItemDetailSubtype;
  isWrapper: boolean;
  infraType: CartItemDetailSubtype;
  vCPU: number;
  memory: number;
  osFlavor: {
    id: number;
    productId: string;
    code: string;
    name: string;
  };
  otherAttributes: {
    key: string;
    value: string;
    sortOrder: number;
  }[];
  storages: {
    id: number;
    productId: string;
    productCode: string;
    productTypeLevel2Code: string;
    diskType: CartItemDetailSubtype;
    size: number;
    isDefault: boolean;
  }[];
  networks: {
    id: number;
    productId: string;
    productCode: string;
    productTypeLevel2Code: string;
    infraType: CartItemDetailSubtype;
    bandwidth: null;
    quantity: number;
    isDefault: boolean
  }[];
  constructor(init?: Partial<CartItemDetail>) {
    Object.assign(this, init);
  }
}

export type CartItemPricing = {
  netPrice: number;
  unitPriceMurHour: number;
  unitPriceMurMonth: number;
  unitPriceMurYear: number;
  unitPriceMur3Year: number;
};

export type CartItemDiscount = {
  discountType: string;
  amount: number;
};

export type CartItemSummary = {
  title: string;
  quantity: number;
  isSavedItem: boolean;
  billingType: string;
  isActive: boolean;
  duration: number;
  billingStartDate: Date;
  billingEndDate: Date;
  createdBy: string;
  createdAt: Date;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
  displayItemCode: string;
};

export type CartSummary = {
  orderReference: string;
  userId: string;
  status: string;
  checkoutAt: Date;
  createdBy: string;
  createdAt: Date;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
};

export type CartPricing = {
  subTotal: number;
  total: number;
  discount: number;
  vat: number;
  currency: string;
};

export type CartPaymentDetail = {
  paymentStatus: string;
  attempts: number;
  successMessage: string;
  failedMessage: string;
  reference: string;
  paymentAt: Date;
};
