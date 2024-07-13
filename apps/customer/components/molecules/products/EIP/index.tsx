import api, { apiController } from '@/api';
import ProductAttribute from '@/components/atoms/ProductAttribute';
import QuantityButton from '@/components/atoms/QuantityButton';
import { EIP_REQUIREMENT } from '@/models';
import { getAuth } from '@/utils/auth';
import { useEffect, useState } from 'react';

const EIP = ({ billingType, additionalParams, onChange, className }) => {
  const data = [{ key: EIP_REQUIREMENT.OFF }, { key: EIP_REQUIREMENT.ON }];
  const [state, setState] = useState<string>(EIP_REQUIREMENT.OFF);
  const [selected, setSelected] = useState<string>('');
  const [bandwidth, setBandwidth] = useState<number>();
  const [product, setProduct] = useState<any>();
  const [attributes, setAttributes] = useState<any>();
  const [isMount, setMount] = useState(false);
  const productCode = 'EIP';
  const getData = () => {
    if (additionalParams) {
      let query: any = getAuth()?.userType === 'enterprise' ? { isEnterpriseClient: true } : {};
      query = {
        ...query,
        productTypeLevel2Code: productCode,
        billingMode: billingType,
        ...additionalParams,
      };

      api.products.getProductAttributes(query).then((res) => {
        if (res.attributes?.specs?.length > 0) {
          const codeMap = {};
          res.attributes?.specs.forEach((spec) => {
            codeMap[spec.value] = spec.nextLevel?.specs?.[0].value || '';
          });
          setProduct(codeMap);
          setSelected(res.attributes.specs?.[0].value || '');
          setBandwidth(res.attributes.specs[0].nextLevel.specs[0].otherAttributes.defaultBandwidth);
          setAttributes(res.attributes);
        }
      });
    }
  };

  const updateState = (value) => {
    setState(value);
    if (value === EIP_REQUIREMENT.ON && product) {
      onUpdate({ productCode: product[selected], noOfUnits: bandwidth });
    } else {
      onUpdate(null);
    }
  };

  const onUpdate = (data) => {
    onChange({ eip: data });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selected) {
      onUpdate({ productCode: product[selected], noOfUnits: bandwidth });
    } else {
      onUpdate(null);
    }
    setMount(true);
  }, [selected, bandwidth]);

  return (
    isMount && (
      <div className={`flex flex-col space-y-12 ${className}`}>
        <ProductAttribute
          label='EIP'
          data={data}
          customMap={true}
          code='key'
          selected={data.find((d) => d.key === state).key}
          onChange={updateState}
        ></ProductAttribute>
        {state === EIP_REQUIREMENT.ON && (
          <>
            <ProductAttribute
              label={attributes?.level}
              data={attributes?.specs}
              code='value'
              selected={selected}
              onChange={setSelected}
            ></ProductAttribute>
            {bandwidth && (
              <div className='flex items-center min-h-[2rem] product-attribute'>
                <label className='w-48 min-w-[12rem]'>Bandwidth</label>
                <QuantityButton min={1} quantity={bandwidth} change={setBandwidth} />
                <span className='text-sm ml-2'>Mbit/s</span>
              </div>
            )}
          </>
        )}
      </div>
    )
  );
};

export default EIP;
