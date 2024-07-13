import Modal from 'components/molecules/Modal';

const TermsAndConditions = ({ title = 'Terms and Conditions', content, show, setVisibility }) => {
  return (
    <Modal
      showModal={show}
      cssClass='max-w-4xl'
      setShowModal={setVisibility}
      content={`<div class="reset-style">${content}</div>`}
      heading={title}
    />
  );
};

export default TermsAndConditions;
