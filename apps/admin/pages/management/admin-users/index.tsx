/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 22 November 2022, 17:26
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

import routing from '../../../constants/routingConfig';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import { DeleteIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_ADMIN_USER_MGMT, ROUTE_ADMIN_USER_MGMT_CREATE } from 'constants/routes';

import api from 'api';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Table from 'components/atoms/Table';
import { useRouter } from 'next/router';
import Badge from '@mtcloud/ui/atoms/Badge';

const columns = [
  {
    Header: 'User Name',
    accessor: 'col1',
  },
  {
    Header: 'User Id',
    accessor: 'col2',
  },
  {
    Header: 'Domain Name',
    accessor: 'col3',
  },
  {
    Header: 'User Type',
    accessor: 'col4',
  },
  {
    Header: 'IDP Id',
    accessor: 'col5',
  },
  {
    Header: 'VDC Id',
    accessor: 'col6',
  },
  {
    Header: 'VDC Name',
    accessor: 'col7',
  },
  {
    Header: 'isActive',
    accessor: 'col8',
  },
  {
    accessor: 'col9',
  },
];

const AdminUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState();
  const permission: RolePermission = usePermission(Permission.USER_MANAGEMENT);

  const router = useRouter();

  const fetchUsers = async (page) => {
    if (!permission?.read) return;
    setIsLoading(true);

    try {
      const array = [];
      const response = await api.users.getAdminData();
      if (response) {
        setTotalResults(response.length);
        response.map((data) => {
          const rowData = {
            col1: data.username,
            col2: data.userId,
            col3: data.domainName,
            col4: data.userType,
            col5: data.ipdId,
            col6: data.vdcId,
            col7: data.vdcName,
            col8: (
              <div className='w-full mx-auto'>
                <Badge value={data.isActive ? 'Active' : 'Not Active'} type={data.isActive ? 'success' : 'danger'} />
              </div>
            ),
            col9: (
              <button
                onClick={() => {
                  deleteConfirmation();
                  setAdminId(data.id);
                }}
              >
                <DeleteIcon className='w-5 h-5 mx-auto' />
              </button>
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

  const deleteConfirmation = () => {
    setIsDelete(true);
    setModalDeleteContent({
      heading: 'Delete!',
      content: 'Are you sure you want to permanently delete this item?',
    });
  };

  const deleteItem = async () => {
    try {
      const response = await api.users.adminDataDelete(adminId);
      if (response.status === 200) {
        closeDeleteModal();
        fetchUsers(offset);
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/socialMediaRedirection/[socialId]' at line:103`, error.message);
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

  function closeDeleteModal() {
    setIsDelete(false);
  }

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
        <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      {isDelete && (
        <Modal isOpen={isDelete} closeModal={closeDeleteModal} heading={modalDeleteContent?.heading} content={modalDeleteContent?.content}>
          <div className='flex justify-center gap-3 pt-3'>
            <button className='mt-confirmationBtnNo' onClick={closeDeleteModal}>
              No
            </button>
            <button className='mt-confirmationBtnYes' onClick={() => deleteItem()}>
              Yes
            </button>
          </div>
        </Modal>
      )}
      <div className='flex items-center justify-between px-4 py-4'>
        <div>
          <Privilege permission={permission?.read || permission?.create} message={false}>
            <p className='text-lg font-semibold text-gray-800'>Admin Users Management</p>
          </Privilege>
          <Privilege permission={permission?.read} message={false}>
            <p className='mt-1 text-sm'>
              Total Users: <span className='font-bold'>{totalResults}</span>{' '}
            </p>
          </Privilege>
        </div>
        <Privilege permission={permission?.create} message={false}>
          <Link href={ROUTE_ADMIN_USER_MGMT_CREATE}>
            <a className='px-3 py-2 m-0 text-sm font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
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
            currentResultsCount={totalResults}
          />
        </div>
      </Privilege>
    </>
  );
};

AdminUsers.auth = true;
export default AdminUsers;

AdminUsers.Layout = MainLayout;
AdminUsers.routeSettings = routing.mgmtAdminUser;
