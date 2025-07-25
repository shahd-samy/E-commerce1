import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { object, string } from 'yup';
import axios from 'axios';

export default function Forgetpass() {

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);


  const validationSchema = object({
    email: string().required('email is required').email('email must be valid'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: resetpass,
    validationSchema,
  })

  async function resetpass(values) {
    const loadingtoast = toast.loading('loading');
    setloading(true);

    try {
      seterror(null);

      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        method: 'post',
        data: values
      }
      const { data } = await axios.request(options);
      toast.success('Reset code sent to your email');
      setTimeout(() => {
        navigate('/verifypass', { state: { verifiedemail: values.email } });

      }, 2000)

      //console.log(data);
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
        <h1 className='text-3xl font-bold text-maincolor'>Forget Password</h1>
      </div>
      {error && <p className='text-red-600 font-semibold my-4 text-2xl'>{error}</p>}

      <form className='py-8' onSubmit={formik.handleSubmit}>

        <div>
          <input type='email' className='input bg-slate-100 w-full p-2' name='email'
            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
          />
        </div>
        <button type='submit' className='my-4 bg-maincolor px-4 py-2 rounded-md text-white'>SUBMIT</button>

      </form>

    </div>


  )
}
