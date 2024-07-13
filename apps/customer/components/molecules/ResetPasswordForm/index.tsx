/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 11:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import Label from '@mtcloud/ui/atoms/Label';
import PasswordField from '@mtcloud/ui/atoms/PasswordField';
import FacesRenderer from '@mtcloud/ui/atoms/PasswordField/FacesRenderer';
import { Errors, ResetPasswordData } from '@mtcloud/utils/validation/types';
import validatorFunctions from '@mtcloud/utils/validation/ResetPasswordVal';
import { Form, Formik } from 'formik';
import React from 'react';
import api from '@/api';
import toast from 'react-hot-toast';
import useStore from '@/store';
import { NETWORK_STATUS_CODES } from '@/constants';

const ResetPasswordForm = () => {
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  const saveUserData = async (data: ResetPasswordData) => {
    const payload = {
      newPassword: data.password,
      oldPassword: data.oldPassword,
    };
    try {
      const res = await api.register.resetPassword(payload);
      if (typeof res !== 'string' && res) {
        location.reload();
      } else if (!NETWORK_STATUS_CODES.includes(res)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
      }}
      validate={(values: ResetPasswordData) => {
        return validatorFunctions.reduce((acc, func) => {
          let errorData = func(values);
          if (errorData.password && errorData.password.length === 0) {
            errorData = {};
          }
          return { ...acc, ...errorData };
        }, {});
      }}
      onSubmit={(values, actions) => {
        setLoading(true);
        saveUserData(values);
        actions.resetForm({
          values: {
            oldPassword: '',
            password: '',
          },
        });
      }}
    >
      {({ handleSubmit, errors, touched, isSubmitting, isValidating, values }) => (
        <Form className='mx-auto w-80 md:w-96' onSubmit={handleSubmit}>
          <Label name='oldPassword' errors={errors.oldPassword} touched={touched.oldPassword}>
            Old Password *
          </Label>
          <PasswordField name='oldPassword' errors={errors.oldPassword} touched={touched.oldPassword} />
          <ErrorMgs name='oldPassword' />
          <Label name='password' errors={errors.password} touched={touched.password}>
            New Password *
          </Label>
          <PasswordField name='password' errors={errors.password} touched={touched.password} />
          <span className='text-[#EA0000] text-xs font-normal order-2 self-stretch'>
            {errors.password?.length && touched.password ? 'Password didn’t meet expected criteria' : ''}
          </span>
          <div className='bg-[#F4F4F4] shadow-md rounded text-[#535353] font-normal h-24 md:h-28 p-1 md:p-3 text-sm'>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.specialCharacter} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-3'>Must contain at least one special charactor</span>
            </p>

            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.uppercase} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-3'>Must contain at least one uppercase letter</span>
            </p>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.digit} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-3'>Must contain at least one number</span>
            </p>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.size} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-3'>Must contain at least eight characters long</span>
            </p>
          </div>

          <div className='flex place-content-center py-2'>
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
              disabled={isSubmitting || isValidating}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
