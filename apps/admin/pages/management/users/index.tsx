/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 April 2022 09:44 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

import routing from 'constants/routingConfig';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import { EyeIcon } from '@mtcloud/ui/atoms/icons';
import Badge from '@mtcloud/ui/atoms/Badge';
import { ROUTE_USER_MGMT_CREATE, ROUTE_USER_MGMT_EDIT } from 'constants/routes';

import api from 'api';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Table from 'components/atoms/Table';

const columns = [
  {
    Header: 'Employee ID',
    accessor: 'col1',
  },
  {
    Header: 'Email',
    accessor: 'col2',
  },
  {
    Header: 'First Name',
    accessor: 'col3',
  },
  {
    Header: 'Last Name',
    accessor: 'col4',
  },
  {
    Header: 'Designation',
    accessor: 'col5',
  },
  {
    Header: 'Role',
    accessor: 'col6',
  },
  {
    Header: 'isActive',
    accessor: 'col7',
  },
  {
    accessor: 'col8',
  },
];

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [usersList, setUsersList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const permission: RolePermission = usePermission(Permission.USER_MANAGEMENT);

  const fetchUsers = async (page) => {
    if (!permission?.read) return;
    setIsLoading(true);

    try {
      const array = [];
      const response = await api.users.getAll(page, limit, 'all');
      if (response.users) {
        setOffset(response.offset);
        setLimit(response.limit);
        setTotalResults(response.totalCount);
        setResultsCount(response.resultCount);

        if (page === 0) {
          setCurrentResultsCount(response.resultCount);
        } else if (page > offset) {
          setCurrentResultsCount(currentResultsCount + response.resultCount);
        } else {
          setCurrentResultsCount(currentResultsCount - resultsCount);
        }

        response.users.map((data) => {
          const rowData = {
            col1: data.ldapId,
            col2: data.email,
            col3: data.firstName,
            col4: data.lastName,
            col5: data.designation,
            col6: data.roles[0]?.title,
            col7: (
              <div className='w-full mx-auto'>
                <Badge
                  value={data.isActive ? 'Active' : 'Not Active'}
                  type={data.isActive ? 'success' : 'danger'}
                />
              </div>
            ),
            col8: (
              <Link href={`${ROUTE_USER_MGMT_EDIT}/${data.id}`}>
                <a>
                  <EyeIcon className='w-5 h-5 mx-auto' />
                </a>
              </Link>
            ),
          };

          array.push(rowData);
        });
        setUsersList(array);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUsersList([]);
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/users' at line:122`, error.message);
      setIsLoading(false);
      setUsersList([]);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const pageNext = () => {
    fetchUsers(offset + 1);
  };

  const pagePrevious = () => {
    fetchUsers(offset - 1);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchUsers(offset);
  }, []);

  return (
    <>
      <SEO title='Users Management' desc='Users Management Description' />
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
      <div className='flex items-center justify-between px-4 py-4'>
        <div>
          <Privilege permission={permission?.read || permission?.create} message={false}>
            <p className='text-lg font-semibold text-gray-800'>Users Management</p>
          </Privilege>
          <Privilege permission={permission?.read} message={false}>
            <p className='mt-1 text-sm'>
              Total Users: <span className='font-bold'>{totalResults}</span>{' '}
            </p>
          </Privilege>
        </div>
        <Privilege permission={permission?.create} message={false}>
          <Link href={ROUTE_USER_MGMT_CREATE}>
            <a className='px-3 py-2 m-0 text-sm font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
              {' '}
              create new +
            </a>
          </Link>
        </Privilege>
      </div>
      <Privilege permission={permission?.read} message='view the list of users'>
        <div className='mt-2'>
          <Table
            isLoading={isLoading}
            columns={columns}
            data={usersList}
            offset={offset}
            totalResults={totalResults}
            pageNext={pageNext}
            pagePrevious={pagePrevious}
            currentResultsCount={currentResultsCount}
          />
        </div>
      </Privilege>
    </>
  );
};

Users.auth = true;
export default Users;

Users.Layout = MainLayout;
Users.routeSettings = routing.mgmtUser;
