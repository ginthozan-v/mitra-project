/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 20 October 2022, 15:15
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import routing from 'constants/routingConfig';
import usePermission from 'hooks/usePermission';
import { RolePermission, Permission } from 'models';
import Privilege from 'components/atoms/privilege';
import SEO from 'components/utils/SEO';
import React, { useEffect, useState } from 'react';
import Button from '@mtcloud/ui/atoms/Button';
import api from 'api';
import CreatableInput from '@mtcloud/ui/atoms/CreatableInput';
import { Form, Formik } from 'formik';
import Modal from 'components/atoms/Modal';
import { NETWORK_STATUS_CODES } from '../../../constants';
interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

function TechSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.TECH_SUPPORT);
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState<readonly Option[]>([]);
  const [keyState, setKeyState] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const updateValue = (val) => {
    setValue(val);
  };

  const getData = async () => {
    const res = await api.techSupport.getAll();

    const items = [];
    const test = [];
    res.map((emails) => {
      const list = [];
      const emailList = emails.emailRecievers.split(',');
      emailList.splice(-1);
      emailList.map((i) => {
        list.push(createOption(i));
      });
      items.push({ id: emails.id, systemEmailtype: emails.systemEmailtype, emailRecievers: list });
      test.push({ [emails.systemEmailtype]: list });
    });
    setData(test);
  };

  const registerEmails = async (values) => {
    try {
      let emailList = '';

      value.map((val) => (emailList += val.value + ','));

      const payload = { emailRecievers: emailList };
      const res = await api.techSupport.put(Object.keys(values)[0].toString(), payload);

      if (res) {
        location.reload();
      }
    } catch (error) {
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: `Error!`,
          content: error?.response?.data?.message,
        });
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const onCreateOption = (val: boolean) => {
    setKeyState(val);
  };

  return (
    <>
      <SEO title='Tech Support' desc='Tech Support Description' />
      <Privilege permission={permission?.read} message='view Tech Support'>
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
          {data.map((x) => (
            <Formik
              initialValues={{ [`${Object.keys(x)}`]: '' }}
              onSubmit={(values) => {
                registerEmails(values);
              }}
              key={`${Object.keys(x)}`}
            >
              {({ handleSubmit, touched }) => (
                <Form className='w-full px-10 py-4 bg-white rounded shadow' onSubmit={handleSubmit}>
                  <label
                    className={`font-normal tracking-wide self-stretch ${
                      !keyState && touched[`${Object.keys(x)}`] ? 'text-[#EA0000]' : 'text-[#535353]'
                    } text-sm my-1`}
                  >
                    {`${Object.keys(x)}`.charAt(0).toUpperCase() + `${Object.keys(x)}`.slice(1).toLocaleLowerCase()} Email List
                  </label>

                  <CreatableInput
                    name={`${Object.keys(x)}`}
                    options={Object.values(x)}
                    updateValue={updateValue}
                    keyState={keyState}
                    onCreateOption={onCreateOption}
                  />
                  {!keyState && touched[`${Object.keys(x)}`] && (
                    <div className={`text-[#EA0000] text-xs font-normal order-2 self-stretch`}>Please enter a valid email address.</div>
                  )}
                  <Privilege permission={permission?.update} message={false}>
                    <Button
                      colorScheme='skyBlue'
                      textStyleScheme='semiboldSmall'
                      textColorScheme='white'
                      sizeScheme='sm'
                      borderScheme='rounded'
                      type='submit'
                      onClick={() => ''}
                    >
                      Add
                    </Button>
                  </Privilege>
                </Form>
              )}
            </Formik>
          ))}
        </div>
      </Privilege>
    </>
  );
}
TechSupport.auth = true;
export default TechSupport;
TechSupport.Layout = MainLayout;
TechSupport.routeSettings = routing.settingsTech;
