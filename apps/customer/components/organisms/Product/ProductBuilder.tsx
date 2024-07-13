/**
 * File: ProductBuilder.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 02 November 2022, 18:00
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from '@/api';
import ProductAttribute from '@/components/atoms/ProductAttribute';
import useCurrency from '@/components/hooks/useCurrency';
import ProductAttributes from '@/components/molecules/products/ProductAttributes';
import { ASSIGN_IP, PRODUCT_CODE, PRODUCT_CUSTOMIZATION_KEY } from '@/models';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EIP from '@/components/molecules/products/EIP';
import OtherAttributes from '@/components/molecules/products/OtherAttributes';
import EVS from '@/components/molecules/products/EVS';
import { getAuth } from '@/utils/auth';

const Section = ({ children, className = '' }: { children?: any; className?: string }) => (
  <div className={`flex flex-col space-y-12 ${className}`}>{children}</div>
);

const ProductBuilder = ({ billingTypes, availabilityZones, regions, productCode, productTitle }) => {
  const customProduct: any = {
    productCode: '',
    itemId: 0,
    quantity: 0,
    isActive: true,
    isWrapper: true,
    series: null,
    infraType: '',
    vCPU: 0,
    memory: 0,
    osFlavor: {},
    duration: 1,
    storages: [],
    networks: [],
  };

  const [region, setRegion] = useState<any>(regions?.[0]?.regionCode || '');
  const [billingType, setBillingType] = useState<any>(billingTypes[1]?.key);
  const [visible, setVisibility] = useState<any>(true);
  const [attributes, setAttributes] = useState();
  const [otherAttributes, setOtherAttributes] = useState<any>();
  const [customization, setCustomization] = useState<any>(customProduct);
  const [prevCustomization, setPrevCustomization] = useState<any>(customProduct);
  const [price, setPrice] = useState<number>(0);
  const [assignIP, setAssignIP] = useState(ASSIGN_IP.AUTOMATIC);
  const currency = useCurrency();

  const validate = (payload) => {
    let valid = true;
    const items = payload.pricingItems;

    if (!items || items.length === 0) {
      return false;
    }

    for (const item of items) {
      if (!item.productCode || !item.billingType || !item.duration || !item.quantity) {
        valid = false;
        break;
      }
    }

    return valid;
  };

  const getPrice = () => {
    const payload = {
      currency: currency.title,
      promoCode: null,
      pricingItems: [],
    };
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.EVS) && customization.evs?.length === 0) return;
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.ELB) && typeof customization.eip === 'undefined') return;

    if (productCode !== PRODUCT_CODE.EVS && productCode !== productCode.EIP) {
      payload.pricingItems.push({
        index: 1,
        productCode: customization.productCode,
        billingType,
        duration: customization.duration,
        quantity: customization.quantity,
        noOfUnits: customization.noOfUnits === 0 ? null : customization.noOfUnits,
      });
    }

    if (customization.eip) {
      payload.pricingItems.push({
        index: 2,
        productCode: customization.eip.productCode,
        billingType,
        duration: customization.duration,
        quantity: customization.quantity,
        noOfUnits: customization.eip.noOfUnits,
      });
    }
    if (customization.evs?.length > 0) {
      payload.pricingItems.push(
        ...customization.evs.map((item, index) => {
          return {
            index: index + 3,
            productCode: item.productCode,
            billingType,
            duration: customization.duration,
            quantity: customization.quantity,
            noOfUnits: item.noOfUnits,
          };
        }),
      );
    }

    if (validate(payload)) {
      api.pricingCalculator.getPricing(payload).then((res) => {
        setPrice(res.total);
      });
    }
  };

  const refetch = () => {
    let query: any = getAuth()?.userType === 'enterprise' ? { isEnterpriseClient: true } : {};
    query = {
      ...query,
      productTypeLevel2Code: productCode,
      billingMode: billingType,
      region,
    };

    setAttributes(null);

    api.products.getProductAttributes(query).then((res) => {
      setAttributes(res.attributes);
    });
  };

  const updateCustomization = (data: any) => {
    const keys = Object.keys(data);
    const mappedData = {};
    keys.forEach((key) => {
      mappedData[PRODUCT_CUSTOMIZATION_KEY[key] || key] = data[key];
    });

    setCustomization((previousState) => {
      setPrevCustomization(customization);
      return { ...previousState, ...mappedData };
    });
  };

  const updateOtherAttributes = (data: any) => {
    if (productCode === PRODUCT_CODE.EVS) {
      setOtherAttributes(data);
    }
  };

  useEffect(() => {
    setVisibility(false);
    if (productCode !== PRODUCT_CODE.EVS) {
      refetch();
    }
    setTimeout(() => {
      setVisibility(true);
    });
  }, [billingType, region]);

  useEffect(() => {
    getPrice();
  }, [
    currency.title,
    customization.productCode,
    customization.duration,
    customization.quantity,
    customization.noOfUnits,
    customization.eip,
    customization.evs,
  ]);

  return (
    <>
      <div className='px-4 py-5 shadow bg-white rounded-md pricing-calculator'>
        <h1 className='content-heading mb-12'>{productTitle}</h1>
        <div className='attributes-container'>
          <Section>
            <ProductAttribute label='Region' data={regions} code='regionCode' selected={region} onChange={setRegion}></ProductAttribute>
            <ProductAttribute
              label='Billing Type'
              data={billingTypes}
              customMap={true}
              code='key'
              value='value'
              selected={billingType}
              onChange={setBillingType}
            ></ProductAttribute>
          </Section>
          {productCode !== PRODUCT_CODE.EVS && attributes && (
            <ProductAttributes
              {...{ productCode, setOtherAttributes }}
              data={attributes}
              onUpdate={updateCustomization}
              className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'
            />
          )}
          {(productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.EVS) && visible && (
            <EVS
              code={productCode}
              label={'Data Disk'}
              className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'
              {...{ region, billingType, setOtherAttributes: updateOtherAttributes }}
              onChange={updateCustomization}
            />
          )}
          {(productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.ELB) && visible && (
            <>
              {productCode === PRODUCT_CODE.ELB && (
                <div className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
                  <ProductAttribute
                    label='Assign IP'
                    data={[{ key: ASSIGN_IP.AUTOMATIC }, { key: ASSIGN_IP.MANUAL }]}
                    code='key'
                    selected={assignIP}
                    onChange={setAssignIP}
                  ></ProductAttribute>
                </div>
              )}
              <EIP
                className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'
                billingType={billingType}
                additionalParams={{ region }}
                onChange={updateCustomization}
              />
            </>
          )}
          {otherAttributes && (
            <Section className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
              <OtherAttributes
                {...{ productCode, billingType, billingDuration: customization.duration }}
                attributes={otherAttributes}
                onUpdate={updateCustomization}
              />
            </Section>
          )}
          <div className='note text-xs mt-12'>
            <div className='font-weight-700'>Note</div>
            <ol className='list-decimal pl-4 mt-3 space-y-4'>
              <li>The price is an estimate and may differ from the final price.</li>
              <li>
                When resource usage is calculated using the pay-per-use billing mode, decimal numerals are rounded off and accurate to two decimal
                places. For example, if the estimated price is less than $0.01 USD (after rounding off), $0.01 USD will be displayed.
              </li>
            </ol>
          </div>
        </div>
        <div className='pricing-info flex justify-between border-t border-black mt-12 pt-6'>
          <div className='price text-4xl flex items-center'>
            Price : {currency.symbol} {price}
          </div>
          <Link href='/cart'>
            <a className='bg-[#F89711] text-white flex items-center justify-center rounded w-32 h-12'>Buy Now</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductBuilder;
