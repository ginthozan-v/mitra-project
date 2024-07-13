import { NextPageContext } from 'next';

const Error = () => {
  return <></>;
};

Error.getInitialProps = ({ req, res, err }: NextPageContext) => {
  if (res.statusCode === 404) {
    res.setHeader('Location', `/not-found?url=${encodeURIComponent(req.url)}`);
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
};

export default Error;
