import React, { useContext, useEffect } from 'react'
import Loading from '../../comonents/Loading/Loading';
import { CartContext } from '../../context/Cart.context';
import { ShoppingBag } from 'lucide-react';
import Cartitem from '../../comonents/Cartitem/Cartitem';
import { Link } from 'react-router-dom'

export default function Cart() {
    const { getallcart, cartinfo, clearcart } = useContext(CartContext);
    useEffect(() => {
        getallcart()
    }, [])

    if (cartinfo?.numOfCartItems == 0) {
        return <section className='bg-gray-300 p-6 space-y-7'>
            <div className='text-black'>
                <h1 className='text-2xl flex items-center gap-3 font-bold'>Shop Cart<ShoppingBag></ShoppingBag></h1>
                <h3 className='text-lg text-maincolor '>Total :0 EGP </h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-3  pb-7'>
                <h2 className='text-2xl font-medium'>your cart is empty</h2>
                <button className='bg-maincolor p-3 text-white rounded-lg hover:cursor-pointer hover:opacity-80'><Link to={'/home'}>ADD PRODUCT TO YOUR CART</Link></button>
            </div>
        </section>
    }

    else {


        return (
            <>

                {cartinfo ?
                    <>

                        <section className='bg-gray-300 p-6'>
                            <div className='text-black'>
                                <h1 className='text-2xl flex items-center gap-3 font-bold'>Shop Cart<ShoppingBag></ShoppingBag></h1>
                                <h3 className='text-lg text-maincolor '>Total :{cartinfo.data.totalCartPrice} EGP </h3>
                            </div>
                            <div>
                                {cartinfo.data.products.map((cart) => <Cartitem cartinfo={cart} key={cart._id}></Cartitem>)}

                            </div>
                            <div className='w-fit ms-auto'>

                                <button onClick={clearcart} className='bg-red-700 p-3 text-white rounded-lg hover:cursor-pointer hover:opacity-87'>CLEAR CART</button>
                            </div>
                        </section>


                        <div className='w-fit ms-auto mt-5'>
                            <Link to={'/checkout'}>
                                <button className='bg-maincolor p-3 text-white rounded-lg hover:cursor-pointer hover:opacity-87'>go to checkout</button>
                            </Link>
                        </div>


                    </>
                    : <Loading></Loading>}

            </>
        )



    }
}
