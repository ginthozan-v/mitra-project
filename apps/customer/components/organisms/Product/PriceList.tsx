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
import { useRouter } from 'next/router';

const Section = ({ children, className = '' }: { children?: any; className?: string }) => (
  <div className={`flex flex-col space-y-12 ${className}`}>{children}</div>
);

const TD = ({ children, className = '', ...otherAttributes }: any) => {
  return (
    <td {...{ ...otherAttributes }} className={`text-sm px-3 py-2 border-t border-t-blue-100 text-left ${className}`}>
      {children}
    </td>
  );
};

const Specification = ({ data, productType }) => {
  return (
    <>
      {productType === PRODUCT_CODE.ECS && (
        <>
          <TD className='w-1 text-center'>{data.vCPU}</TD>
          <TD className='w-1 text-center'>{data.memory}</TD>
        </>
      )}
      {productType === PRODUCT_CODE.EVS && (
        <>
          <TD style={{ wordBreak: 'break-word' }}>{data.diskType}</TD>
          <TD className='w-1 text-center'>{data.storage}</TD>
        </>
      )}
      {productType === PRODUCT_CODE.ELB && <TD className='w-1 text-center'>{data.bandwidth}</TD>}
    </>
  );
};

const PricingTable = ({ productType, headers, data }: { productType?: any; headers?: any; data?: any; className?: string }) => (
  <div className='bg-white rounded-md border border-blue-100 text-mtBlue overflow-auto'>
    <table className='w-full min-w-[590px]'>
      <thead>
        <tr className='bg-[#F2F8FB] text-sm'>
          {headers.map((header) => (
            <th key={header} className={`h-10 px-3 whitespace-nowrap text-left`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.productId}>
            <TD className='min-w-[50%]'>{item.basic.productName}</TD>
            <Specification productType={productType} data={item.specification} />
            <TD className='w-1 text-center'>{item.convertedPriceDto.unitPriceHour}</TD>
            <TD className='w-1 text-center'>{item.convertedPriceDto.unitPriceMonth}</TD>
            <TD className='w-1 text-center'>{item.convertedPriceDto.unitPriceYear}</TD>
            <TD className='w-1 text-center'>{item.convertedPriceDto.unitPrice3Year}</TD>
            <TD className='w-1 text-center'>{item.convertedPriceDto.currency.code}</TD>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const headersArchitecture = ['Flavour', 'vCPUs', 'Memory', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];
const headersDisk = ['Disk', 'Type', 'Storage', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];
const headersEIP = ['Network', 'Bandwidth', 'Hourly', 'Monthly', 'Yearly', '3 Yearly', 'Currency'];

const PriceList = ({ productTypes, productCodes, regions }: { productTypes?: any; productCodes?: any; regions: any }) => {
  const router = useRouter();
  const currency = useCurrency();
  const [region, setRegion] = useState<any>(regions?.[0]?.regionCode || '');
  const [productType, setProductType] = useState(productTypes?.[0]?.subCategoryId);
  const [data, setData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [networkData, setNetworkData] = useState([]);

  const refetch = () => {
    setData([]);
    setDiskData([]);
    setNetworkData([]);

    api.products.getPrebuildOffers(productType, router.locale, currency.title, false, false, region, false).then((res) => {
      console.log();
      updateState(res, productType);
    });

    if (productType === productCodes[PRODUCT_CODE.ECS]) {
      api.products.getPrebuildOffers(productCodes[PRODUCT_CODE.EVS], router.locale, currency.title, false, false, region, false).then((res) => {
        updateState(res, productCodes[PRODUCT_CODE.EVS]);
      });
      api.products.getPrebuildOffers(productCodes[PRODUCT_CODE.ELB], router.locale, currency.title, false, false, region, false).then((res) => {
        updateState(res, productCodes[PRODUCT_CODE.ELB]);
      });
    }
  };

  const updateState = (state, productType) => {
    if (productType === productCodes[PRODUCT_CODE.ECS]) {
      console.log('ECS');
      setData(state);
    } else if (productType === productCodes[PRODUCT_CODE.EVS]) {
      console.log('EVS');
      setDiskData(state);
    } else if (productType === productCodes[PRODUCT_CODE.ELB]) {
      console.log('ELB');
      setNetworkData(state);
    }
  };

  useEffect(() => {
    refetch();
  }, [productType, currency.title]);
  // }, [productType, region]);

  return (
    <div className='px-4 py-5 shadow bg-white rounded-md pricing-calculator'>
      <div className='attributes-container'>
        <Section>
          <ProductAttribute
            label='Product Type'
            data={productTypes}
            customMap={true}
            code='subCategoryId'
            value='productSubCategoryCode'
            selected={productType}
            onChange={setProductType}
          />
          <ProductAttribute label='Region' data={regions} code='regionCode' value='regionName' selected={region} onChange={setRegion} />
        </Section>

        {data.length > 0 && (
          <Section className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
            <PricingTable productType={PRODUCT_CODE.ECS} headers={headersArchitecture} data={data} />
          </Section>
        )}

        {diskData.length > 0 && (
          <Section className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
            <PricingTable productType={PRODUCT_CODE.EVS} headers={headersDisk} data={diskData} />
          </Section>
        )}

        {networkData.length > 0 && (
          <Section className='mt-10 pt-10 border-dotted border-t-2 border-gray-300'>
            <PricingTable productType={PRODUCT_CODE.ELB} headers={headersEIP} data={networkData} />
          </Section>
        )}
      </div>
    </div>
  );
};;

export default PriceList;
