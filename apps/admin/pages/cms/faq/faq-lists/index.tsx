/*
 * File: country-lists.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 03:24 pm
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

import { ROUTE_CMS_FAQ_LIST_MGMT_NEW, ROUTE_CMS_FAQ_LIST_MGMT_EDIT } from 'constants/routes';
import api from 'api';
import Modal from 'components/atoms/Modal';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';

const columns = [
  {
    Header: 'FAQ category',
    accessor: 'col1',
  },
  {
    Header: 'Question EN',
    accessor: 'col2',
  },
  {
    Header: 'Question FR',
    accessor: 'col3',
  },
  {
    Header: 'Priority',
    accessor: 'col4',
  },
  {
    Header: 'isActive',
    accessor: 'col5',
  },
  {
    Header: '',
    accessor: 'col6',
  },
];

const FaqLists = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [faqList, setFaqList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.FAQ_LISTS);

  const pageNext = () => {
    fetchFaqs(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchFaqs(pageNo - 1);
  };

  const fetchFaqs = async (page: number) => {
    try {
      setIsLoading(true);
      const array = [];
      const response = await api.faq.getAll(page, pageSize);
      if (response) {
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

        response.content.map((data) => {
          const rowData = {
            col0: data.id,
            col1: data.faqCategory?.titleEn,
            col2: data.question.en,
            col3: data.question.fr,
            col4: data.priority,
            col5: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.active ? 'Yes' : 'No'}
                  type={data.active ? 'success' : 'danger'}
                />
              </div>
            ),
            col6: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_CMS_FAQ_LIST_MGMT_EDIT}/${data.id}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });

        setFaqList(array);
        setIsLoading(false);
      } else {
        setFaqList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqList/page' at line:123`, error.message);
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
    fetchFaqs(pageNo);
  }, []);

  return (
    <>
      <SEO title='Faq' desc='Faq Description' />
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
            <h1 className='text-lg font-bold text-gray-800'>FAQ list</h1>
          </Privilege>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_FAQ_LIST_MGMT_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                create new +
              </a>
            </Link>
          </Privilege>
        </div>
        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view faq list content'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={faqList}
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
FaqLists.auth = true;
export default FaqLists;

FaqLists.Layout = MainLayout;
FaqLists.routeSettings = routing.cmsFaqListMGMT;
