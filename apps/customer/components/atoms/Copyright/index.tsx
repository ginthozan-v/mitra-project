import api from "api";
import { GENERIC_CONTENT } from "api/generic-contents";
import { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';

const Copyright = () => {
  const [copyright, setCopyright] = useState('2022 © Mauritius Telecom Ltd');
  useEffect(() => {
    api.genericContents.get(GENERIC_CONTENT.COPYRIGHTS).then((res) => {
      setCopyright(res?.copyright);
    });
  }, []);
  return <div className="text-sm">{ReactHtmlParser(copyright)}</div>
};

export default Copyright;