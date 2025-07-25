import { Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context';

export default function Cartitem({ cartinfo }) {
  const { removefromcart, updatecart } = useContext(CartContext)
  const { count, price, product } = cartinfo;
  const { imageCover, title, id, category } = product;
  return (
    <>
      <div className='py-8 flex justify-between'>

        <div className='flex gap-5'>
          <img src={imageCover} alt='' className='w-25 h-25 object-cover'></img>
          <div>
            <h2 className='font-semibold'>{title}</h2>
            <h3 className='text-sm font-medium'>{category.name}</h3>
            <h4 className='text-maincolor pb-5'>Price: {price} EGP</h4>
            <button onClick={(() => { removefromcart(id) })} className='bg-red-700 text-white p-1 flex rounded-md hover:cursor-pointer hover:opacity-87 '><Trash></Trash> REMOVE</button>
          </div>
        </div>

        <div className='space-x-3 flex items-center'>
          <button onClick={(() => { updatecart({ productid: id, count: count + 1 }) })} className='bg-green-600 text-white p-2 rounded-md text-4xl hover:opacity-87 hover:cursor-pointer'>+</button>
          <span className='text-black font-semibold'>{count}</span>
          <button onClick={(() => { updatecart({ productid: id, count: count - 1 }) })} className='bg-green-600 text-white p-2 rounded-md text-4xl hover:opacity-87  hover:cursor-pointer'>-</button>

        </div>


      </div>

    </>
  )
}
