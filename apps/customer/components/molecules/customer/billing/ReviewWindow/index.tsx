/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import is from 'date-fns/esm/locale/is/index.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const Star = ({
  filled = false,
  index,
  setStars,
  setValid,
  isValid,
  disabled,
}: {
  filled?: boolean;
  setStars?: React.Dispatch<React.SetStateAction<number>>;
  setValid?: React.Dispatch<React.SetStateAction<boolean>>;
  index?: number;
  isValid?: boolean;
  disabled?: boolean;
}) => (
  <button
    onClick={() => {
      setStars(index);
      setValid(true);
    }}
    disabled={disabled}
  >
    <svg width='38' height='36' viewBox='0 0 38 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M25.609 21.4934L25.3112 21.7065L25.4245 22.0547L29.0538 33.2081L19.391 26.2934L19.0987 26.0842L18.8073 26.2947L9.24968 33.1974L12.8755 22.0547L12.9888 21.7065L12.691 21.4934L3.05791 14.6H15H15.3631L15.4755 14.2547L19.1057 3.09831L22.8257 14.2581L22.9396 14.6H23.3H35.2421L25.609 21.4934Z'
        fill={filled ? '#F0C721' : '#D8D8D8'}
        stroke={'#F89711'}
      />
    </svg>
  </button>
);

const ratingSet = Array(5)
  .fill(0)
  .map((i, j) => i + j + 1);

const ReviewWindow = ({
  setIsOpen,
  productId,
  productName,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  productName: string;
}) => {
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setStatus] = useState(false);
  const [isValid, setValid] = useState(false);
  const { locale } = useRouter();

  useEffect(() => {
    setStatus(true);
    const getData = async () => {
      try {
        const res = await api.billing.getProductRatings(productId, locale);
        res?.map(({ rate, description, userId }) => {
          setStars(rate);
          setDescription(description);
          setUser(userId);
        });
        setStatus(false);
      } catch (error) {
        setStatus(false);
        toast.error('Something went wrong');
      }
    };
    getData();
  }, [locale, productId]);

  const saveReview = async () => {
    setStatus(true);
    const mgs = (document.getElementById('feedback') as HTMLInputElement).value;
    if (stars === 0) {
      setValid(false);
      setStatus(false);
    } else {
      setValid(true);
    }
    const payload = {
      productId: productId,
      rate: stars,
      description: mgs,
    };
    if (stars !== 0) {
      const response = await api.billing.saveProductRatings(payload);
      if (response) {
        setStatus(false);
        setIsOpen(false);
        location.reload();
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <div className='p-4'>
      {loading ? (
        <div className='grid place-items-center'>
          <Oval color='#00AEEF' width={80} secondaryColor='#bae6fd' height={80} />
        </div>
      ) : (
        <div>
          {user === null ? (
            <div>
              <h2 className='text-xl font-semibold p-3 text-center text-mtBlue'>
                Tell Us Your Experience
              </h2>
              <p className='text-lg p-3 text-mtBlue'>Rate {productName}</p>
            </div>
          ) : (
            <p className='text-lg p-3 text-mtBlue'>{productName} Rating</p>
          )}

          {user === null ? (
            <div>
              <div className='px-3 pt-3 pb-8 flex items-center justify-center space-x-3'>
                {ratingSet.map((i) => (
                  <Star
                    filled={i <= stars}
                    key={i}
                    setStars={setStars}
                    setValid={setValid}
                    index={i}
                    isValid={isValid}
                    disabled={false}
                  />
                ))}
              </div>
              <label htmlFor='feedback' className='text-mtBlue'>
                Your Feedback
              </label>
              <textarea
                rows={3}
                className='w-full bg-mtBlue/10 focus:ring-mtBlue/75 focus:border-mtBlue/75 border-mtBlue/25 rounded-md p-3'
                name='feedback'
                id='feedback'
                placeholder='Please let us know what we can do to improve your experience...'
              />
              <button
                className={`w-full px-4 py-2 ${
                  isValid ? 'bg-skyBlue text-white' : 'bg-[#BFBFBF] text-[#474747]'
                } rounded-md mt-3`}
                disabled={!isValid}
                onClick={() => saveReview()}
              >
                Submit Your Feedback
              </button>
            </div>
          ) : (
            <div>
              <div className='px-3 pt-3 pb-8 flex items-center justify-center space-x-3'>
                {ratingSet.map((i) => (
                  <Star filled={i <= stars} key={i} disabled index={i} isValid={isValid} />
                ))}
              </div>
              {description.length !== 0 && (
                <div className=' text-[#757575] text-base'>{'"' + description + '"'}</div>
              )}

              <div className='flex place-content-center'>
                <button
                  className='w-24 px-4 py-2 bg-skyBlue text-white rounded-md mt-3'
                  onClick={() => setIsOpen(false)}
                >
                  close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewWindow;
