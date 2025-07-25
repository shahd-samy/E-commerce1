import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { object, string } from 'yup';
import axios from 'axios';

export default function Verifypass() {

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const location = useLocation();
  const verifiedemail = location.state?.verifiedemail;

  const validationSchema = object({
    resetCode: string().required('reset code is required').matches(/^[0-9]{6}$/, 'code must be 6 numbers'),
  })

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: verifypass,
    validationSchema,
  })

  async function verifypass(values) {
    const loadingtoast = toast.loading('loading');
    setloading(true);

    try {
      seterror(null);

      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        method: 'post',
        data: values
      }
      const { data } = await axios.request(options);
      toast.success('code verified');
      setTimeout(() => {
        navigate('/resetpass', { state: { verifiedemail: verifiedemail } });

      }, 2000)

      console.log(data);
    } catch (error) {
      seterror(error.response.data.message);

    } finally {
      toast.dismiss(loadingtoast);
      setloading(false);

    }

  }


  return (
    <div>
      <div className='flex items-center text-maincolor text-3xl gap-2'>
        <i className="fa-regular fa-circle-user"></i>
        <h1 className='text-3xl font-bold text-maincolor'>Verify Code</h1>
      </div>
      {error && <p className='text-red-600 font-semibold my-4 text-2xl'>{error}</p>}

      <form className='py-8' onSubmit={formik.handleSubmit}>

        <div>
          <input type='text' className='input bg-slate-100 w-full p-2' name='resetCode'
            value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
          />
        </div>
        <button type='submit' className='my-4 bg-maincolor px-4 py-2 rounded-md text-white'>SUBMIT</button>

      </form>

    </div>
  )
}
