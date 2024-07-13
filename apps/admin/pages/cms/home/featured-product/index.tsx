/*
 * File: feature-products.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 09:57 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Badge from '@mtcloud/ui/atoms/Badge';
import { EyeIcon } from '@mtcloud/ui/atoms/icons';

import Table from 'components/atoms/Table';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import {
  ROUTE_CMS_HOME_FEATURED_PRODUCTS_EDIT,
  ROUTE_CMS_HOME_FEATURED_PRODUCTS_NEW,
} from 'constants/routes';
import Modal from 'components/atoms/Modal';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import api from 'api';
import moment from 'moment';

const FeaturedProducts = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);

  const permission: RolePermission = usePermission(Permission.FEATURED_PRODUCTS);

  const columns = [
    {
      Header: 'Product name',
      accessor: 'col1',
    },
    {
      Header: 'Display name En',
      accessor: 'col2',
    },
    {
      Header: 'Display name FR',
      accessor: 'col3',
    },
    {
      Header: 'Schedule start-end',
      accessor: 'col4',
    },
    {
      Header: 'Priority',
      accessor: 'col5',
    },
    {
      Header: 'isActive',
      accessor: 'col6',
    },
    {
      Header: '',
      accessor: 'col7',
    },
    { Header: '', accessor: 'col8' },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  const fetchProductsData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await api.featured_products.getAll(page, pageSize);
      console.log(response);
      const array = [];
      if (response) {
        setPageNo(response.offset);
        setPageSize(response.limit);
        setTotalResults(response.totalCount);
        setResultsCount(response.resultCount);

        if (page === 0) {
          setCurrentResultsCount(response.resultCount);
        } else if (page > pageNo) {
          setCurrentResultsCount(currentResultsCount + response.resultCount);
        } else {
          setCurrentResultsCount(currentResultsCount - resultsCount);
        }

        response?.featuredProducts?.map((data) => {
          const rowData = {
            col1: data.productName.en,
            col2: data.displayName.en,
            col3: data.displayName.fr,
            col4: `${moment(data.scheduleStart).local().format('YYYY-MM-DD HH:mm')} - ${moment(
              data.scheduleEnd,
            )
              .local()
              .format('YYYY-MM-DD HH:mm')}`,
            col5: data.priority,
            col6: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.isActive ? 'Yes' : 'No'}
                  type={data.isActive ? 'success' : 'danger'}
                />
              </div>
            ),
            col7: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_CMS_HOME_FEATURED_PRODUCTS_EDIT}/${data.id}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });

        setProductList(array);
        setIsLoading(false);
      } else {
        setProductList([]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const pageNext = () => {
    fetchProductsData(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchProductsData(pageNo - 1);
  };

  useEffect(() => {
    fetchProductsData(pageNo);
  }, []);

  return (
    <>
      <SEO title='Featured Products' desc='Featured Products Description' />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          heading={modalContent?.heading}
          content={modalContent?.content}
        >
          <div className='flex justify-center gap-3 pt-3'>
            <button className='mt-confirmationBtnNo' onClick={closeModal}>
              ok
            </button>
          </div>
        </Modal>
      )}
      <div>
        <div className='flex items-center justify-between mb-10'>
          <Privilege permission={permission?.create || permission?.read} message={false}>
            <h1 className='text-lg font-bold text-gray-800'>Featured products</h1>
          </Privilege>

          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_HOME_FEATURED_PRODUCTS_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                create new +
              </a>
            </Link>
          </Privilege>
        </div>
        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view featured products'>
            <Table
              isLoading={isLoading}
              offset={pageNo}
              totalResults={totalResults}
              pageNext={pageNext}
              pagePrevious={pagePrevious}
              currentResultsCount={currentResultsCount}
              columns={columns}
              data={productList}
            />
          </Privilege>
        </div>
      </div>
    </>
  );
};

FeaturedProducts.auth = true;
export default FeaturedProducts;
FeaturedProducts.Layout = MainLayout;
FeaturedProducts.routeSettings = routing.cmsHomeFeaturedProducts;
