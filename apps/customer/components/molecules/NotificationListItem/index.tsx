/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 15 May 2022 11:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { BinIcon, ChevronDownIcon, ChevronRightIcon, EnvelopeCloseIcon, EnvelopeOpenIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import pageLink from 'constants/notification/links.json';
import moment from 'moment';
import { NETWORK_STATUS_CODES } from '../../../constants';

const colorCode = [
  { code: 'SUCCESS', id: 'success', color: 'border-l-[#5FBD58]' },
  { code: 'ERROR', id: 'error', color: 'border-l-[#EA0000]' },
  { code: 'INFO', id: 'information', color: 'border-l-[#3A7FFF]' },
  { code: 'WARNING', id: 'warning', color: 'border-l-[#F0C721]' },
];

const NotificationListItem = ({
  id,
  heading,
  dateTime,
  description,
  notificationType,
  isRead,
  link,
}: {
  id: number;
  heading: string;
  dateTime: string;
  description: string;
  notificationType: string;
  isRead: boolean;
  link: string;
}) => {
  const [read, setRead] = useState(isRead);

  const color = colorCode.find((e) => e.code === notificationType);

  const mgsDate = new Date(dateTime);

  moment.relativeTimeThreshold('h', 24);
  moment.relativeTimeThreshold('d', 7);
  moment.relativeTimeThreshold('w', 4);
  moment.relativeTimeThreshold('m', 12);
  const t = moment(mgsDate).fromNow();

  let val;
  if (typeof window !== 'undefined') {
    const notiId = localStorage.getItem('notiID');
    const state = localStorage.getItem('isExpand');
    if (id.toString() === notiId && state === 'true') {
      val = true;
    } else {
      val = false;
    }
  }

  const [expanded, setExpanded] = useState(val);
  const updateState = async () => {
    localStorage.removeItem('isExpand');
    setExpanded(!expanded);
    if (!read) {
      const res = await api.notifications.updateStatus(id, 'READ');
      if (res === 'SUCCESS') {
        setRead(!read);
      }
    }
  };

  async function deleteMgs() {
    const res = await api.notifications.deleteNotification(id);
    if (res === 'SUCCESS') {
      location.reload();
    } else if (!NETWORK_STATUS_CODES.includes(res)) {
      toast.error('Something went wrong', { duration: 8000 });
    }
  }

  return (
    <div className={`bg-white rounded-md overflow-hidden shadow mt-4 ${color?.color} border-l-4`}>
      <div className='w-full flex md:flex-row items-center justify-between px-2 py-1 md:px-3 md:py-2 cursor-pointer' onClick={() => updateState()}>
        <div className='pr-2'>{read ? <EnvelopeOpenIcon className='w-7 h-7' /> : <EnvelopeCloseIcon className='w-7 h-7' />}</div>
        <div className='flex flex-col w-full justify-between items-center'>
          <div className='flex flex-col w-full justify-between '>
            <div className='w-full flex flex-row justify-between md:px-3 text-sm'>
              <span className={`text-left ${read ? 'font-normal' : 'font-semibold'}`}>{heading}</span>
              <span className='w-1/2 text-right'>{t}</span>
            </div>

            {!expanded && <span className='text-justify w-full line-clamp-2 font-normal text-sm px-0 md:px-3 py-1'>{description}</span>}
          </div>
        </div>

        <div className='shrink-0 pl-2'>{expanded ? <ChevronDownIcon className='w-6 h-6' /> : <ChevronRightIcon className='w-6 h-6' />}</div>
      </div>
      {expanded && (
        <div className='flex flex-row bg-blue-50 '>
          <div className={`w-3 h-20 ${color?.color}`} />
          <div className='flex flex-col p-3 font-normal w-full'>
            <span className='pl-6 md:pl-9 text-sm text-justify'>
              {description}
              {link?.length !== 1 ? (
                <a href={pageLink[link]?.link} className='text-[#003E5C] pl-3 font-semibold'>
                  {pageLink[link]?.text}
                </a>
              ) : null}
            </span>
            <span className='pl-6 md:pl-9 py-2 font-normal text-xs'>{moment(mgsDate).format('DD/MM/YYYY, hh:mm:ss A').toLocaleString()}</span>
          </div>
          <button className='flex items-center justify-end pr-3' onClick={deleteMgs}>
            <BinIcon className='w-4 h-4 mr-2' />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationListItem;
