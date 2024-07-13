/*
 * File: social-media.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 09:50 am
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
import { ROUTE_CMS_SOCIAL_MEDIA_EDIT, ROUTE_CMS_SOCIAL_MEDIA_NEW } from 'constants/routes';

import Modal from 'components/atoms/Modal';
import api from 'api';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';

const SocialMediaRedirections = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [socialList, setSocialList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const permission: RolePermission = usePermission(Permission.SOCIAL_MEDIA);

  const columns = [
    {
      Header: 'Logo title',
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

  const pageNext = () => {
    fetchSocialMedia(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchSocialMedia(pageNo - 1);
  };

  const fetchSocialMedia = async (page) => {
    try {
      setIsLoading(true);
      const array = [];
      const response = await api.social_media_redirection.getAll(page, pageSize);
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

        response?.content?.map((data) => {
          const rowData = {
            col1: data.logoTitle,
            col2: data.priority,
            col3: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.active ? 'Active' : 'Not Active'}
                  type={data.active ? 'success' : 'danger'}
                />
              </div>
            ),
            col4: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_CMS_SOCIAL_MEDIA_EDIT}/${data.id}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });

        setSocialList(array);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setSocialList([]);
      }
    } catch (error) {
      console.error(
        `🚀 ${error.name} in '/cms/home/socialediaRedirection/page' at line:116`,
        error.message,
      );
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
    fetchSocialMedia(pageNo);
  }, []);

  return (
    <>
      <SEO title='Social Media Redirection' desc='Social Media Redirection Description' />
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
            <h1 className='text-lg font-bold text-gray-800'>Social Media Redirection</h1>
          </Privilege>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_CMS_SOCIAL_MEDIA_NEW}>
              <a className='px-3 py-2 m-0 text-xs font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                {' '}
                create new +
              </a>
            </Link>
          </Privilege>
        </div>

        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view social media links'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={socialList}
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

SocialMediaRedirections.auth = true;
export default SocialMediaRedirections;
SocialMediaRedirections.Layout = MainLayout;
SocialMediaRedirections.routeSettings = routing.cmsSocialMedia;
