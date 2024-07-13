/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 21 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';
import { DocsIcon } from '../icons';

const FileUploadField = ({ name, accept, onChange, errors, touched, file }: any) => {
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
      setFileName(fileUploaded.name);

      reader.readAsDataURL(fileUploaded);

      reader.onload = () => {
        onChange(reader.result);
      };
    }
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, fileName);
  }
  return (
    <div className='my-1.5'>
      <label htmlFor={name}>
        <div
          className={`appearance-none static h-11 bg-[#f2f8fb] border border-solid ${borderColor} box-border rounded self-stretch p-3 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white flex justify-between`}
        >
          <div>{fileName}</div>
          <DocsIcon className='w-6 h-6 text-[#00aeef]' />
        </div>
      </label>
      <input type='file' className='hidden' id={name} onChange={handleChange} accept={accept} />
    </div>
  );
};

export default FileUploadField;
