/**
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 23 November 2022, 09:44
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState } from 'react';

import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from '../../../constants/staticData/formFields/adminUserFormField';
import api from 'api';
import { getAuth } from 'utils/auth';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import { AsyncPaginate } from 'react-select-async-paginate';
import { NETWORK_STATUS_CODES } from '../../../constants';

function NewAdminUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [users, setUsers] = useState(null);

  const [initialValue, setInitialValue] = useState({
    username: '',
    userId: '',
    password: '',
    domainName: '',
    userType: '',
    idpId: '',
    vdcId: '',
    vdcName: '',
  });

  const userID = getAuth();
  const permission: RolePermission = usePermission(Permission.USER_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        username: values.username,
        userId: values.userId,
        password: values.password,
        domainName: values.domainName,
        userType: values.userType,
        idpId: values.ipdId,
        vdcId: values.vdcId,
        vdcName: values.vdcName,
      };
      await api.users.adminDataPost(formValues);
      setUsers(null);
      setInitialValue({
        username: '',
        userId: '',
        password: '',
        domainName: '',
        userType: '',
        idpId: '',
        vdcId: '',
        vdcName: '',
      });
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully created!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/users/new' at line:87`, error?.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: `Error!`,
          content: error?.response?.data?.message,
        });
      }
    }
  };
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const loadOptions = async (search: string) => {
    await sleep(400);
    const array: any[] = [];
    try {
      const response = await api.users.ldapUserSearch(search);

      if (response.users) {
        response.users.map((data: any) =>
          array.push({
            value: data.ldapId,
            label: data.fullName,
            ...data,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }

    return {
      options: array,
    };
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <SEO title='Users Management' desc='Users Management Description' />
      <Privilege permission={permission?.create} message='create user'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}

        <div className='max-w-2xl'>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
}

NewAdminUser.auth = true;
export default NewAdminUser;

NewAdminUser.Layout = MainLayout;
NewAdminUser.routeSettings = routing.mgmtAdminUser;
