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
import SampleTable from '@/components/molecules/customer/billing/SampleTable';
import { getAuth } from '@/utils/auth';

const Section = ({ children, className = '' }: { children?: any; className?: string }) => (
  <div className={`flex flex-col space-y-12 ${className}`}>{children}</div>
);
const headersArchitecture = ['Flavor', 'vCPUs', 'Memory', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];
const headersDisk = ['Flavor', 'System Disk', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];
const headersEIP = ['Flavor', 'EIP', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];
const PriceListOld = ({
  billingTypes,
  productType,
  availabilityZones,
  regions,
  productCode,
  productTitle,
  type,
  setProductCode,
}: {
  billingTypes: any;
  productType?: any;
  availabilityZones: any;
  regions: any;
  productCode: any;
  productTitle: any;
  type: any;
  setProductCode?: (value) => void;
}) => {
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
  const [data, setData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [eipData, setEIPdata] = useState([]);

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

  const getData = () => {
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.EVS) && customization.evs?.length === 0) return;
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.ELB) && typeof customization.eip === 'undefined') return;
    const items = [];

    billingTypes.map((i) => {
      const payload = {
        currency: currency.title,
        promoCode: null,
        pricingItems: [],
      };

      if (productCode !== PRODUCT_CODE.EVS && productCode !== productCode.EIP) {
        payload.pricingItems.push({
          index: 1,
          productCode: customization.productCode,
          billingType: i.key,
          duration: 1,
          quantity: 1,
          noOfUnits: customization.noOfUnits === 0 ? null : customization.noOfUnits,
        });
      }

      if (customization.eip) {
        payload.pricingItems.push({
          index: 2,
          productCode: customization.eip.productCode,
          billingType: i.key,
          duration: 1,
          quantity: 1,
          noOfUnits: customization.eip.noOfUnits,
        });
      }
      if (customization.evs?.length > 0) {
        payload.pricingItems.push(
          ...customization.evs.map((item, index) => {
            return {
              index: index + 3,
              productCode: item.productCode,
              billingType: i.key,
              duration: 1,
              quantity: 1,
              noOfUnits: item.noOfUnits,
            };
          }),
        );
      }

      api.pricingCalculator
        .getPricing(payload)
        .then((res) => {
          res.pricedItems?.map((val) => {
            if (i.key === 'HOURLY') {
              items.push({
                id: val.index,
                type: val.productCode,
                vCPUs: customization.vCPU,
                memory: customization.memory,
                [val.billingType]: val.priceDetail.netPrice,
              });
            } else if (i.key === '3YEARLY') {
              items.map((v, ind) => {
                items.splice(ind, 1);
                items.push({ ...v, [val.billingType]: val.priceDetail.netPrice, currency: currency.title });
              });
            } else {
              items.map((v, ind) => {
                items.splice(ind, 1);
                items.push({ ...v, [val.billingType]: val.priceDetail.netPrice });
              });
            }
          });
        })
        .finally(() => {
          if (i.key === '3YEARLY') {
            setData(items);
          }
        });
    });
  };

  const getDiskData = () => {
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.EVS) && customization.evs?.length === 0) return;
    if ((productCode === PRODUCT_CODE.ECS || productCode === PRODUCT_CODE.ELB) && typeof customization.eip === 'undefined') return;
    const items = [];

    billingTypes.map((i) => {
      const payload = {
        currency: currency.title,
        promoCode: null,
        pricingItems: [],
      };

      if (productCode !== PRODUCT_CODE.EVS && productCode !== productCode.EIP) {
        payload.pricingItems.push({
          index: 1,
          productCode: customization.productCode,
          billingType: i.key,
          duration: 1,
          quantity: 1,
          noOfUnits: customization.noOfUnits === 0 ? null : customization.noOfUnits,
        });
      }

      if (customization.eip) {
        payload.pricingItems.push({
          index: 2,
          productCode: customization.eip.productCode,
          billingType: i.key,
          duration: 1,
          quantity: 1,
          noOfUnits: customization.eip.noOfUnits,
        });
      }
      if (customization.evs?.length > 0) {
        payload.pricingItems.push(
          ...customization.evs.map((item, index) => {
            return {
              index: index + 3,
              productCode: item.productCode,
              billingType: i.key,
              duration: 1,
              quantity: 1,
              noOfUnits: item.noOfUnits,
            };
          }),
        );
      }

      api.pricingCalculator
        .getPricing(payload)
        .then((res) => {
          res.pricedItems?.map((val) => {
            if (i.key === 'HOURLY') {
              items.push({
                id: val.index,
                type: val.productCode,
                disk: customization.evs[0].type,
                [val.billingType]: val.priceDetail.netPrice,
              });
            } else if (i.key === '3YEARLY') {
              items.map((v, ind) => {
                items.splice(ind, 1);
                items.push({ ...v, [val.billingType]: val.priceDetail.netPrice, currency: currency.title });
              });
            } else {
              items.map((v, ind) => {
                items.splice(ind, 1);
                items.push({ ...v, [val.billingType]: val.priceDetail.netPrice });
              });
            }
          });
        })
        .finally(() => {
          if (i.key === '3YEARLY') {
            setDiskData(items);
            //remove after discussing with shihab about EIP
            setEIPdata(items);
          }
        });
    });
  };

  const getPrice = () => {
    console.log('custom', customization);
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
    // productCode,
    // customization.vCPU,
    // customization.memory,
  ]);

  useEffect(() => {
    getData();
    getDiskData();
  }, [
    currency.title,
    customization.productCode,
    customization.duration,
    customization.quantity,
    customization.noOfUnits,
    customization.eip,
    customization.evs,
    productCode,
    customization.vCPU,
    customization.memory,
    region,
  ]);

  return (
    <div className='px-4 py-5 shadow bg-white rounded-md pricing-calculator'>
      <h1 className='content-heading mb-12'>{productTitle}</h1>
      <div className='attributes-container'>
        <Section>
          <ProductAttribute
            label='Product Type'
            data={productType}
            customMap
            code='key'
            value='value'
            selected={productCode}
            onChange={setProductCode}
          />
          <ProductAttribute label='Region' data={regions} code='regionCode' selected={region} onChange={setRegion} />
          {type === 'build' && (
            <ProductAttribute
              label='Billing Type'
              data={billingTypes}
              customMap
              code='key'
              value='value'
              selected={billingType}
              onChange={setBillingType}
            />
          )}
        </Section>
        {productCode !== PRODUCT_CODE.EVS && attributes && (
          <ProductAttributes
            {...{ productCode, setOtherAttributes }}
            data={attributes}
            onUpdate={updateCustomization}
            className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'
          />
        )}

        {type === 'pricing' && data.length > 0 && (
          <div className='py-3'>
            <SampleTable isAction={false} headers={headersArchitecture} data={data} />
          </div>
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
        {type === 'pricing' && data.length > 0 && (
          <div className='py-3'>
            <SampleTable isAction={false} headers={headersDisk} data={diskData} />
          </div>
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
                />
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
        {otherAttributes && type === 'build' && (
          <Section className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
            <OtherAttributes
              {...{ productCode, billingType, billingDuration: customization.duration }}
              attributes={otherAttributes}
              onUpdate={updateCustomization}
            />
          </Section>
        )}

        {type === 'pricing' && data.length > 0 && (
          <div className='py-3'>
            <SampleTable isAction={false} headers={headersEIP} data={eipData} />
          </div>
        )}
        {type === 'build' && (
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
        )}
      </div>
      {type === 'build' && (
        <div className='pricing-info flex justify-between border-t border-black mt-12 pt-6'>
          <div className='price text-4xl flex items-center'>
            Price : {currency.symbol} {price}
          </div>
          <Link href='/cart'>
            <a className='bg-[#F89711] text-white flex items-center justify-center rounded w-32 h-12'>Buy Now</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PriceListOld;
