/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import TextArea from '@mtcloud/ui/atoms/TextArea';
import SelectField from '@mtcloud/ui/atoms/Selector';
// import { SupportTicket } from '@mtcloud/utils/validation/types';
import validatorFunctions from '@mtcloud/utils/validation/Support';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import Typography from '@mtcloud/ui/atoms/Typography';
import CheckBox from '@mtcloud/ui/atoms/CheckBox';
import api from 'api';
import { getAuth } from 'utils/auth';
import { useRouter } from 'next/router';
import { ROUTE_SUPPORT } from 'constants/routes';
import toast from 'react-hot-toast';

const NewTicket = ({ categories }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { push } = useRouter();

  const saveData = async (data, push) => {
    const auth = getAuth();

    if (data && auth && auth.userid) {
      setSubmitting(true);
      data = {
        supportCategory: data.supportCategory,
        supportSubCategory: data.supportSubCategory,
        phoneNumber: data.phoneNumber,
        message: data.description,
        emailRequired: data.emailRequired,
      };

      await api.support
        .createSupportTicket(data)
        .then((res) => {
          if (res.status === 201) {
            push(ROUTE_SUPPORT);
          }
        })
        .catch((error) => {
          toast.error('Something went wrong, please try again later.');
          console.log('create support ticker error', error);
        });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        supportCategory: '',
        supportSubCategory: '',
        phoneNumber: '',
        description: '',
        emailRequired: false,
      }}
      enableReinitialize
      validate={(values) => {
        return validatorFunctions.reduce((acc, func) => {
          const errorData = func(values);
          return { ...acc, ...errorData };
        }, {});
      }}
      onSubmit={(values, actions) => {
        saveData(values, push);
        actions.setSubmitting(true);
        actions.resetForm({
          values: {
            supportCategory: '',
            supportSubCategory: '',
            phoneNumber: '',
            description: '',
            emailRequired: false,
          },
        });
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, errors, touched, isSubmitting, isValidating, setFieldValue }) => (
        <Form className='flex flex-col w-full mx-auto max-w-7xl md:w-96' onSubmit={handleSubmit}>
          <Typography textColorScheme='charcoal' textTypeScheme='h6'>
            Support Form
          </Typography>

          <div className='flex-none md:flex'>
            <div className='flex flex-wrap w-full'>
              <div className='w-full px-3'>
                <Label
                  name='supportCategory'
                  errors={errors['supportCategory']}
                  touched={touched['supportCategory']}
                >
                  Support Category
                </Label>
                <TextField
                  type='text'
                  name='supportCategory'
                  errors={errors['supportCategory']}
                  touched={touched['supportCategory']}
                  component={(props) => (
                    <SelectField
                      {...props}
                      onChange={(value) => {
                        setFieldValue('supportSubCategory', '');
                        setSubCategories(value.subCategories);
                      }}
                    />
                  )}
                  placeholder='Select Category'
                  options={categories}
                />
                <ErrorMgs name='supportCategory' />
              </div>

              <div className='w-full px-3'>
                <Label
                  name='supportSubCategory'
                  errors={errors['supportSubCategory']}
                  touched={touched['supportSubCategory']}
                >
                  Support Sub-Category
                </Label>
                <TextField
                  type='text'
                  name='supportSubCategory'
                  errors={errors['supportSubCategory']}
                  touched={touched['supportSubCategory']}
                  component={SelectField}
                  placeholder='Select Sub-Category'
                  options={subCategories}
                />
                <ErrorMgs name='supportSubCategory' />
              </div>

              <div className='w-full px-3'>
                <Label
                  name='phoneNumber'
                  errors={errors['phoneNumber']}
                  touched={touched['phoneNumber']}
                >
                  Mobile Number
                </Label>
                <TextField
                  type='text'
                  name='phoneNumber'
                  errors={errors['phoneNumber']}
                  touched={touched['phoneNumber']}
                  placeholder='+230 123 123 123'
                />
                <ErrorMgs name='phoneNumber' />
              </div>

              <div className='w-full px-3'>
                <Label
                  name='description'
                  errors={errors['description']}
                  touched={touched['description']}
                >
                  Message
                </Label>
                <TextArea
                  type='text'
                  name='description'
                  errors={errors['description']}
                  touched={touched['description']}
                  placeholder='Type your message here'
                />
                <ErrorMgs name='description' />
              </div>

              <div className='w-full px-3'>
                <span className='inline-block align-middle'>
                  <CheckBox name='emailRequired' />
                </span>

                <label className='ml-2.5 text-[#474747] text-sm font-medium'>
                  Email notification required
                </label>
              </div>
            </div>
          </div>

          <div className='flex py-2 place-content-center'>
            <Button
              colorScheme='skyBlue'
              textStyleScheme='semiboldMedium'
              textColorScheme='white'
              sizeScheme='md'
              borderScheme='rounded'
              onClick={() => {
                ('');
              }}
              type='submit'
              disabled={submitting || isSubmitting || isValidating}
            >
              {submitting ? 'Creating...' : 'Submit'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewTicket;
