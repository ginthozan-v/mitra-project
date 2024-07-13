import { useEffect, useRef } from "react";

const MytPaymentForm = ({appId, merchantTradeNo, encryptedPayload, paymentType, signature}) => {
  const mytForm = useRef();
  useEffect(() => {
    const form: HTMLFormElement = mytForm.current;
    form.submit();
  }, []);
  return (
    <form ref={mytForm} id='mytForm' action='https://pay.mytmoney.mu/Mt/web/payments' method='post' className='hidden'>
      <input type='hidden' name='appId' value={appId} />
      <input type='hidden' name='merTradeNo' value={merchantTradeNo} />
      <input type='hidden' name='payload' value={encryptedPayload} />
      <input type='hidden' name='paymentType' value={paymentType} />
      <input type='hidden' name='sign' value={signature} />
      <p>
        <input type='submit' value='Pay By my.t money' className='hidden' />
      </p>
    </form>
  );
};

export default MytPaymentForm;