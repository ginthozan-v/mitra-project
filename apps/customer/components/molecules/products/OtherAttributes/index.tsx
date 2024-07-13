import QuantityButton from '@/components/atoms/QuantityButton';
import { BILLING_TYPE, PRODUCT_CODE } from '@/models';
import { useEffect, useState } from 'react';

const OtherAttributes = ({
  productCode,
  billingType,
  billingDuration,
  attributes,
  onUpdate,
}: {
  productCode: string;
  billingType: string;
  billingDuration: number;
  attributes: any;
  onUpdate: any;
}) => {
  const minDuration = billingType === '3YEARLY' ? 3 : attributes.minDuration;
  const billingMultiplier = billingType === '3YEARLY' ? 3 : 1;

  const getBillingType = (type: string) => {
    let label = BILLING_TYPE[type].replace('ly', '');
    if (type === '3YEARLY') {
      label = 'Year';
    }
    return label;
  };

  const changeBackupServerCapacity = (value) => {
    onUpdate({ noOfUnits: value });
  };

  const changeDuration = (value) => {
    onUpdate({ duration: value });
  };

  const changeQuantity = (value) => {
    onUpdate({ quantity: value });
  };

  useEffect(() => {
    setTimeout(() => {
      changeDuration(minDuration);
    }, 10);
  }, []);

  useEffect(() => {
    const data = {
      noOfUnits: null,
      duration: attributes.minDuration,
      quantity: attributes.minQuantity,
    };
    if (productCode === PRODUCT_CODE.CSBS) {
      data.noOfUnits = attributes.defaultBandwidth || 1;
    }
    onUpdate({
      noOfUnits: productCode === PRODUCT_CODE.CSBS ? attributes.defaultBandwidth || 1 : attributes.defaultBandwidth,
      duration: attributes.minDuration,
      quantity: attributes.minQuantity,
    });
  }, [attributes]);

  return (
    <div className='other_attributes space-y-12'>
      {productCode === PRODUCT_CODE.CSBS && (
        <div className='flex items-center min-h-[2rem] product-attribute'>
          <label className='w-[10rem] min-w-[10rem]'>Backup Server Capacity</label>
          <QuantityButton
            stepper={10}
            min={attributes.defaultBandwidth}
            quantity={attributes.defaultBandwidth || 1}
            change={changeBackupServerCapacity}
          />
          <span className='text-sm ml-2'>GB</span>
        </div>
      )}
      {/* {(productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.ELB) && (
        <div className='flex items-center min-h-[2rem] product-attribute'>
          <label className='w-[10rem] min-w-[10rem]'>Bandwidth</label>
          <QuantityButton min={attributes.defaultBandwidth} quantity={attributes.defaultBandwidth} change={changeBandwidth} />
          <span className='text-sm ml-2'>Mbit/s</span>
        </div>
      )} */}
      <div className='flex items-center min-h-[2rem] product-attribute'>
        <label className='w-[10rem] min-w-[10rem]'>Duration</label>
        <QuantityButton stepper={billingMultiplier} min={minDuration} quantity={minDuration} change={changeDuration} />
        <span className='text-sm ml-2 capitalize'>{billingDuration === 1 ? getBillingType(billingType) : `${getBillingType(billingType)}s`}</span>
      </div>
      <div className='flex items-center min-h-[2rem] product-attribute'>
        <label className='w-[10rem] min-w-[10rem]'>Quantity</label>
        <QuantityButton min={attributes.minQuantity} max={attributes.maxQuantity} quantity={attributes.minQuantity} change={changeQuantity} />
      </div>
    </div>
  );
};

export default OtherAttributes;
