/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 April 2022 02:03 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';

import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

import Forms from 'components/atoms/Forms';

import { formFieldData, permissions, schema } from '../../../constants/staticData/formFields/roleFormField';
import PermissionTable from 'components/atoms/PermissionTable';
import api from 'api';
import { Permissions } from 'constants/types/permissionTypes';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../constants';

function NewRole() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [initialValue, setInitialValue] = useState({
    roleId: '',
    title: '',
    description: '',
    active: false,
  });
  const permission: RolePermission = usePermission(Permission.ROLE_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      checkedPermissions.forEach((permissions) => {
        permissions['permissionId'] = Permissions[permissions.code];
      });

      const formValues = {
        title: values.title,
        description: values.description,
        isActive: values.active,
        rolePermissions: checkedPermissions,
      };

      await api.roles.post(formValues);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully created!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/roles/new' at line:62`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchPermissions = async () => {
    const data = await api.admin_permissions.getAll();
    console.log(data);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <>
      <SEO title='Roles Management' desc='Roles Management Description' />
      <Privilege permission={permission?.create} message='create role'>
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
            {/* Extra Form Fields */}
            <div className='pt-10 mt-10 border-t'>
              <PermissionTable
                dataList={permissions}
                checkedPermissions={checkedPermissions}
                setCheckedPermissions={setCheckedPermissions}
                roleId={null}
              />
            </div>
          </div>
        </div>
      </Privilege>
    </>
  );
}

NewRole.auth = true;
export default NewRole;

NewRole.Layout = MainLayout;
NewRole.routeSettings = routing.mgmtRole;
