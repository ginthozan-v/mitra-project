/*
 * File: [rolesId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 15 April 2022 03:22 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import api from 'api';
import Forms from 'components/atoms/Forms';

import { formFieldData, permissions, schema } from '../../../../constants/staticData/formFields/roleFormField';
import PermissionTable from 'components/atoms/PermissionTable';
import { Permissions } from 'constants/types/permissionTypes';
import { getAuth } from 'utils/auth';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Loader from 'components/molecules/Loader';
import { NETWORK_STATUS_CODES } from '../../../../constants';

function EditRole() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [initialValue, setInitialValue] = useState(null);
  const router = useRouter();
  const { roleId } = router.query;
  const permission: RolePermission = usePermission(Permission.ROLE_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      checkedPermissions.forEach((permissions) => {
        permissions['permissionId'] = Permissions[permissions.code];
      });

      const formValues = {
        id: values.roleId,
        title: values.title,
        description: values.description,
        isActive: values.active,
        createdBy: values.createdBy,
        rolePermissions: checkedPermissions,
      };

      await api.roles.put(formValues);
      fetchRole(roleId);
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
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchRole = async (id) => {
    const response = await api.roles.getOne(id);

    if (response) {
      setInitialValue({
        roleId: response.id,
        title: response.title,
        description: response.description,
        active: response.isActive,
        createdBy: response.createdBy,
        lastUpdatedBy: response.lastUpdatedBy,
      });

      setCheckedPermissions(response.rolePermissions);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (roleId) {
      fetchRole(roleId);
    }
  }, [roleId]);

  return (
    <>
      <SEO title='Roles Management' desc='Roles Management Description' />
      <Privilege permission={permission?.read} message='view role'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        {initialValue ? (
          <div className='max-w-2xl'>
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                buttonValue='Update'
                savePermission={permission?.update}
              />
              {/* Extra Form Fields */}
              <div className='pt-10 mt-10 border-t'>
                <PermissionTable
                  dataList={permissions}
                  checkedPermissions={checkedPermissions}
                  setCheckedPermissions={setCheckedPermissions}
                  roleId={roleId}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='max-w-2xl'>
            <Loader />
          </div>
        )}
      </Privilege>
    </>
  );
}

EditRole.auth = true;
export default EditRole;
EditRole.Layout = MainLayout;
EditRole.routeSettings = routing.mgmtRole;
