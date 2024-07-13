/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 18 August 2022, 17:32
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Modal from 'components/atoms/Modal';

const Confirm = ({
  open = false,
  heading = '',
  content = '',
  confirmButtonLabel = 'Yes',
  cancelButtonLabel = 'No',
  onConfirm,
  onCancel = () => {
    return;
  },
}: {
  open: boolean;
  heading: string;
  content: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}) => {
  return (
    <Modal isOpen={open} heading={heading} closeModal={onCancel}>
      <div className='p-8'>
        <div className='mb-8 text-[1.0625rem] text-center'>{content}</div>
        <div className='flex justify-center gap-10'>
          <button className='border-2 border-gray-600 min-w-[5rem] px-6 py-1 rounded mt-confirmationBtnNo' onClick={onCancel}>
            {cancelButtonLabel}
          </button>
          <button
            className='border-2 border-mtyellow bg-mtyellow text-white min-w-[5rem] px-6 py-1 rounded mt-confirmationBtnYes'
            onClick={() => onConfirm()}
          >
            {confirmButtonLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
