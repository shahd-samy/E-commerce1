import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { LogOut, ShoppingCart } from 'lucide-react'
import { useContext, useEffect } from 'react';
import { tokenContext } from '../../context/Token.context';
import { CartContext } from '../../context/Cart.context';


export default function Navbar() {

  const { token, logout } = useContext(tokenContext);
  const { cartinfo, getallcart } = useContext(CartContext);

  useEffect(() => {
    getallcart()

  }, [])

  return (
    <>
      <nav className='bg-slate-200 py-5'>
        <div className='container flex justify-between items-center py-2'>
          <Link to={'home'}><img src={logo} alt="" /></Link>

          {token ?

            <ul className='flex gap-3'>
              <li><NavLink className='hover:font-semibold cursor-pointe transition-all duration-500' to={'/home'}>Home</NavLink></li>
              <li><NavLink className='hover:font-semibold cursor-pointe transition-all duration-500' to={'/products'}>Products</NavLink></li>
              <li><NavLink className='hover:font-semibold cursor-pointe transition-all duration-500' to={'/categories'}>Categories</NavLink></li>
              <li><NavLink className='hover:font-semibold cursor-pointe transition-all duration-500' to={'/brands'}>Brands</NavLink></li>
              <li><NavLink className='hover:font-semibold cursor-pointe transition-all duration-500' to={'/wishlist'}>Wish List</NavLink></li>
            </ul> : null}


          <ul className='flex justify-between items-center gap-2'>
            {token ? <li><Link className='relative ' to={'/cart'}>
              <ShoppingCart />
              <h5 className='absolute top-[-10px] right-[-10px] rounded-full w-5 h-5 p-2 text-white bg-maincolor flex justify-center items-center'>
                {cartinfo == null ? <i className='fa-solud fa-spinner fa-spin'></i> : cartinfo.numOfCartItems}</h5>
            </Link></li> : null}

            <li><i className="fa-brands fa-facebook "></i></li>
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-linkedin"></i></li>
            {
              token ? <li onClick={logout} className='hover:font-semibold cursor-pointer ransition-all duration-500'><LogOut /> </li>
                : <>
                  <li className='hover:font-semibold cursor-pointe transition-all duration-500'><NavLink to={'login'}>Login</NavLink></li>
                  <li className='hover:font-semibold cursor-pointer ransition-all duration-500'><NavLink to={'register'}>Register</NavLink></li>

                </>
            }

          </ul>

        </div>
      </nav>

    </>
  )
}
