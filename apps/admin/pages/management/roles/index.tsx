/*
 * File: roles.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 April 2022 01:58 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

import Table from 'components/atoms/Table';
import Badge from '@mtcloud/ui/atoms/Badge';

import api from 'api';

import { EyeIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_ROLE_MGMT_CREATE, ROUTE_ROLE_MGMT_EDIT } from 'constants/routes';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';

const columns = [
  {
    Header: 'Role ID',
    accessor: 'col1',
  },
  {
    Header: 'Role Title',
    accessor: 'col2',
  },
  {
    Header: 'Role Description',
    accessor: 'col3',
  },
  {
    Header: 'isActive',
    accessor: 'col4',
  },
  {
    accessor: 'col5',
  },
];
function Roles() {
  const [roleList, setRoleList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const permission: RolePermission = usePermission(Permission.ROLE_MANAGEMENT);

  const fetchRoles = async (page) => {
    try {
      setIsLoading(true);
      const array = [];
      const response = await api.roles.getAll(page, limit, 'none', '');

      if (response.roles) {
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

        response.roles.map((data) => {
          const rowData = {
            col1: data.id,
            col2: data.title,
            col3: data.description,
            col4: (
              <div className='w-full mx-auto'>
                <Badge value={data.isActive ? 'Active' : 'Not Active'} type={data.isActive ? 'success' : 'danger'} />
              </div>
            ),
            col5: (
              <Link href={`${ROUTE_ROLE_MGMT_EDIT}/${data.id}`}>
                <a>
                  <EyeIcon className='w-5 h-5 mx-auto' />
                </a>
              </Link>
            ),
          };

          array.push(rowData);
        });
        setRoleList(array);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setRoleList([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRoleList([]);
    }
  };

  const pageNext = () => {
    fetchRoles(offset + 1);
  };

  const pagePrevious = () => {
    fetchRoles(offset - 1);
  };

  useEffect(() => {
    fetchRoles(offset);
  }, []);

  return (
    <>
      <SEO title='Roles Management' desc='Roles Management Description' />
      <div>
        <div className='flex items-center justify-between px-4 py-4'>
          <div>
            <Privilege permission={permission?.read || permission?.create} message={false}>
              <p className='text-lg font-semibold text-gray-800'>Roles Management</p>
            </Privilege>
            <Privilege permission={permission?.read} message={false}>
              <p>
                Total Roles: <span className='font-bold'>{totalResults}</span>{' '}
              </p>
            </Privilege>
          </div>
          <Privilege permission={permission?.create} message={false}>
            <Link href={ROUTE_ROLE_MGMT_CREATE}>
              <a className='px-3 py-2 m-0 text-sm font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                {' '}
                create new +
              </a>
            </Link>
          </Privilege>
        </div>

        <div className='mt-2'>
          <Privilege permission={permission?.read} message='view the list of roles'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={roleList}
              offset={offset}
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
}

Roles.auth = true;
export default Roles;

Roles.Layout = MainLayout;
Roles.routeSettings = routing.mgmtRole;
