import Modal from 'components/molecules/Modal';

const PrivacyPolicy = ({ content, show, setVisibility }) => {
  return (
    <Modal
      showModal={show}
      cssClass="max-w-4xl"
      setShowModal={setVisibility}
      content={`<div class="reset-style">${content}</div>`}
      heading="Privacy Policy"
    />
  );
};

export default PrivacyPolicy;
