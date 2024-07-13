/*
 * File: [ticketId].tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 7 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import ViewTicket from 'components/molecules/support/ViewTicket';
import { useEffect, useState } from 'react';
import api from 'api';
import moment from 'moment';
import AuthGuard from 'components/utils/AuthGuard';

const Ticket = ({ ticketId }) => {
  const [ticket, setTicket] = useState({});

  const getTicketDetail = () => {
    api.support.getTicket(ticketId).then((res) => {
      if (res) {
        setTicket({
          id: { label: 'Support ID', content: res.id },
          dateTime: {
            label: 'Date-Time',
            content: moment(res.dateTime).format('MMM DD, YYYY'),
          },
          supportCategory: { label: 'Support Category', content: res.supportCategory },
          supportSubCategory: {
            label: 'Support Sub-Category',
            content: res.supportSubCategory,
          },
          createdVia: {
            label: 'Created Via (Cloud Portal/ Support Call)',
            content: res.createdVia,
          },
          mobileNumber: { label: 'Phone Number', content: res.phoneNumber },
          status: { label: 'Status', content: res.status },
          messages: {
            label: 'Message(s)',
            messages: res.messages,
          },
        });
      }
    });
  };

  const postComment = (newComment) => {
    const messages = ticket['messages'].messages;
    const newMessage = [
      ...messages,
      {
        id: newComment.commentId,
        message: newComment.comment,
        dateTime: '',
        user: newComment.user,
      },
    ];

    const tickets = ticket;
    tickets['messages'].messages = newMessage;
    setTicket(newMessage);
  };

  useEffect(() => {
    getTicketDetail();
  }, []);

  return (
    <>
      <SEO title='Ticket' desc='Ticket Description' />
      <ItemDescription title='Support Ticket' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='p-4 mx-auto max-w-7xl'>
        <ViewTicket ticket={ticket} postComment={getTicketDetail} />
      </div>
    </>
  );
};

Ticket.Layout = MainLayout;

export default AuthGuard(Ticket);

Ticket.Layout = MainLayout;

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      ticketId: context.params.ticketId,
    },
  };
};
