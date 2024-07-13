/*
 * File: country-lists.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 12:58 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Table from 'components/atoms/Table';

import api from 'api';
import Modal from 'components/atoms/Modal';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const CountryLists = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [columns, setColumns] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.COUNTRY_LIST);

  const pageNext = () => {
    fetchCountries(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchCountries(pageNo - 1);
  };

  const fetchCountries = async (page: number) => {
    try {
      const array = [];
      const response = await api.country.getAll(page, pageSize, 'nameEn', 'asc');

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

        response.content?.map((data) => {
          const rowData = {
            col0: data.id,
            col1: data.name.en,
            col2: (
              <div className='relative w-10 h-6 border'>
                <Image src={data.flag ?? '/no-image.png'} layout='fill' objectFit='cover' />
              </div>
            ),
            col3: data.countryCode,
          };
          if (permission?.update) {
            rowData['col4'] = (
              <div className='flex items-center w-full mx-auto'>
                <div className='relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none'>
                  <input
                    onChange={(e) => updateCountry(data.id, e.target.checked, response.pageNo)}
                    name={data.name}
                    type='checkbox'
                    className='absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox'
                    checked={data.active}
                  />
                  <label htmlFor={data.name} className='block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label' />
                </div>
              </div>
            );
          }
          array.push(rowData);
        });
        setCountryList(array);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCountryList([]);
      }
    } catch (error) {
      setCountryList([]);
      console.error(`🚀 ${error.name} in '/countryListManagement/page' at line:112`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const updateCountry = async (id: number, active: boolean, currentPageNo: number) => {
    try {
      const country = {
        id,
        isActive: active,
      };
      await api.country.put(country);
      fetchCountries(currentPageNo);
    } catch (error) {
      console.error(`🚀 ${error.name} in '/countryListManagement/page' at line:123`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCountries(pageNo);
  }, []);

  useEffect(() => {
    const columns = [
      {
        Header: 'Country name EN',
        accessor: 'col1',
      },
      {
        Header: 'Country flag',
        accessor: 'col2',
      },
      {
        Header: 'Country code',
        accessor: 'col3',
      },
    ];

    if (permission?.update) {
      columns.push({ Header: 'isActive', accessor: 'col4' });
    }

    setColumns(columns);
  }, [permission]);

  return (
    <>
      <SEO title='Country List' desc='Country List Description' />
      <Privilege permission={permission?.read || permission?.update} message='view or update country list'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div>
          <div className='flex items-center justify-between mb-10'>
            <h1 className='text-lg font-bold text-gray-800'>Country list management</h1>
          </div>
          <div>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={countryList}
              offset={pageNo}
              totalResults={totalResults}
              pageNext={pageNext}
              pagePrevious={pagePrevious}
              currentResultsCount={currentResultsCount}
            />
          </div>
        </div>
      </Privilege>
    </>
  );
};

CountryLists.auth = true;
export default CountryLists;
CountryLists.Layout = MainLayout;
CountryLists.routeSettings = routing.cmsCountryListMGMT;
