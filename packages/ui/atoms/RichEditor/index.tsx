/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 23 May 2022 09:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import dynamic from 'next/dynamic';

const ReactQuillEditor = dynamic(() => import('./ReactQuillEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import 'react-quill/dist/quill.snow.css';

const RichEditor = ({ onChange, value }: { onChange: any; value: any }) => {
  return (
    <>
      <ReactQuillEditor onChange={(value: any) => onChange(value)} defaultValue={value} />
    </>
  );
};

export default RichEditor;
