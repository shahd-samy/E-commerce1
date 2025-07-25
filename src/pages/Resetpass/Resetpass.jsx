import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { object, ref, string } from 'yup';
import axios from 'axios';

export default function Resetpass() {
    const [error, seterror] = useState(null);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const location = useLocation();
    const verifiedemail = location.state?.verifiedemail;

    const validationSchema = object({
        email: string().required('email is required').email('email must be valid'),
        newPassword: string().required('password is required').matches(/^[A-Z][A-Za-z0-9]{5,}$/, 'password must start with uppercase letter and min 6 length'),
    })



    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        onSubmit: resetpass,
        validationSchema,
    })

    async function resetpass(values) {

        if (verifiedemail != values.email) {
            toast.error('wrong credintals');
            return;
        }
        const loadingtoast = toast.loading('loading');
        setloading(true);

        try {
            seterror(null);

            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                method: 'put',
                data: values
            }
            const { data } = await axios.request(options);
            toast.success('password changed');
            setTimeout(() => {
                navigate('/login');

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
        <div className='space-y-6 '>
            <h1 className='text-3xl font-bold text-maincolor'>Reset Password</h1>

            {error && <p className='text-red-600 font-semibold my-4 text-2xl'>{error}</p>}

            <form onSubmit={formik.handleSubmit} className='space-y-6'>

                <div>
                    <input type='email' id='email' className='input bg-slate-100 w-full py-2' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <p className='text-red-600 font-semibold my-4'>{formik.errors.email}</p> : ''}

                </div>

                <div>
                    <input type='password' id='newPassword' className='input bg-slate-100 w-full py-2' name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.newPassword && formik.touched.newPassword ? <p className='text-red-600 font-semibold my-4'>{formik.errors.newPassword}</p> : ''}

                </div>
                <button type='submit' className='my-4 bg-maincolor px-4 py-2 rounded-md text-white'>SUBMIT</button>



            </form>



        </div>
    )

}
