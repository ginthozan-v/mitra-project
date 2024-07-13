/*
 * File: latest-news.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 02:51 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Badge from '@mtcloud/ui/atoms/Badge';
import Table from 'components/atoms/Table';

import { EyeIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_CMS_HOME_LATEST_NEWS_EDIT, ROUTE_CMS_HOME_LATEST_NEWS_NEW } from 'constants/routes';

import api from 'api';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';

const LatestNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.LATEST_NEWS);

  const columns = [
    {
      Header: 'Title EN',
      accessor: 'col1',
    },
    {
      Header: 'Title FR',
      accessor: 'col2',
    },
    {
      Header: 'Description EN',
      accessor: 'col3',
    },
    {
      Header: 'Description FR',
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

  const pageNext = () => {
    fetchNews(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchNews(pageNo - 1);
  };

  const fetchNews = async (page: number) => {
    setIsLoading(true);
    const array = [];
    const response = await api.latest_news.getAll(page, pageSize);

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

      response?.content?.map((data) => {
        const rowData = {
          col1: data.title.en,
          col2: data.title.fr,
          col3: data.description.en,
          col4: data.description.fr,
          col5: (
            <div className='w-full mx-auto'>
              <Badge value={data.active ? 'Yes' : 'No'} type={data.active ? 'success' : 'danger'} />
            </div>
          ),
          col6: (
            <div className='flex items-center gap-3'>
              <Link href={`${ROUTE_CMS_HOME_LATEST_NEWS_EDIT}/${data.id}`}>
                <a>
                  <EyeIcon className='w-5 h-5 mx-auto' />
                </a>
              </Link>
            </div>
          ),
        };

        array.push(rowData);
      });

      setNewsList(array);
      setIsLoading(false);
    } else {
      setNewsList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(pageNo);
  }, []);

  return (
    <>
      <SEO title='Latest News' desc='Latest News Description' />
      <div>
        <div className='flex items-center justify-between mb-10'>
          <Privilege permission={permission?.create || permission?.read} message={false}>
            <h1 className='text-lg font-bold text-gray-800'>Latest news management</h1>
          </Privilege>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_HOME_LATEST_NEWS_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                {' '}
                create new +
              </a>
            </Link>
          </Privilege>
        </div>

        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view latest news'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={newsList}
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

LatestNews.auth = true;
export default LatestNews;
LatestNews.Layout = MainLayout;
LatestNews.routeSettings = routing.cmsHomeLatestNews;
