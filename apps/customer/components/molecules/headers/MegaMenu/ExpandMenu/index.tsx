/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 25 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import useCurrency from '@/components/hooks/useCurrency';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import { ROUTE_PRODUCTS, ROUTE_PRODUCT_OVERVIEW } from 'constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useStore from 'store';
import { createRoute } from 'utils/routes';

const ExpandedMenu = () => {
  const { locale } = useRouter();
  const [megaMenuLink, setMegaMenuLink] = useState([]);
  const { setExpandMenu } = useStore((state) => ({
    expand: state.expand,
    setExpandMenu: state.setExpandMenu,
  }));
  const currency = useCurrency();
  const currencyTitle = currency.title;

  useEffect(() => {
    const getData = async () => {
      const res = await api.products.getProducts('subCategory', locale);
      setExpandMenu(res);
      let menuItems = res.map(({ category, categoryId, sortOrder, subCategory }) => ({
        sectionTitle: 'Products',
        sortOrder,
        heading: category,
        id: categoryId.toString(),
        path: {
          pathname: ROUTE_PRODUCTS,
          query: { category: categoryId },
        },
        subHeadings: subCategory
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(({ subCategoryId, sortOrder, productSubCategoryTitle }) => ({
            id: subCategoryId,
            sortOrder,
            subHeading: productSubCategoryTitle,
            path: createRoute({
              basePath: ROUTE_PRODUCT_OVERVIEW,
              params: [{ key: 'productId', element: subCategoryId }],
            }),
          })),
      }));

      let response;

      menuItems = await Promise.all(
        menuItems.map(async ({ sectionTitle, heading, id, path, subHeadings, sortOrder }) => ({
          sectionTitle,
          heading,
          id,
          path,
          sortOrder,
          subHeadings: await Promise.all(
            subHeadings.map(async (subItem) => {
              response = await api.products.getPrebuildOffers(subItem.id, locale, currencyTitle, false);
              if (response.length > 0) {
                return subItem;
              } else {
                return null;
              }
            }),
          ),
        })),
      );

      menuItems = menuItems.map(({ sectionTitle, heading, id, path, subHeadings, sortOrder }) => ({
        sectionTitle,
        heading,
        id,
        path,
        sortOrder,
        subHeadings: subHeadings.filter(function (element) {
          return element !== null;
        }),
      }));

      menuItems.sort((a, b) => a.sortOrder - b.sortOrder);

      setMegaMenuLink(menuItems);
    };
    getData();
  }, [locale, setExpandMenu]);

  return (
    <div className='mega-menu p-9 bg-white text-mtgreen border shadow'>
      <div className='container w-full flex flex-wrap justify-between'>
        {megaMenuLink.map(({ id, heading, subHeadings, path }) => (
          <ul className='w-1/3 pb-3 space-y-1' key={id}>
            <li className='flex items-center'>
              <Link href={path}>
                <a className='font-semibold text-xl'>{subHeadings?.length !== 0 && heading}</a>
              </Link>
            </li>
            {subHeadings?.map(({ id, subHeading, path }) => (
              <li className='font-normal' key={id}>
                <Link href={path}>
                  <a>{subHeading}</a>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <Link href={ROUTE_PRODUCTS}>
        <a className='inline-flex items-center pt-3 font-normal text-[#00AEEF]'>
          All Products
          <ChevronRightIcon className='w-5 h-5' />
        </a>
      </Link>
    </div>
  );
};

export default ExpandedMenu;
