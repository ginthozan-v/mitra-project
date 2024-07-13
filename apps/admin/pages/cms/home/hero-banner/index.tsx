/*
 * File: hero-banners.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 May 2022 11:35 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import Badge from '@mtcloud/ui/atoms/Badge';
import { EyeIcon } from '@mtcloud/ui/atoms/icons';
import Table from 'components/atoms/Table';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { ROUTE_CMS_HOME_HERO_BANNER_EDIT, ROUTE_CMS_HOME_HERO_BANNER_NEW } from 'constants/routes';

import api from 'api';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [bannerList, setBannerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.HERO_BANNER);

  const columns = [
    {
      Header: 'Banner title',
      accessor: 'col1',
    },
    {
      Header: 'Schedule start-end',
      accessor: 'col2',
    },
    {
      Header: 'Priority',
      accessor: 'col3',
    },
    {
      Header: 'isActive',
      accessor: 'col4',
    },
    {
      Header: '',
      accessor: 'col5',
    },
  ];

  const pageNext = () => {
    fetchHeroBanners(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchHeroBanners(pageNo - 1);
  };

  const fetchHeroBanners = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await api.hero_banner.getAll(page, pageSize);

      const array = [];
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

        response.content.map((data) => {
          const rowData = {
            col1: data.title,
            col2: `${moment.utc(data.startDateTime).local().format('YYYY-MM-DD HH:mm')} - 
            ${moment.utc(data.endDateTime).local().format('YYYY-MM-DD HH:mm')}`,
            col3: data.priority,
            col4: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.active ? 'Yes' : 'No'}
                  type={data.active ? 'success' : 'danger'}
                />
              </div>
            ),
            col5: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_CMS_HOME_HERO_BANNER_EDIT}/${data.id}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });

        setBannerList(array);
        setIsLoading(false);
      } else {
        setBannerList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/heroBanner/page' at line:133`, error.message);
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
    fetchHeroBanners(pageNo);
  }, []);

  return (
    <>
      <SEO title='Hero Banner' desc='Hero Banner Description' />
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
            <h1 className='text-lg font-bold text-gray-800'>Hero banner</h1>
          </Privilege>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_HOME_HERO_BANNER_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                create new +
              </a>
            </Link>
          </Privilege>
        </div>

        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view list of banners'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={bannerList}
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

Index.auth = true;
export default Index;
Index.Layout = MainLayout;
Index.routeSettings = routing.cmsHomeHeroBanner;
