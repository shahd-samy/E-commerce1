import axios from 'axios';
import { useFormik } from 'formik';
import { Eye } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { number, object, string, ref } from 'yup';

export default function Register() {

  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [passtype, setpasstype] = useState('password');

  function togglepasstype() {
    (passtype == 'password') ? setpasstype('text') : setpasstype('password');
  }


  const validationSchema = object({
    name: string().required('name is required').min(3, 'name must be at least 3 letters').max(20, 'name must be at least 3 letters'),
    email: string().required('email is required').email('email must be valid'),
    password: string().required('password is required').matches(/^[A-Z][A-Za-z0-9]{5,}$/, 'password must start with uppercase letter and min 6 length'),
    rePassword: string().required('repassword is required').matches(/^[A-Z][A-Za-z0-9]{5,}$/, 'password must start with uppercase letter and min 6 length').oneOf([ref('password')], 'password dont match'),
    phone: string().required('phone is required').matches(/^(\+2){0,1}(01)[1250][0-9]{7}[1-9]{1}$/, 'phone must be valid')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: sendregister,
    validationSchema,

  })

  async function sendregister(values) {
    const loadingtoast = toast.loading('loading....');
    setloading(true);
    try {
      seterror(null);
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
        method: 'POST',
        data: values
      }
      const { data } = await axios.request(options);
      toast.success('registerd successfully');
      setTimeout(() => {
        navigate('/login');

      }, 2000)
    } catch (error) {
      seterror(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingtoast);
      setloading(false);
    }
  }



  return (
    <div className='space-y-7'>
      <h1 className='text-3xl font-bold text-maincolor'>Register Form</h1>

      {error && <p className='text-red-600 font-semibold my-4 text-2xl'>{error}</p>}
      <form onSubmit={formik.handleSubmit}>


        <div>
          <label htmlFor='name'>username</label>
          <input type='text' id='name' className='input bg-slate-100 w-full' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name ? <p className='text-red-600 font-semibold my-4'>{formik.errors.name}</p> : ''}
        </div>

        <div>
          <label htmlFor='email'>email</label>
          <input type='email' id='email' className='input bg-slate-100 w-full' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <p className='text-red-600 font-semibold my-4'>{formik.errors.email}</p> : ''}

        </div>

        <div>
          <label htmlFor='phone'>phone</label>
          <input type='text' id='phone' className='input bg-slate-100 w-full' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone ? <p className='text-red-600 font-semibold my-4'>{formik.errors.phone}</p> : ''}
        </div>

        <div>
          <label htmlFor='password'>password</label>
          <div className='relative'>

            <input type={passtype} id='password' className='input bg-slate-100 w-full' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <p className='text-red-600 font-semibold my-4'>{formik.errors.password}</p> : ''}
            <Eye className='absolute right-4 top-1  cursor-pointer' onClick={() => { togglepasstype() }}></Eye>
          </div>
        </div>

        <div>
          <label htmlFor='repassword'>confirm password</label>
          <div className='relative'>
            <input type={passtype} id='repassword' className='input bg-slate-100 w-full' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-red-600 font-semibold my-4'>{formik.errors.rePassword}</p> : ''}
            <Eye className='absolute right-4 top-1  cursor-pointer' onClick={() => { togglepasstype() }}></Eye>
          </div>
        </div>



        <button disabled={loading} type='submit' className='my-4 bg-maincolor px-4 py-2 rounded-md text-white'>
          {loading ? <i className="fa-soild fa-spinner fa-spin"></i> : 'Register'}
        </button>
      </form>
    </div>
  )
}
