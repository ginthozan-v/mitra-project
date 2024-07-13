/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 April 2022 01:22 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState } from 'react';

import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from '../../../constants/staticData/formFields/userFormFields';
import api from 'api';
import { getAuth } from 'utils/auth';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import { AsyncPaginate } from 'react-select-async-paginate';
import { NETWORK_STATUS_CODES } from '../../../constants';
function NewUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [users, setUsers] = useState(null);

  const [initialValue, setInitialValue] = useState({
    employeeId: '',
    email: '',
    firstName: '',
    lastName: '',
    designation: '',
    active: false,
    role: '',
  });

  const userID = getAuth();
  const permission: RolePermission = usePermission(Permission.USER_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        ldapId: values.employeeId,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        designation: values.designation,
        isActive: values.active,
        // createdBy: userID,
        // lastUpdatedBy: userID,
        roles: [
          {
            id: values.role,
            // createdby: userID,
            // lastUpdatedBy: userID,
          },
        ],
      };
      await api.users.post(formValues);
      setUsers(null);
      setInitialValue({
        employeeId: '',
        email: '',
        firstName: '',
        lastName: '',
        designation: '',
        active: false,
        role: '',
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
            <div className='mb-5'>
              {initialValue && (
                <AsyncPaginate
                  noOptionsMessage={() => 'Invalid search'}
                  placeholder='Search Employee by Employee ID, Email, or Name'
                  className={`appearance-none static border border-solid box-border rounded`}
                  loadOptions={loadOptions}
                  value={users}
                  onChange={(option) => {
                    setUsers(option);
                    setInitialValue({
                      employeeId: option.employeeId ?? '',
                      email: option.email ?? '',
                      firstName: option.firstName ?? '',
                      lastName: option.fullName ?? '',
                      designation: '',
                      active: false,
                      role: '',
                    });
                  }}
                />
              )}
            </div>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
}

NewUser.auth = true;
export default NewUser;

NewUser.Layout = MainLayout;
NewUser.routeSettings = routing.mgmtUser;
