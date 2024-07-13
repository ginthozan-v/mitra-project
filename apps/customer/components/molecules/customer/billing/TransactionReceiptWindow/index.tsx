/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 08 August 2022 3:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAuth } from 'utils/auth';
import { Oval } from 'react-loader-spinner';
import { NETWORK_STATUS_CODES } from '@/constants';

const TransactionReceiptWindow = ({ closeModal, receiptNumber }: { closeModal: () => void; receiptNumber: string }) => {
  const [topData, setTopData] = useState([]);
  const [trData, setTrData] = useState([]);
  const { locale } = useRouter();
  const [isMount, setMount] = useState(false);
  const [loading, setStatus] = useState(true);

  useEffect(() => {
    setMount(true);
    setStatus(true);

    const getData = async () => {
      try {
        const res = await api.billing.getTransactionReceipt(receiptNumber, locale);

        let topDataResponse;
        if (typeof res !== 'string') {
          if (getAuth().userType === 'individual') {
            topDataResponse = res.map(({ name, email }) => ({
              Name: name,
              Email: email,
            }));
          } else {
            topDataResponse = res.map(({ name, email, brn, companyName }) => ({
              Name: name,
              Email: email,
              BRN: brn,
              CompanyName: companyName,
            }));
          }

          const trDataResponse = res.map(
            ({ transactionDate, receiptNumber, billNumber, paymentMethod, transactionType, currency, transactionAmount }) => ({
              TransactionDate: new Date(transactionDate).toLocaleDateString(),
              ReceiptNumber: receiptNumber,
              BillNumber: billNumber,
              PaymentMethod: paymentMethod,
              TransactionType: transactionType,
              Currency: currency,
              TransactionAmount: transactionAmount,
            }),
          );

          setTopData(Object.entries(topDataResponse[0]));
          setTrData(Object.entries(trDataResponse[0]));
        } else {
          if (!NETWORK_STATUS_CODES.includes(res)) {
            toast.error('Something went wrong');
          }
        }

        setStatus(false);
      } catch (error) {
        setStatus(false);
        toast.error('Something went wrong');
      }
    };
    getData();
  }, [locale, receiptNumber]);

  const downloadReceipt = async () => {
    setStatus(true);
    const response = await api.billing.downloadTransactionReceipt(receiptNumber);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', receiptNumber + '.pdf');
    document.body.appendChild(link);
    link.click();

    closeModal();
    setStatus(false);
  };

  const longString = (val: string) => {
    let text = '';

    while (val.length > 30) {
      text += val.substring(0, 30) + ' ';
      val = val.substring(30);
    }
    text += val.substring(0, 30);

    return text;
  };
  return (
    isMount && (
      <div>
        {loading ? (
          <div className='grid pt-4 place-items-center'>
            <Oval color='#00AEEF' width={80} secondaryColor='#bae6fd' height={80} />
          </div>
        ) : (
          <div>
            <div>
              <h3 className='md:text-3xl text-2xl text-center font-medium leading-6 text-gray-900 pt-6'>Transaction Receipt</h3>
              <div className='flex items-center justify-between px-3'>
                <Image src='/billing.png' width='100%' height='50px' objectFit='contain' alt='' />
                <Image src='/mt-logo.png' width='100%' height='50px' objectFit='contain' alt='' />
              </div>
              <div className='flex justify-center w-full py-3 rounded'>
                <table className='text-gray-600 text-sm'>
                  <tbody>
                    {topData.map(([key, val, index]) => (
                      <tr className='' key={key}>
                        <td className='px-3'>{index > 1 ? key.split(/(?=[A-Z])/)[0] + ' ' + key.split(/(?=[A-Z])/)[1] : key}</td>
                        <td className='pl-2 max-w-[150px]'>{longString(val)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-center w-full px-5 py-4 rounded'>
                <table className='text-gray-600 text-sm'>
                  <tbody>
                    {trData.map(([key, val]) => (
                      <tr className='border-b border-b-[#F2F8FB] text-sm' key={key}>
                        <td className='pl-6 pr-12 py-2 font-semibold'>
                          {key.split(/(?=[A-Z])/).length > 1
                            ? key.split(/(?=[A-Z])/)[0] + ' ' + key.split(/(?=[A-Z])/)[1]
                            : key.split(/(?=[A-Z])/)[0]}
                        </td>
                        <td className='pl-16'>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex justify-center py-2'>
              <button className='w-32 h-10 px-4 py-2 bg-skyBlue text-white rounded-md' onClick={downloadReceipt}>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default TransactionReceiptWindow;
