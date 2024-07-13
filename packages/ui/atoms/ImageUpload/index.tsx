/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Tuesday, 27 September 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import { DocsIcon } from '../icons';
import Modal from '../../../../apps/admin/components/atoms/Modal';

type propType = {
  name: string;
  value?: string;
  accept?: any;
  onChange?: any;
  errors: any;
  touched: any;
  file?: any;
  maxSize?: number;
};

const ImageUpload = ({
  name,
  value,
  accept,
  onChange,
  errors,
  touched,
  file,
  maxSize,
}: propType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  let val;
  if (file !== undefined && file.length > 0) {
    val = file;
  } else {
    val = '';
  }

  const [fileName, setFileName] = useState(val);

  let borderColor = 'border-[#003e5c]';

  if (errors && touched) {
    borderColor = 'border-[#EA0000]';
  }

  const handleChange = (event: any) => {
    const reader = new FileReader();
    const fileUploaded = event.target.files[0];

    if (fileUploaded) {
      const fileName = fileUploaded.name.toLowerCase();
      const fileSize = event.target.files[0].size / 1024 / 1024;
      const type = accept?.split(',');

      let allowFileType = false;
      let allowFileSize = false;
      if (accept && !type?.some((x: string) => fileName.includes(x))) {
        setIsOpen(true);
        setModalContent({
          title: 'Wrong type',
          message: `Please upload only ${accept?.replaceAll(',', ', ')} type`,
        });
        allowFileType = false;
      } else {
        allowFileType = true;
      }

      if (allowFileType && maxSize && fileSize > maxSize) {
        setIsOpen(true);
        setModalContent({
          title: 'File size exceeded',
          message: `File size must be less then ${maxSize}mb`,
        });
        allowFileSize = false;
      } else {
        allowFileSize = true;
      }

      if (allowFileType && allowFileSize) {
        setFileName(fileUploaded.name);
        // reader.readAsDataURL(fileUploaded);

        // reader.onload = () => {
        //   onChange(reader.result);
        // };
        onChange(fileUploaded);
      }
    } else {
      setIsOpen(true);
      setModalContent({
        title: 'Something went wrong',
        message: `Please upload a file/image`,
      });
    }
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(name, fileName);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (value === '') {
      setFileName('');
      onChange('');
    }
  }, [value]);

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          heading={modalContent?.title}
          content={modalContent?.message}
        >
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      <div className='my-1.5'>
        <label htmlFor={name}>
          <div
            className={`appearance-none static h-10 bg-[#f2f8fb] border border-solid ${borderColor} box-border rounded self-stretch p-3 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white flex justify-between`}
          >
            <div>{fileName}</div>
            <DocsIcon className='w-6 h-6 text-[#00aeef]' />
          </div>
        </label>
        <input type='file' className='hidden' id={name} onChange={handleChange} accept={accept} />
      </div>
    </>
  );
};

export default ImageUpload;
