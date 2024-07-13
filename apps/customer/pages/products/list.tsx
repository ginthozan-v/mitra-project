/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * File: list.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 8 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Link from 'next/link';
import MobileProductSelect from 'components/molecules/MobileSelect';
import { ROUTE_PRODUCTS, ROUTE_PRODUCT_OVERVIEW } from 'constants/routes';
import { SearchData } from '@mtcloud/utils/validation/types';
import { useRouter } from 'next/router';
import SearchBar from 'components/molecules/SearchBar';
import api from 'api';
import { createRoute } from 'utils/routes';
import { Oval } from 'react-loader-spinner';
import { useEffect, useState, useRef } from 'react';
import useStore from 'store';
import { getAuth } from 'utils/auth';
import useCurrency from '@/components/hooks/useCurrency';

export async function getServerSideProps({ query, locale }) {
  const category = query.category;
  const res = await api.products.getProducts('subCategory', locale, true);
  const menuItems = res.map(({ category, categoryId, sortOrder, subCategory }) => ({
    category,
    sortOrder,
    categoryId: categoryId.toString(),
    subCategory,
  }));

  const allKeywords = [];
  const categoryData = res.map(({ keywords, category, sortOrder, categoryId, subCategory }) => {
    keywords && allKeywords.push(keywords);
    return {
      keywords,
      category,
      sortOrder,
      categoryId: categoryId.toString(),
      subCategory: subCategory
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(({ subCategoryId, sortOrder, productSubCategoryTitle, productSubCategoryShortDescription }) => ({
          subCategoryId,
          sortOrder,
          productSubCategoryTitle,
          productSubCategoryShortDescription,
        })),
    };
  });

  const seoData = {
    title: 'Products',
    keywords: allKeywords.join(','),
    desc: '',
  };

  return {
    props: {
      category: category || '',
      seoData,
      categoryData,
      menuItems,
    },
  };
}

const PathHighlight = (url, productsUrl, urlQuery, pathQuery) => {
  if (pathQuery !== undefined) {
    if (urlQuery['category'] === pathQuery['category']) {
      return true;
    }
    return false;
  } else if (url === productsUrl) {
    return true;
  }
};
const List = ({ menuItems, category, seoData, categoryData }) => {
  const router = useRouter();
  const [listData, setListData] = useState<any>([]);
  const { search, setSearch } = useStore((state) => ({
    search: state.search,
    setSearch: state.setSearch,
  }));
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  const [menu, setMenu] = useState<any>([]);
  const [seo, setSeo] = useState(seoData);
  const currency = useCurrency();
  const currencyTitle = currency.title;

  useEffect(() => {
    setLoading(true);
    getData();
  }, [category]);

  const getData = async () => {
    let response;
    categoryData = await Promise.all(
      categoryData.map(async ({ category, categoryId, subCategory, sortOrder }) => ({
        category,
        categoryId,
        sortOrder,
        subCategory: await Promise.all(
          subCategory.map(async (subItem) => {
            response = await api.products.getPrebuildOffers(subItem.subCategoryId, router.locale, currencyTitle, false, false);

            if (response.length > 0) {
              return subItem;
            } else {
              return null;
            }
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
      if (categoryData.length > 0) {
        seoData.keywords = categoryData[0].keywords;
        seoData.title = categoryData[0].category;
      }
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
    categoryData = categoryData.map(({ category, categoryId, subCategory, sortOrder }) => ({
      category,
      categoryId,
      sortOrder,
      subCategory: subCategory.filter(function (element) {
        return element !== null;
      }),
    }));

    categoryData.sort((a, b) => a.sortOrder - b.sortOrder);
    setListData(categoryData);
    setMenu(menuItems);
    setSeo(seoData);
    setLoading(false);
  };

  useEffect(() => {
    if (!search) {
      setLoading(true);
      setListData(listData);
      setLoading(false);
    }
  }, [listData, search, router.locale]);

  const menuItemsList = [
    { title: 'All Products', id: 'all', path: ROUTE_PRODUCTS },
    ...menu?.map(({ category, categoryId }) => ({
      title: category,
      id: categoryId,
      path: {
        pathname: ROUTE_PRODUCTS,
        query: { category: categoryId },
      },
    })),
  ];
  const searchData = async (data: SearchData) => {
    setLoading(true);
    setSearch(true);

    router.push(`${ROUTE_PRODUCTS}`).then(async (_) => {
      const res = await api.products.searchProducts(data.searchKey, router.locale);
      setListData(res);
      setLoading(false);
    });
    setSearch(false);
  };

  const selectedItem = menuItemsList.find(({ id }) => id === category || (id === 'all' && !category));

  return (
    <>
      <SEO title={seo.title} keywords={seo.keywords} desc={seo.desc} />
      <ItemDescription title='Products' type='TitleBanner' image='/products.jpg' />
      <SearchBar searchData={searchData} width='w-80' visibility='block md:hidden py-4 flex justify-center' name='searchKeyProducts' />

      <MobileProductSelect list={menuItemsList} select={selectedItem} />

      <div className='content-wrapper flex'>
        <div className='w-64 hidden md:block shrink-0'>
          <div className='mb-3'>
            <SearchBar searchData={searchData} width='w-56' visibility='mt-2' name='searchKeyProducts' />
          </div>

          {menuItemsList?.map(({ title, id, path }) => (
            <div
              key={id}
              className={`w-full text-left text-lg font-semibold py-2 ${
                PathHighlight(router.asPath, ROUTE_PRODUCTS, router.query, path.query) ? 'text-skyBlue' : 'text-mtBlue'
              }`}
            >
              <Link href={path}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>

        <div className='flex-grow'>
          <div className='-mt-8'>
            {listData?.map(({ categoryId, category, subCategory }) => (
              <div key={categoryId} className='mt-8'>
                <h3 className='py-2 section-heading'>{subCategory?.length !== 0 && category}</h3>
                <div className='flex flex-wrap -m-2'>
                  {subCategory?.length !== 0 &&
                    subCategory?.map(({ subCategoryId, productSubCategoryTitle, productSubCategoryShortDescription }) => (
                      <div className='p-2 w-full md:w-1/2 xl:w-1/3' key={subCategoryId}>
                        <Link
                          href={createRoute({
                            basePath: ROUTE_PRODUCT_OVERVIEW,
                            params: [
                              {
                                key: 'productId',
                                element: subCategoryId,
                              },
                            ],
                          })}
                        >
                          <a className='bg-white hover:bg-mtBlue/10 shadow rounded-md p-3 block h-full'>
                            <div className='flex justify-between items-center'>
                              <h4 className='font-medium text-gray-800'>{productSubCategoryTitle}</h4>
                            </div>
                            <p className='line-clamp-3 text-sm text-gray-500 mt-2'>{productSubCategoryShortDescription}</p>
                          </a>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

List.Layout = MainLayout;
