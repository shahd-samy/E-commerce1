import { Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { WishlistContext } from '../../context/Wishlist.context'
import { CartContext } from '../../context/Cart.context';
import { useEffect } from 'react';

export default function Wishlist() {
  const { wishlist, getwishlist, removefromwishlist } = useContext(WishlistContext);
  const { addtocart } = useContext(CartContext);

  useEffect(() => {
    getwishlist();
  }, []);

  return (
    <>
      <section className='bg-gray-200 p-6'>
        <h2 className='text-2xl text-black font-semibold'></h2>

        {
          wishlist.map(product => (
            <div className='space-y-3'>
              <div className='flex gap-5 items-center'>

                <div className=''>
                  <img className='w-40' src={product.imageCover}></img>
                </div>

                <div className='space-y-2 '>
                  <h3 className='text-black font-medium text-xl line-clamp-1 '>${product.title}</h3>
                  <h4 className='text-lg text-maincolor font-medium '>Total :${product.price} EGP </h4>
                  <button onClick={() => removefromwishlist(product.id)} className='text-red-500 flex font-medium hover:cursor-pointer'><Trash className='text-red-500'></Trash> Remove</button>
                </div>

                <div className='w-fit ms-auto'>
                  <button onClick={() => { addtocart(product.id); removefromwishlist(product.id) }} className='border-2 border-maincolor p-3 text-black rounded-lg hover:cursor-pointer hover:bg-maincolor'>add to cart</button>
                </div>
              </div>
              <div className='border-1 border-gray-400   w-full mb-3'></div>

            </div>


          ))
        }


      </section>
    </>
  )



}
