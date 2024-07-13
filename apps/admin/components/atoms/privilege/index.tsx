import Loader from '@mtcloud/ui/atoms/Loader';

const Privilege = ({ permission, message, children }: { permission; message?; children }) => {
  const renderBody = (value) => {
    if (value) {
      return children;
    } else if (value === undefined) {
      return (
        <>
          <Loader />
        </>
      );
    } else {
      if (message) {
        return <div>You do not have the privilege {message ? `to ${message}` : 'required'}.</div>;
      } else {
        return <div></div>;
      }
    }
  };

  return <>{renderBody(permission)}</>;
};

export default Privilege;
