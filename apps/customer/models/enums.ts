export enum PAYMENT_GATEWAY {
  SBM = 'IPAY',
  MYT = 'MYTMoney',
  PAYPAL = 'PAYPAL',
}

export enum EIP_REQUIREMENT {
  ON = 'New',
  OFF = 'Do Not Use',
}

export enum ASSIGN_IP {
  AUTOMATIC = 'Automatic',
  MANUAL = 'Manual',
}

export enum DISK_TYPE {
  SYSTEM = 'System Disk',
  DATA = 'Data Disk',
}

export enum BILLING_TYPE {
  HOURLY = 'Hourly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  '3YEARLY' = '3 Yearly',
}

export enum BILLING_MODE {
  PREPAID = 'PREPAID',
  POSTPAID = 'ATB',
}

export enum POSTPAID_STATUS {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  VERIFIED = 'VERIFIED',
}

export enum PRODUCT_CODE {
  ECS = 'ECS',
  ELB = 'ELB',
  EVS = 'EVS',
  CSBS = 'CSBS',
}

export enum PRODUCT_CUSTOMIZATION_KEY {
  SERIES = 'series',
  INFRA_TYPE = 'infraType',
  VCPU = 'vCPU',
  MEMORY = 'memory',
  PRODUCT = 'productCode',
  DISK_TYPE = 'diskType',
  BANDWIDTH_TYPE = 'bandwidthType',
  BANDWIDTH = 'bandwidth',
}

export enum PRODUCT_BUILDER_LABEL {
  SERIES = 'CPU Architecture',
  INFRA_TYPE = 'ECS Type',
  VCPU = 'vCPUs',
  MEMORY = 'Memory',
  DISK_TYPE = 'Disk Type',
  BANDWIDTH_TYPE = 'Bandwidth Type',
  BANDWIDTH = 'Bandwidth',
}
