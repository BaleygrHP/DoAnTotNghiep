import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import Loader from 'components/fullPageLoading';
import Input from 'components/web/form/inputCommon/inputText';
import { resetPassword } from 'slice/userSlice';

function Index() {
  const forgetPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const action = resetPassword({ email: values.email });
      const resultAction = await dispatch(action);
      const payload = unwrapResult(resultAction);

      if (payload?.resetUrl) {
        history.push(payload.resetUrl);
      }
    } catch (error) {
      console.log('Failed to reset password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <form className="form-horizontal" onSubmit={forgetPasswordForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <Input name="email" form={forgetPasswordForm} placeholder="Dia chi E-mail *" />
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_changepassword">
              Xac nhan
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Index;
