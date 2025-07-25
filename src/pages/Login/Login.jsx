import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { tokenContext } from '../../context/Token.context';


export default function Login() {
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [passtype, setpasstype] = useState('password');
  const { settoken } = useContext(tokenContext);
  function togglepasstype() {
    (passtype == 'password') ? setpasstype('text') : setpasstype('password');
  }


  const validationSchema = object({
    email: string().required('email is required').email('email must be valid'),
    password: string().required('password is required').matches(/^[A-Z][A-Za-z0-9]{5,}$/, 'password must start with uppercase letter and min 6 length'),
  })


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: sendlogin,
    validationSchema,
  })

  async function sendlogin(values) {
    const loadingtoast = toast.loading('loading');
    setloading(true);

    try {
      seterror(null);

      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method: 'post',
        data: values
      }
      const { data } = await axios.request(options);
      toast.success('login successfully');
      localStorage.setItem('token', data.token);
      settoken(data.token);
      setTimeout(() => {
        navigate('/home');

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
    <div className='space-y-7'>
      <h1 className='text-3xl font-bold text-maincolor'>login form</h1>

      {error && <p className='text-red-600 font-semibold my-4 text-2xl'>{error}</p>}

      <form onSubmit={formik.handleSubmit}>

        <div>
          <label htmlFor='email'>email</label>
          <input type='email' id='email' className='input bg-slate-100 w-full' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <p className='text-red-600 font-semibold my-4'>{formik.errors.email}</p> : ''}

        </div>

        <div>
          <label htmlFor='password'>password</label>
          <div className='relative'>
            <input type={passtype} id='password' className='input bg-slate-100 w-full' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <p className='text-red-600 font-semibold my-4'>{formik.errors.password}</p> : ''}
            <Eye className='absolute right-4 top-1  cursor-pointer' onClick={() => { togglepasstype() }}></Eye>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <button disabled={loading} type='submit' className='my-4 bg-maincolor px-4 py-2 rounded-md text-white'>
            {loading ? <i className="fa-soild fa-spinner fa-spin"></i> : 'Login'}
          </button>

          <Link to={'/forgetpass'} className='underline text-blue-600'>Forget password</Link>


        </div>



      </form>



    </div>
  )
}
