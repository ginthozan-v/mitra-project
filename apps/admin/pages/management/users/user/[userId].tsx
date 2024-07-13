/*
 * File: [userId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 06 April 2022 03:23 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from '../../../../constants/staticData/formFields/userFormFields';
import api from 'api';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import { NETWORK_STATUS_CODES } from '../../../../constants';

function EditUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const router = useRouter();
  const { userId } = router.query;
  const permission: RolePermission = usePermission(Permission.USER_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        id: values.id,
        ldapId: values.employeeId,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        designation: values.designation,
        isActive: values.active,
        roles: [
          {
            id: values.role,
          },
        ],
      };
      await api.users.put(formValues);
      fetchUser(userId);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/roles/role/[roleId]' at line:67`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: `Error ${error?.response?.status}!`,
          content: error?.response?.data?.message,
        });
      }
    }
  };

  const fetchUser = async (id) => {
    const response = await api.users.getOne(id);

    if (response) {
      setInitialValue({
        id: response.id,
        employeeId: response.ldapId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        designation: response.designation,
        active: response.isActive,
        role: [{ value: response.roles[0]?.id, label: response.roles[0]?.title }],
      });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  function closeModal() {
    setIsOpen(false);
  }

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
      <Privilege permission={permission?.read} message='view the user'>
        <div className='max-w-2xl'>
          {initialValue ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                initialValue={initialValue}
                handleSubmit={handleSubmit}
                formsSchema={schema}
                buttonValue='Update'
                savePermission={permission?.update}
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
}

EditUser.auth = true;
export default EditUser;

EditUser.Layout = MainLayout;
EditUser.routeSettings = routing.mgmtUser;
