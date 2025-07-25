import React from 'react'
import amzonlogo from '../../assets/images/amazon-pay.png'
import americalogo from '../../assets/images/American-Express-Color.png'
import payballogo from '../../assets/images/paypal.png'
import masterlogo from '../../assets/images/mastercard.webp'
import applelogo from '../../assets/images/get-apple-store.png'
import googlelogo from '../../assets/images/get-google-play.png'

export default function Footer() {
  return (
    <footer className='w-full bg-slate-200 py-15'>
      <div className='container space-y-4'>

        <div>
          <h3 className='text-2xl'>Get thefresh cart app</h3>
          <p className='text-slate-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere saepe eaque iusto nesciunt laboriosam voluptates excepturi nihil nisi porro optio nostrum maxime atque nam vitae placeat, numquam voluptatem minima dignissimos.</p>
        </div>

        <div className='flex items-center gap-3'>
          <input className='input' type='text' placeholder='email'></input>
          <button className='btn'>share link</button>
        </div>


        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4 '>
            <h3>Payment partners</h3>
            <img src={amzonlogo} alt="amzonlogo" className='w-[80px]'></img>
            <img src={americalogo} alt="americalogo" className='w-[80px]'></img>
            <img src={payballogo} alt="payballogo" className='w-[80px]'></img>
            <img src={masterlogo} alt="masterlogo" className='w-[80px]'></img>
          </div>

          <div className='flex items-center gap-4'>
            <h3>get delevires with freshcart</h3>
            <img src={applelogo} className='w-[80px]' alt="applelogo"></img>
            <img src={googlelogo} className='w-[80px]' alt="googlelogo"></img>
          </div>
        </div>




      </div>
    </footer>
  )
}
