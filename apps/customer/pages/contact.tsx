/*
 * File: contact.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import Label from '@mtcloud/ui/atoms/Label';
import SelectField from '@mtcloud/ui/atoms/Selector';
import TextField from '@mtcloud/ui/atoms/TextInput';
import { ContactUsData } from '@mtcloud/utils/validation/types';
import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import SEO from 'components/utils/SEO';
import { Formik, Form } from 'formik';
import validatorFunctions from '@mtcloud/utils/validation/Contact';
import TextArea from '@mtcloud/ui/atoms/TextArea';
import CountrySelect from '@mtcloud/ui/atoms/CountrySelect';
import { useState } from 'react';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import useCountry from 'components/hooks/useCountry';
import { NETWORK_STATUS_CODES } from '@/constants';

export async function getServerSideProps({ locale }) {
  const data = await api.contactUs.getAllContactUs(locale, true);
  const res = await api.contactUs.getCategory(true);

  const category = res.map(({ id, name, subCategory }) => ({
    value: id,
    label: name,
    subCategory: subCategory.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
  }));

  return {
    props: {
      data,
      category,
    },
  };
}

const Contact = ({ data, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({
    value: '',
    label: '',
    subCategory: [{ value: '', label: '' }],
  });
  const [loading, setStatus] = useState(false);
  const countries = useCountry();

  const countryOptions = countries.map(({ countryName, countryCode, flag }) => ({
    value: countryName,
    label: countryName,
    flag: flag,
    code: countryCode,
  }));

  const companyDetailsFields = [
    {
      label: 'Full name*',
      name: 'fullName',
      component: '',
      options: '',
    },
    {
      label: 'Company name',
      name: 'companyName',
      component: '',
      options: '',
    },
    {
      label: 'Job title',
      name: 'jobTitle',
      component: '',
      options: '',
    },
    {
      label: 'Country',
      name: 'countryName',
      component: '',
      options: '',
    },
    {
      label: 'Contact number',
      name: 'contactNumber',
      component: '',
      options: '',
    },
    {
      label: 'Email *',
      name: 'email',
      component: '',
      options: '',
    },
    {
      label: 'Support Category *',
      name: 'supportCategoryId',
      component: SelectField,
      options: category,
    },
    {
      label: 'Support Sub-Category *',
      name: 'supportSubcategoryId',
      component: SelectField,
      options: selected.subCategory,
    },
    {
      label: 'Subject *',
      name: 'subject',
      component: '',
      options: '',
    },
  ];

  function closeModal() {
    location.reload();
    setIsOpen(false);
  }

  return (
    <>
      <SEO title='Contact' desc='Contact Description' />
      <ItemDescription title='Contact Us' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='max-w-5xl mx-auto p-4'>
        <div className='flex flex-col py-6 md:py-12 md:flex-row justify-between '>
          <div className='text-left md:block hidden md:m-3 w-full md:w-1/3'>
            {data?.address?.split(',').map((i, index) => (
              <p key={index}>
                {i}
                {index === data?.address?.split.length - 1 ? '.' : ','}
              </p>
            ))}

            <p className='pt-3'>email: {data?.email}</p>
            <p>tel: {data?.telephone}</p>
            <p>hotline: {data?.hotline}</p>
          </div>
          <div className='border border-md shadow-lg rounded-md md:p-6 w-full md:w-2/3'>
            <Formik
              initialValues={{
                fullName: '',
                companyName: '',
                jobTitle: '',
                countryName: 'Mauritius',
                contactNumber: '',
                email: '',
                supportCategoryId: '',
                supportSubcategoryId: '',
                subject: '',
                message: '',
              }}
              validate={(values: ContactUsData) => {
                category.map((i) => {
                  if (i.value === values.supportCategoryId) {
                    setSelected(i);
                  }
                });

                return validatorFunctions.reduce((acc, func) => {
                  const errorData = func(values);
                  return { ...acc, ...errorData };
                }, {});
              }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                setStatus(true);

                const res = await api.contactUs.saveData(values);

                if (typeof res === 'string' && !NETWORK_STATUS_CODES.includes(res)) {
                  setStatus(false);
                  setIsOpen(false);
                  toast.error('Something went wrong', { duration: 8000 });
                } else if (res) {
                  setTimeout(() => {
                    actions.setSubmitting(false);
                    actions.resetForm({
                      values: {
                        fullName: '',
                        companyName: '',
                        jobTitle: '',
                        countryName: 'Mauritius',
                        contactNumber: '',
                        email: '',
                        supportCategoryId: '',
                        supportSubcategoryId: '',
                        subject: '',
                        message: '',
                      },
                    });
                  }, 1000);
                  setIsOpen(true);
                  setStatus(false);
                }
              }}
            >
              {({ handleSubmit, errors, touched, dirty, isValid }) => (
                <Form className='w-full p-3 md:px-16' onSubmit={handleSubmit}>
                  <div className='flex flex-col'>
                    <div className='w-full flex flex-wrap'>
                      {companyDetailsFields.map(({ name, label, component, options }) => (
                        <div className='w-full px-3' key={name}>
                          <Label name={name} errors={errors[name]} touched={touched[name]}>
                            {label}
                          </Label>
                          {name === 'countryName' ? (
                            <CountrySelect name={name} options={countryOptions} />
                          ) : (
                            <TextField
                              type='text'
                              name={name}
                              errors={errors[name]}
                              touched={touched[name]}
                              component={component}
                              options={options}
                            />
                          )}
                          <ErrorMgs name={name} />
                        </div>
                      ))}
                    </div>

                    <div className='w-full px-3'>
                      <Label name='message'>Message</Label>
                      <TextArea name='message' type='text' placeholder='Message' />
                    </div>
                  </div>

                  <div className='flex w-full place-content-center py-2'>
                    <Button
                      colorScheme='skyBlue'
                      textStyleScheme='semiboldSmall'
                      textColorScheme='white'
                      sizeScheme='sm'
                      borderScheme='rounded'
                      onClick={() => {
                        ('');
                      }}
                      type='submit'
                      disabled={!(isValid && dirty)}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className='text-left p-6 md:hidden w-full'>
            {data?.address?.split(',').map((i, index) => (
              <p key={index}>
                {i}
                {index === data?.address?.split.length - 1 ? '.' : ','}
              </p>
            ))}

            <p className='pt-3'>email: {data?.email}</p>
            <p>tel: {data?.telephone}</p>
            <p>hotline: {data?.hotline}</p>
          </div>
          {loading && !isOpen && (
            <div className='grid place-items-center fixed inset-y-0 inset-x-0 overflow-y-auto bg-slate-100/[0.3] z-[1000]'>
              <Oval
                color='#00aeef'
                secondaryColor='#fff'
                width={70}
                strokeWidth={3}
                wrapperStyle={{ filter: 'drop-shadow(3px 3px 6px rgb(0 0 0 / 0.8))' }}
              />
            </div>
          )}
          {isOpen && (
            <Modal isOpen={isOpen} closeModal={closeModal} heading=''>
              <div className='p-6'>
                <h3 className='text-2xl text-center font-medium leading-6 text-gray-900'>Thank you for contacting us</h3>
                <div className='m-6'>
                  <p className='text-lg text-center'>One of our representatives will get back to you shortly.</p>
                </div>

                <div className='flex justify-center pt-3'>
                  <button className='rounded bg-skyBlue w-44 h-8 text-center' onClick={closeModal}>
                    Done
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;

Contact.Layout = MainLayout;
