/*
 * File: country-lists.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 02:52 pm
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
  ROUTE_CMS_FAQ_CATEGORY_MGMT_NEW,
  ROUTE_CMS_FAQ_CATEGORY_MGMT_EDIT,
} from 'constants/routes';
import api from 'api';
import Modal from 'components/atoms/Modal';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';

const columns = [
  {
    Header: 'FAQ category title',
    accessor: 'col1',
  },
  {
    Header: 'Priority',
    accessor: 'col2',
  },
  {
    Header: 'isActive',
    accessor: 'col3',
  },
  {
    Header: '',
    accessor: 'col4',
  },
];

const FaqCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.FAQ_CATEGORIES);

  const pageNext = () => {
    fetchFaqCategory(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchFaqCategory(pageNo - 1);
  };

  const fetchFaqCategory = async (page) => {
    try {
      const array = [];
      const response = await api.faq_category.getAll(page, pageSize);

      if (response.content) {
        setPageNo(response.pageNo);
        setPageSize(response.pageSize);
        setTotalResults(response.totalResults);
        setResultsCount(response.resultsCount);

        if (page === 0) {
          setCurrentResultsCount(response.resultsCount);
        } else if (page > pageNo) {
          setCurrentResultsCount(currentResultsCount + response.resultsCount);
        } else {
          setCurrentResultsCount(currentResultsCount - resultsCount);
        }

        response.content.forEach((data) => {
          const rowData = {
            col0: data.id,
            col1: data.title.en,
            col2: data.priority,
            col3: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.active ? 'Yes' : 'No'}
                  type={data.active ? 'success' : 'danger'}
                />
              </div>
            ),
            col4: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_CMS_FAQ_CATEGORY_MGMT_EDIT}/${data.id}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });
        setCategoriesList(array);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCategoriesList([]);
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqCategory/page' at line:112`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchFaqCategory(pageNo);
  }, []);

  return (
    <>
      <SEO title='Faq Categories' desc='Faq Categories Description' />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          heading={modalContent?.heading}
          content={modalContent?.content}
        >
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      <div>
        <div className='flex items-center justify-between mb-10'>
          <Privilege permission={permission?.create || permission?.read} message={false}>
            <h1 className='text-lg font-bold text-gray-800'>FAQ categories</h1>
          </Privilege>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_FAQ_CATEGORY_MGMT_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                create new +
              </a>
            </Link>
          </Privilege>
        </div>
        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view faq catefory'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={categoriesList}
              offset={pageNo}
              totalResults={totalResults}
              pageNext={pageNext}
              pagePrevious={pagePrevious}
              currentResultsCount={currentResultsCount}
            />
          </Privilege>
        </div>
      </div>
    </>
  );
};
FaqCategories.auth = true;
export default FaqCategories;

FaqCategories.Layout = MainLayout;
FaqCategories.routeSettings = routing.cmsFaqCategoriesMGMT;
