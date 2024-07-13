/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Typography from '@mtcloud/ui/atoms/Typography';
import api from 'api';
import React, { useRef, useState } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';

const Comments = ({ messages }) => {
  messages?.sort(function (a, b) {
    return a.dateTime.localeCompare(b.dateTime);
  });
  return (
    <>
      {messages?.length > 0
        ? messages.map((m, i) => (
            <div key={i} className={`${i > 0 ? 'border-t pt-2 mt-2' : ''} flex flex-col gap-1 py-3 text-left`}>
              {m.message}
              <span className='inline-flex ml-4 text-xs text-left text-gray-400 break-words'>
                by {m.user.firstName} {m.user.lastName} - {moment(m.dateTime).fromNow()}
              </span>
            </div>
          ))
        : ''}
    </>
  );
};

const ViewTicket = ({ ticket, postComment }) => {
  const messageBox = useRef<HTMLTextAreaElement>();
  const ticketKeys = Object.keys(ticket);
  const ticketValues = Object.values(ticket);
  const [isSubmitting, setisSubmitting] = useState(false);

  const postMessage = async () => {
    if (messageBox.current?.value) {
      const body = {
        cpTicketId: ticket.id.content,
        comment: messageBox.current.value.trim(),
      };
      setisSubmitting(true);
      await api.support
        .postMessage(body)
        .then((res) => {
          // postComment({ ...res, content: messageBox.current.value });
          postComment({ ...res, content: messageBox.current.value });
          messageBox.current.value = '';
        })
        .catch((error) => toast.error('Something went wrong, please try again later.'));
      setisSubmitting(false);
    }
  };

  return (
    <div className='w-full lg:m-6'>
      <Typography textColorScheme='charcoal' textTypeScheme='h6'>
        Support Ticket
      </Typography>
      <div className='flex flex-col'>
        {ticketValues.map(
          (
            {
              label,
              content,
            }: {
              label: string;
              content?: string;
            },
            i,
          ) => (
            <div className='grid w-full grid-cols-2 py-2 text-base' key={i}>
              <div className='font-semibold lg:mx-12'>{label}</div>
              <div className='font-normal text-justify break-words lg:mx-6 '>
                {ticketKeys[i] === 'messages' ? <Comments messages={ticket.messages.messages} /> : <p className='w-full'>{content}</p>}
              </div>
            </div>
          ),
        )}
      </div>
      <div className='grid w-full grid-cols-2 my-3'>
        <div className='lg:mx-12 ' />
        <div className='col-span-2 md:mx-2 md:col-span-1 lg:mx-6 '>
          <textarea
            ref={messageBox}
            className='form-control appearance-none static w-full min-h-[75px] bg-[#f2f8fb] border border-solid border-[#003e5c] box-border rounded self-stretch font-normal text-sm text-[#535353] leading-tight focus:outline-none focus:bg-white'
            name='message'
            rows={4}
            placeholder='Add your message here...'
          />
        </div>
      </div>
      <div className='flex flex-row justify-end w-full col-span-2 md:col-span-1'>
        <button className='w-full px-4 py-2 mt-3 text-white rounded-md md:mx-6 md:w-32 bg-skyBlue' onClick={postMessage} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default ViewTicket;
