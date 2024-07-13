/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 8 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import QuantityButton from 'components/atoms/QuantityButton';
import { useEffect, useState } from 'react';
import useStore from '@/store';
import { useRouter } from 'next/router';
import AddToCart from '@/components/atoms/AddToCart';

const PrebuildOfferItem = ({
  subcategory,
  currency,
  getData,
  // product: pdt,
  product,
}: {
  subcategory?: string;
  currency?: any;
  getData?: any;
  product: any;
}) => {
  let id = '';
  let isExpand = false;

  // const [product, setProduct] = useState(pdt);
  const router = useRouter();
  const status = useStore((state) => state.status);

  let isDisabled = false;
  if (status === 'CREATIO_FAILED') {
    isDisabled = true;
  }
  if (router.query.key !== undefined) {
    id = router.query.key?.toString();
  }

  if (id !== null && id.length > 1) {
    if (id === product.productId) {
      isExpand = true;
    }
  } else {
    isExpand = product.isExpand;
  }

  const [expanded, setExpanded] = useState(isExpand);
  const [quantity, setQuantity] = useState(product.min);

  const updateState = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('productId');
    }
    setExpanded(!expanded);
  };
  //we may need it once the huawei feature is done
  // useEffect(() => {
  //   setProduct({ ...product, quantity });
  // }, [quantity]);

  // useEffect(() => {
  //   getData();
  // }, [currency.title]);

  return (
    <div className='bg-white shadow mt-4 rounded-md overflow-hidden'>
      {expanded && (
        <div className='flex flex-col md:flex-row'>
          <div className='shrink-0 md:w-2/3 p-4'>
            <h3 className='text-lg font-semibold'>{product.productName}</h3>
            <p className='mt-2'>{product.description}</p>
          </div>
          <div className='md:hidden flex flex-wrap items-center justify-between'>
            {product.otherAttributes.map(({ attributeName, attributeVal }) => (
              <div className='px-4 py-2' key={attributeName}>
                <div className='text-gray-400 font-semibold text-sm'>{attributeName}</div>
                <div className='text-gray-800 font-semibold text-sm'>{attributeVal}</div>
              </div>
            ))}
          </div>
          <div className='shrink-0 md:w-1/3 p-4'>
            <div className='bg-blue-100 shadow rounded-md p-4'>
              <div className='flex justify-between'>
                <h3 className='text-xl font-semibold'>Recommended</h3>
                <button
                  className='bg-white rounded-full w-8 h-8 grid place-items-center'
                  onClick={() => {
                    updateState();
                  }}
                >
                  <ChevronDownIcon className='w-6 h-6' />
                </button>
              </div>
              <div className='py-1'>
                {product.specifications.map(({ attributeName, attributeVal }) => (
                  <div key={attributeName}>
                    {attributeVal !== null && (
                      <div className='text-gray-700 text-xs' key={attributeName}>
                        {attributeName} : {attributeVal}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className='text-gray-700 flex flex-col md:flex-row'>
                Quantity : <QuantityButton className='ml-1' quantity={quantity} change={setQuantity} min={product.min} max={product.max} />
              </div>
              <div className='text-right text-2xl font-medium mt-3'>
                {product.currencySymbol} {product.price}/month
              </div>
              <div className='text-right text-sm'>
                {product.currencySymbol} {product.price}
                {product.discount ? '(' + product.discount + '% off)' : null}
              </div>
              <div className='text-right text-sm shrink-0 line-clamp-2'>{product.priceDisclaimer}</div>
              <div className='text-right mt-4'>
                <AddToCart
                  {...{ product, quantity }}
                  className={`px-4 py-2 ${isDisabled ? 'bg-[#BFBFBF] text-[#474747]' : 'bg-skyBlue text-white'} rounded-md  font-semibold`}
                  isDisabled={isDisabled}
                >
                  Buy Now
                </AddToCart>
                {/* <button
                  onClick={() => {
                    router.push(`/products/product/${subcategory}/config/${product.productId}`);
                  }}
                  className={`px-4 py-2 ${
                    isDisabled ? 'bg-[#BFBFBF] text-[#474747] cursor-not-allowed' : 'bg-skyBlue text-white'
                  } rounded-md  font-semibold`}
                  disabled={isDisabled}
                >
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {!expanded && (
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='shrink-0 px-3 py-1'>
            <h3 className='text-lg font-semibold'>{product.productName}</h3>
          </div>
          {/* <div className='flex pr-6 pt-4 w-52 bg-blue-100 justify-end'>
            <button
              className='w-8 h-8 rounded-full grid place-items-center ml-2'
              onClick={() => {
                updateState();
              }}
            >
              <ChevronRightIcon className='w-6 h-6' />
            </button>
          </div> */}
        </div>
      )}
      <div className='flex flex-wrap items-center justify-between'>
        {product.otherAttributes.map(({ attributeName, attributeVal }) => (
          <div className={`${expanded && 'hidden'} md:block p-3`} key={attributeName}>
            <div className='text-gray-400 font-semibold text-sm'>{attributeName}</div>
            <div className='text-gray-800 font-semibold text-sm'>{attributeVal}</div>
          </div>
        ))}

        {!expanded && (
          <div className='p-3 w-full flex items-center bg-blue-100 justify-between'>
            <div>
              <div className='font-semibold'>
                {product.currencySymbol} {product.price}/month
              </div>
              {product.discount ? <div>{product.discount}% off</div> : null}
            </div>
            <button
              className='w-8 h-8 rounded-full grid place-items-center ml-2'
              onClick={() => {
                updateState();
              }}
            >
              <ChevronRightIcon className='w-6 h-6' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrebuildOfferItem;
