/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 10 May 2022 10:02 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import Modal from 'components/atoms/Modal';
import api from 'api';
import Loader from 'components/molecules/Loader';
import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Image from 'next/image';
import { NETWORK_STATUS_CODES } from '../../../../constants';
import envConfig from '@/config';

const formFieldData = [
  {
    label: 'Logo (small)',
    name: 'smallLogo',
    fieldType: 'image',
    accept: '.jpg,.jpeg,.png',
    placeholder: 'Logo (small)',
  },
  {
    label: 'Logo (medium)',
    name: 'mediumLogo',
    fieldType: 'image',
    accept: '.jpg,.jpeg,.png',
    placeholder: 'Logo (medium)',
  },
  {
    label: 'Logo (large)',
    name: 'largeLogo',
    fieldType: 'image',
    accept: '.jpg,.jpeg,.png',
    placeholder: 'Logo (large)',
  },
];

const schema = {
  smallLogo: Yup.string().required('This field cannot be empty'),
  mediumLogo: Yup.string().required('This field cannot be empty'),
  largeLogo: Yup.string().required('This field cannot be empty'),
};

const Logo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [imageData, setImageData] = useState({
    smallLogo: '',
    mediumLogo: '',
    largeLogo: '',
  });
  const permission: RolePermission = usePermission(Permission.LOGO);

  const handleSubmit = async (values) => {
    try {
      let sLogo;
      let mLogo;
      let lLogo;
      if (typeof values.smallLogo !== 'string') {
        sLogo = await api.image.post({
          file: values.smallLogo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'smallLogo',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        sLogo = values.smallLogo;
      }
      if (typeof values.mediumLogo !== 'string') {
        mLogo = await api.image.post({
          file: values.mediumLogo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'mediumLogo',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        mLogo = values.mediumLogo;
      }
      if (typeof values.largeLogo !== 'string') {
        lLogo = await api.image.post({
          file: values.largeLogo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'largeLogo',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        lLogo = values.largeLogo;
      }

      const data = {
        smallLogo: sLogo,
        mediumLogo: mLogo,
        largeLogo: lLogo,
      };
      setImageData(data);
      const formValues = {
        contentType: 'json',
        data: JSON.stringify(data),
        id: fetchedData.id,
        position: fetchedData.position,
        status: fetchedData.status,
      };
      await api.generic_content.put(formValues);
      fetchLogoDetail();
      setIsOpen(true);
      if (sLogo === null || mLogo === null || lLogo === null) {
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      } else {
        setModalContent({
          heading: 'Success!',
          content: 'Successfully updated!',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/contactUs/ContactUsManagement/new' at line:52`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchLogoDetail = async () => {
    try {
      let logo = await api.generic_content.get('HOME_LOGO');
      logo = logo.content;
      if (logo) {
        setFetchedData(logo);
        const formfield = JSON.parse(logo.data);
        setInitialValue(formfield);
      } else {
        setInitialValue({
          smallLogo: '',
          mediumLogo: '',
          largeLogo: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/logo/new' at line:105`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
      setInitialValue({
        smallLogo: '',
        mediumLogo: '',
        largeLogo: '',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchLogoDetail();
  }, []);

  return (
    <>
      <SEO title='Logo' desc='Logo Description' />
      <Privilege permission={permission?.read} message='view logos'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Company logo management</h1>
          {initialValue ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                buttonValue='Update'
                savePermission={permission?.update}
              />

              {/* Image section */}
              {(initialValue.smallLogo || initialValue.mediumLogo || initialValue.largeLogo) && (
                <div className='flex items-start gap-4 mt-8 border-t pt-5'>
                  {initialValue?.smallLogo && (
                    <div className='p-2 border rounded'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.smallLogo}`}
                        width={100}
                        height={100}
                      />
                      <p className='mt-1 text-center'>Logo Small</p>
                    </div>
                  )}
                  {initialValue?.mediumLogo && (
                    <div className='p-2 border rounded'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.mediumLogo}`}
                        width={100}
                        height={100}
                      />
                      <p className='mt-1 text-center'>Logo Medium</p>
                    </div>
                  )}
                  {initialValue?.largeLogo && (
                    <div className='p-2 border rounded'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.largeLogo}`}
                        width={100}
                        height={100}
                      />
                      <p className='mt-1 text-center'>Logo Large</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
};

Logo.auth = true;
export default Logo;

Logo.Layout = MainLayout;
Logo.routeSettings = routing.cmsHomeLogo;
