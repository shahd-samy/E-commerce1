import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import { CartContext } from '../../context/Cart.context';
import { tokenContext } from '../../context/Token.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Checkout() {
    const { cartinfo } = useContext(CartContext);
    const { token } = useContext(tokenContext);
    const navigate = useNavigate();
    const [payment, setpayment] = useState(null);

    async function makeonlineorder(values) {

        const loading = toast.loading('loading');

        try {
            const test = {
                shippingAddress: values
            }

            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartinfo.cartId}?url=http://localhost:5173`,
                method: 'post',
                data: test,
                headers: {
                    token,
                }
            }

            const { data } = await axios.request(options);
            //console.log(data);
            toast.success('order made successfully');
            setTimeout(() => {
                location.replace(data.session.url);

            }, 1000);
        } catch (error) {
            //console.log(error);
            toast.error('error')

        } finally {
            toast.dismiss(loading)
        }

    }




    async function makecashorder(values) {

        const loading = toast.loading('loading');

        try {
            const test = {
                shippingAddress: values
            }

            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartinfo.cartId}`,
                method: 'post',
                data: test,
                headers: {
                    token,
                }
            }

            const { data } = await axios.request(options);
            //console.log(data);
            toast.success('order made successfully');
            navigate('/allorders');
        } catch (error) {
            //console.log(error);
            toast.error('error')

        } finally {
            toast.dismiss(loading)
        }

    }


    const formik = useFormik({
        initialValues: {
            city: '',
            phone: '',
            details: '',

        },
        onSubmit: (values) => {
            (payment == 'cash') ? makecashorder(values) : makeonlineorder(values)


        }

    })




    return (
        <div>
            <h2 className='text-xl font-semibold mt-8'>fill your details</h2>


            <form onSubmit={formik.handleSubmit}>

                <div className='my-1'>
                    <label htmlFor=''>city</label>
                    <input name='city' value={formik.values.city} onChange={formik.handleChange} type='text' className='input bg-gray-200 w-full my-3'></input>
                </div>


                <div className='my-1'>
                    <label htmlFor=''>phone</label>
                    <input name='phone' value={formik.values.phone} onChange={formik.handleChange} type='text' className='input bg-gray-200 w-full my-3'></input>
                </div>


                <div className='my-1'>
                    <label htmlFor=''>details</label>
                    <input name='details' value={formik.values.details} onChange={formik.handleChange} type='text' className='input bg-gray-200 w-full my-3'></input>
                </div>
                <div className='space-x-7'>


                    <button onClick={() => { setpayment('cash') }} type='submit' className='btn bg-blue-800 hover:opacity-85 hover:cursor-pointer'>Create cash order</button>
                    <button onClick={() => { setpayment('online') }} type='submit' className='btn hover:opacity-85 hover:cursor-pointer'>Create online order</button>


                </div>




            </form>










        </div>
    )
}
