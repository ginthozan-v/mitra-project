/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 18 April 2022 11:48 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';
import * as Yup from 'yup';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import Forms from 'components/atoms/Forms';

import Modal from 'components/atoms/Modal';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import api from 'api';
import { NETWORK_STATUS_CODES } from '../../constants';

function NewEnterpriceUser() {
  const [initialValue, setInitialValue] = useState({
    companyName: '',
    bussinessRegNo: '',
    companyAddress: '',
    country: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    designationInCompany: '',
    email: '',
    countryCode: '',
    mobileNumber: '',
    additionalFirstName: '',
    additionalLastName: '',
    additionalIdNumber: '',
    additionalDesignationInCompany: '',
    additionalEmail: '',
    additionalCountryCode: '',
    additionalMobileNumber: '',
    identyDoc: '',
    businessRegCertificate: '',
    proofOfAddress: '',
    certificateOfIncorporation: '',
    vatCertification: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.CREATE_ENTERPRISE_USER);

  const checkAvailabilityEmail = async (email: string) => {
    try {
      const response = await api.verify_user.verifyEmail(encodeURIComponent(email));
      return response;
    } catch (error) {
      console.log('email availability error:', error);
    }
  };

  const formFieldData = [
    {
      sectionTitle: 'Company Details',
      fields: [
        {
          label: 'Company Name',
          name: 'companyName',
          fieldType: 'text',
          placeholder: 'Enter your company name',
        },
        {
          label: 'Business Registration Number',
          name: 'bussinessRegNo',
          fieldType: 'text',
          placeholder: 'Enter your registration number',
        },
        {
          label: 'Company Address',
          name: 'companyAddress',
          fieldType: 'text',
          placeholder: 'Enter your address',
        },
        {
          label: 'Country',
          name: 'country',
          fieldType: 'country-select',
        },
      ],
    },
    {
      sectionTitle: 'Administrator Contact Details',
      fields: [
        {
          label: 'First Name',
          name: 'firstName',
          fieldType: 'text',
          placeholder: 'Enter your first name',
        },
        {
          label: 'Last Name',
          name: 'lastName',
          fieldType: 'text',
          placeholder: 'Enter your last name',
        },
        {
          label: 'ID Number/ Passport',
          name: 'idNumber',
          fieldType: 'text',
          placeholder: 'Enter your id or passport number',
        },
        {
          label: 'Designation in Company',
          name: 'designationInCompany',
          fieldType: 'dropdown',
          options: [
            { value: '1', label: 'System Administrator or O&M Engineer' },
            { value: '2', label: 'System Architect' },
            { value: '3', label: 'Software Engineer' },
            { value: '4', label: 'Deputy Technical Director or IT Director' },
            { value: '5', label: 'Technical Director or IT Director' },
            { value: '6', label: 'CTO' },
            { value: '7', label: 'CEO' },
          ],
        },
        {
          label: 'Country Code',
          name: 'countryCode',
          fieldType: 'country-code',
        },
        {
          label: 'Mobile Number',
          name: 'mobileNumber',
          fieldType: 'text',
          placeholder: 'Enter your mobile number',
          info: 'for verification purposes',
        },
        {
          label: 'Email',
          name: 'email',
          fieldType: 'email',
          placeholder: 'Enter your email address',
          info: 'for future communication and billing purposes',
        },
      ],
    },
    {
      additional: true,
      sectionTitle: 'Additional Contact Details',
      fields: [
        {
          label: 'First Name',
          name: 'additionalFirstName',
          fieldType: 'text',
          placeholder: 'Enter your first name',
        },
        {
          label: 'Last Name',
          name: 'additionalLastName',
          fieldType: 'text',
          placeholder: 'Enter your last name',
        },
        {
          label: 'ID Number/ Passport',
          name: 'additionalIdNumber',
          fieldType: 'text',
          placeholder: 'Enter your id or passport number',
        },
        {
          label: 'Designation in Company',
          name: 'additionalDesignationInCompany',
          fieldType: 'dropdown',
          options: [
            { value: '1', label: 'System Administrator or O&M Engineer' },
            { value: '2', label: 'System Architect' },
            { value: '3', label: 'Software Engineer' },
            { value: '4', label: 'Deputy Technical Director or IT Director' },
            { value: '5', label: 'Technical Director or IT Director' },
            { value: '6', label: 'CTO' },
            { value: '7', label: 'CEO' },
          ],
        },
        {
          label: 'Country Code',
          name: 'additionalCountryCode',
          fieldType: 'country-code',
        },
        {
          label: 'Mobile Number',
          name: 'additionalMobileNumber',
          fieldType: 'text',
          placeholder: 'Enter your mobile number',
          info: 'for verification purposes',
        },
        {
          label: 'Email',
          name: 'additionalEmail',
          fieldType: 'email',
          placeholder: 'Enter your email address',
          info: 'for future communication and billing purposes',
        },
      ],
    },
    {
      sectionTitle: 'Upload Your Documents',
      fields: [
        {
          label: 'ID Card/ Passport ',
          name: 'identyDoc',
          fieldType: 'image-file',
          accept: '.pdf,.png,.jpg,.jpeg',
          maxSize: '7', // in mb
        },
        {
          label: 'Business Registration Certificate ',
          name: 'businessRegCertificate',
          fieldType: 'image-file',
          accept: '.pdf,.png,.jpg,.jpeg',
          maxSize: '7', // in mb
        },
        {
          label: 'Proof of Address',
          name: 'proofOfAddress',
          fieldType: 'image-file',
          accept: '.pdf,.png,.jpg,.jpeg',
          maxSize: '7', // in mb
        },
        {
          label: 'Certificate of Incorporation',
          name: 'certificateOfIncorporation',
          fieldType: 'image-file',
          accept: '.pdf,.png,.jpg,.jpeg',
          maxSize: '7', // in mb
        },
        {
          label: 'VAT Certificate',
          name: 'vatCertification',
          fieldType: 'image-file',
          accept: '.pdf,.png,.jpg,.jpeg',
          maxSize: '7', // in mb
        },
      ],
    },
  ];

  const schema = {
    companyName: Yup.string().max(50, 'Too Long.').required('This field cannot be empty.'),
    bussinessRegNo: Yup.string().max(50, 'Too Long.').required('This field cannot be empty.'),
    companyAddress: Yup.string().max(250, 'Too Long.').required('This field cannot be empty.'),
    country: Yup.string().required('This field cannot be empty.'),
    firstName: Yup.string().max(250, 'Too Long.').required('This field cannot be empty.'),
    lastName: Yup.string().max(250, 'Too Long.').required('This field cannot be empty.'),
    idNumber: Yup.string().max(50, 'Too Long.').required('This field cannot be empty.'),
    designationInCompany: Yup.string().required('This field cannot be empty.'),
    email: Yup.string()
      .email('Please enter a valid email address.')
      .notOneOf([Yup.ref('additionalEmail'), null], 'Please use a unique email!')
      .required('This field cannot be empty.')
      .test('email', 'This email is already in use.', async (value) => {
        if (value !== '' && value !== undefined) {
          const res = await checkAvailabilityEmail(value);
          return !res;
        }
      }),
    countryCode: Yup.string().required('This field cannot be empty.'),
    mobileNumber: Yup.string()
      .max(15, 'Too Long.')
      .matches(new RegExp('^[0-9]{0,15}$'), 'Please enter a valid mobile number.')
      .required('This field cannot be empty.'),
    additionalFirstName: Yup.string().max(250, 'Too Long.'),
    additionalLastName: Yup.string().max(250, 'Too Long.'),
    additionalIdNumber: Yup.string().max(50, 'Too Long.'),
    additionalDesignationInCompany: Yup.string(),
    additionalEmail: Yup.string()
      .email('Please enter a valid email address.')
      .notOneOf([Yup.ref('email')], 'Please use a unique email!')
      .test('additionalEmail', 'This email is already in use.', async (value) => {
        if (value !== '') {
          const res = await checkAvailabilityEmail(value);
          return !res;
        }
      }),
    additionalCountryCode: Yup.string(),
    additionalMobileNumber: Yup.string().max(15, 'Too Long.').matches(new RegExp('^[0-9]{0,15}$'), 'Please enter a valid mobile number.'),
    identyDoc: Yup.string().required('This field cannot be empty.'),
    businessRegCertificate: Yup.string().required('This field cannot be empty.'),
    proofOfAddress: Yup.string().required('This field cannot be empty.'),
    certificateOfIncorporation: Yup.string(),
    vatCertification: Yup.string(),
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (values) => {
    try {
      const obj = {
        companyName: values.companyName,
        businessRegistrationNumber: values.bussinessRegNo,
        companyAddress: values.companyAddress,
        country: values.country,
        firstName: values.firstName,
        lastName: values.lastName,
        identifier: values.idNumber,
        designation: values.designationInCompany,
        email: values.email,
        mobileNumber: values.countryCode + values.mobileNumber,
        additionalFirstName: values.additionalFirstName,
        additionalLastName: values.additionalLastName,
        additionalIdentifier: values.additionalIdNumber,
        additionalDesignation: values.additionalDesignationInCompany,
        additionalEmail: values.additionalEmail,
        additionalMobileNo: values.additionalCountryCode + values.additionalMobileNumber,
        identifierDoc: values.identyDoc,
        brnDocument: values.businessRegCertificate,
        proofOfAddress: values.proofOfAddress,
        inCorpCertificate: values.certificateOfIncorporation,
        vatCertificate: values.vatCertification,
        userType: 'enterprise',
        userSubType: 'on-behalf',
      };

      await api.enterprise_user.post(obj);

      // success message
      setIsOpen(true);
      setModalContent({
        heading: 'Thank you for your application!',
        content: 'One of our representatives will review your request and activate your account.',
      });
    } catch (error) {
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  return (
    <>
      <SEO title='Create Enterprise Users' desc='Create Enterprise Users Description' />
      <Privilege permission={permission?.read} message='view enterprise users'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Done
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          {initialValue && (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                buttonValue='Submit'
                savePermission={permission?.create}
              />
            </div>
          )}
        </div>
      </Privilege>
    </>
  );
}
NewEnterpriceUser.auth = true;
export default NewEnterpriceUser;
NewEnterpriceUser.Layout = MainLayout;
NewEnterpriceUser.routeSettings = routing.userCreate;
