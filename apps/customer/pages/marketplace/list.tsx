/*
 * File: list.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thursday, 14 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import MarketplaceTopNav from 'components/molecules/marketplace/MarketplaceTopNav';
import ItemCard from 'components/molecules/marketplace/ItemCard';
import MobileProductSelect from 'components/molecules/MobileSelect';
import api from 'api';
import { ROUTE_MARKETPLACE } from 'constants/routes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useStore from 'store';
import useCurrency from '@/components/hooks/useCurrency';

export async function getServerSideProps({ query, locale }) {
  const category = query.category;

  const res = await api.marketplace.getMarketplaceProducts(locale, true);

  const menuItems = res.map(({ category, categoryId, subCategory, sortOrder }) => ({
    category,
    subCategory,
    categoryId: categoryId.toString(),
    sortOrder,
  }));

  const allKeywords = [];
  const categoryData = res.map(({ keywords, category, categoryId, subCategory, sortOrder }) => {
    keywords && allKeywords.push(keywords);
    return {
      category,
      categoryId: categoryId.toString(),
      sortOrder,
      path: {
        pathname: ROUTE_MARKETPLACE,
        query: { category: categoryId },
      },
      subCategory: subCategory.map(
        ({ subCategoryId, sortOrder, productCatalogId, isExternalLink, productSubCategoryTitle, productSubCategoryShortDescription, banner }) => ({
          subCategoryId,
          sortOrder,
          productCatalogId,
          isExternalLink,
          productSubCategoryTitle,
          productSubCategoryShortDescription,
          banner,
        }),
      ),
    };
  });

  const seo = {
    title: 'Marketplace',
    keywords: allKeywords.join(','),
    desc: '',
  };

  return {
    props: {
      category: category || '',
      categoryData,
      menuItems,
      seo,
    },
  };
}

const MarketplaceHome = ({ category, categoryData, menuItems, seo }) => {
  const { locale } = useRouter();
  const [data, setData] = useState<any>([]);
  const [menu, setMenu] = useState<any>([]);
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  const currency = useCurrency();
  const currencyTitle = currency.title;

  useEffect(() => {
    setLoading(true);
    getData();
  }, [category]);

  const getData = async () => {
    let response;
    categoryData = await Promise.all(
      categoryData.map(async ({ category, categoryId, subCategory, sortOrder, path }) => ({
        category,
        categoryId,
        sortOrder,
        path,
        subCategory: await Promise.all(
          subCategory.map(async (subItem) => {
            if (!subItem.isExternalLink) {
              response = await api.products.getPrebuildOffers(subItem.productCatalogId, locale, currencyTitle, true, false);

              if (response.length > 0) {
                return subItem;
              } else {
                return null;
              }
            }
            return subItem;
          }),
        ),
      })),
    );
    menuItems.sort((a, b) => a.sortOrder - b.sortOrder);

    menuItems = menuItems.filter((item) =>
      categoryData.map((i) => {
        if (item.category === i.category && item.subCategory !== i.subCategory) {
          item.subCategory = i.subCategory;
        }
      }),
    );

    if (category) {
      categoryData = categoryData.filter((i) => `${i.categoryId}` === category);
    }

    menuItems = menuItems.map(({ category, subCategory, categoryId, sortOrder }) => ({
      category,
      categoryId,
      sortOrder,
      subCategory: subCategory.filter(function (element) {
        return element !== null;
      }),
    }));

    menuItems = menuItems.filter((item) => item.subCategory.length > 0);

    categoryData.sort((a, b) => a.sortOrder - b.sortOrder);
    setData(categoryData);
    setMenu(menuItems);
    setLoading(false);
  };

  const menuItemsList = [
    { title: 'All', id: 'all', path: ROUTE_MARKETPLACE },
    ...menu?.map(({ category, categoryId }) => ({
      title: category,
      id: categoryId,
      path: {
        pathname: ROUTE_MARKETPLACE,
        query: { category: categoryId },
      },
    })),
  ];

  const selectedItem = menuItemsList.find(({ id }) => id === category || (id === 'all' && !category));

  return (
    <>
      <SEO title={seo.title} keywords={seo.keywords} desc={seo.desc} />
      <ItemDescription title='Marketplace' type='TitleBanner' image='/marketplace.jpg' />
      <MobileProductSelect list={menuItemsList} select={selectedItem} />
      <div className='content-wrapper'>
        <MarketplaceTopNav menuItems={menuItemsList} />

        {data?.map(({ category, categoryId, subCategory, path }) => (
          <div key={categoryId}>
            {subCategory.length === 0 ? null : <ItemCard heading={category} items={subCategory.slice(0, 4)} key={categoryId} path={path} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default MarketplaceHome;

MarketplaceHome.Layout = MainLayout;
