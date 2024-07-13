/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { StErrorIcon, StInfoIcon, StSuccessIcon } from '@mtcloud/ui/atoms/icons';
import Modal from 'components/atoms/Modal';
import { Form, Formik } from 'formik';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import Button from '@mtcloud/ui/atoms/Button';
import { PostPaidData } from '@mtcloud/utils/validation/types';
import validatorFunctions from '@mtcloud/utils/validation/PostPaid';
import api from 'api';
import { getAuth } from 'utils/auth';
import { useRouter } from 'next/router';
import { isValid } from 'date-fns';
import { POSTPAID_STATUS } from '@/models';
import useStore from '@/store';

const postpaidBillingFields = [
  {
    label: 'Fixed Line Number',
    name: 'fixedLine',
  },
  {
    label: 'Billing Account Number',
    name: 'billingAccount',
  },
];

const Postpaid = ({ status: st, label: lbl, message: msg }) => {
  const { push } = useRouter();
  const [firstload, setFirstload] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState(st);
  const [label, setLabel] = useState(lbl);
  const [message, setMessage] = useState(msg);
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setSend] = useState(false);
  const [content, setContent] = useState({
    title: '',
    body: '',
    action: '',
  });
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  useEffect(() => {
    setStatus(st);
    setLabel(lbl);
    setMessage(msg);
    setFirstload(false);
  }, [st, lbl, msg]);

  const auth = getAuth();

  const showAlert = (type = 'success') => {
    if (type === 'error') {
      setContent({
        title: 'Sorry, something went wrong.',
        body: 'Please contact our customer support center.',
        action: '/support/tickets/new',
      });
    } else {
      setContent({
        title: 'Postpaid Billing Verification Sent',
        body: 'Our agents will review your postpaid billing verification and get back to you shortly.',
        action: '',
      });
    }
  };

  const saveUserData = (data?: PostPaidData) => {
    setLoading(true);
    if (data && auth && auth.userid) {
      api.user.settings
        .savePostpaidSettings({
          billingAccountNumber: data.billingAccount,
          fixedLineNumber: data.fixedLine,
        })
        .then((res) => {
          showAlert(res.status === 200 ? 'success' : 'error'); // refactor
        })
        .catch((error) => {
          showAlert('error');
          setEnabled(false);
        })
        .finally(() => {
          setSend(true);
          setLoading(false);
        });
    }
  };
  function closeModal(redirection?: string) {
    setIsOpen(false);
    location.reload();
    setEnabled(false);
    if (redirection) {
      push(redirection);
    }
  }

  const showStatus = (status?, message?) => {
    const getContent = (color, text, label = '', message = '') => {
      return (
        <div className='px-2'>
          <div className={`flex text-${color}`}>
            <StInfoIcon className='w-6 h-6' />
            <span className='text-sm'>{text}</span>
          </div>
          <div className='text-[#3A7FFF] text-sm my-2'>{label}</div>
          {message && <div className={`text-${color} text-sm`}>{message}</div>}
        </div>
      );
    };

    switch (status) {
      case POSTPAID_STATUS.PENDING:
        return getContent('[#F0C721]', 'Verification Pending', label);

      case POSTPAID_STATUS.REJECTED:
        return getContent('red-500', 'Verification Rejected', label, message);

      case POSTPAID_STATUS.VERIFIED:
        return getContent('[#5FBD58]', 'Verified');

      case null:
        return getContent('[#3A7FFF]', 'Verification Required');
      // default:
      //   return getContent('[#3A7FFF]', 'Verification Required');
    }
  };

  const onActionClick = () => {
    setIsOpen(true);
    setEnabled(true);
  };
  return (
    <div className='flex flex-col'>
      <div className='flex items-center min-h-[2rem]'>
        <span className='text-base min-w-[7rem] self-start'>Postpaid Billing</span>
        {firstload ? (
          ''
        ) : (
          <div className='flex'>
            {(!status || status === POSTPAID_STATUS.REJECTED) && (
              <>
                <Switch checked={enabled} onChange={onActionClick} className={`${enabled ? 'bg-[#00AEEF] on' : 'bg-[#A7CDE4]'} switch`}>
                  <span aria-hidden='true' className={`nob`} />
                </Switch>
                {/* {enabled ? showStatus('PENDING') : showStatus()} */}
              </>
            )}
            <div className='self-center'>{showStatus(status, message)}</div>
          </div>
        )}
      </div>
      {/* <div className='px-3.5 py-2 ml-28'>
        {status == POSTPAID_STATUS.PENDING ? <small className='text-blue-600'>{message}</small> : ''}
        {status == POSTPAID_STATUS.REJECTED ? <small className='text-red-500'>{message}</small> : ''}
      </div> */}
      {enabled ? (
        <Modal isOpen={isOpen} closeModal={closeModal} heading='Postpaid Billing Verification Sent'>
          {isSend ? (
            <div className='mx-auto max-w-3xl p-3 flex flex-col items-center'>
              {content.action ? <StErrorIcon className='w-24 h-24' /> : <StSuccessIcon className='w-24 h-24' />}
              <h3 className='text-center px-3 py-2 text-xs font-medium'>{content.body}</h3>
              <Button
                colorScheme='skyBlue'
                textStyleScheme='semiboldMedium'
                textColorScheme='white'
                sizeScheme='md'
                borderScheme='rounded'
                onClick={() => {
                  closeModal(content.action);
                }}
                type='submit'
              >
                {content.action ? 'Support' : 'Done'}
              </Button>
            </div>
          ) : (
            <div>
              <h3 className='text-2xl text-center font-normal p-3'>Postpaid Billing Verification</h3>
              <div className='text-sm text-center px-3 py-2'>
                Please enter your fixed line number or billing account number you would like to bill your postpaid purchases.
              </div>
              <Formik
                initialValues={{
                  fixedLine: '',
                  billingAccount: '',
                }}
                validate={(values: PostPaidData) => {
                  return validatorFunctions.reduce((acc, func) => {
                    const errorData = func(values);
                    return { ...acc, ...errorData };
                  }, {});
                }}
                onSubmit={(values, actions) => {
                  saveUserData(values);
                  actions.setSubmitting(true);
                  actions.resetForm({
                    values: {
                      fixedLine: '',
                      billingAccount: '',
                    },
                  });
                  actions.setSubmitting(false);
                }}
              >
                {({ handleSubmit, errors, touched, dirty, isValid, isSubmitting, isValidating, setFieldValue }) => (
                  <Form className='w-full p-4' onSubmit={handleSubmit}>
                    <div className='flex-none md:flex'>
                      <div className='w-full flex flex-wrap'>
                        {postpaidBillingFields.map(({ name, label }) => {
                          return (
                            <div className='w-full px-3' key={name}>
                              <Label name={name} errors={errors[name]} touched={touched[name]}>
                                {label}
                              </Label>
                              <TextField type='text' name={name} errors={errors[name]} touched={touched[name]} />
                              <ErrorMgs name={name} />
                            </div>
                          );
                        })}
                      </div>
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
                        disabled={!(dirty && isValid)}
                      >
                        Verify
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Postpaid;
