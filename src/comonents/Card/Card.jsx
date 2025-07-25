import { Eye, Heart, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/Wishlist.context';

export default function Card({ productinfo }) {

    const { id, title, description, imageCover, price, category, ratingsAverage } = productinfo;
    const { addtocart } = useContext(CartContext);
    const { wishlist, addtowishlist, removefromwishlist } = useContext(WishlistContext);
    let inwishlist = false;
    if (wishlist) {
        for (let i = 0; i < wishlist.length; ++i) {
            if (wishlist[i].id == id) {
                inwishlist = true;
            }
        }
    }
    function togglewishlist() {
        if (inwishlist) {
            removefromwishlist(id);
        }
        else {
            addtowishlist(id)
        }
    }


    return (
        <>


            <div className='card bg-white shadow-xl group'>

                <div className='relative'>
                    <img src={imageCover} alt='imageCover'></img>

                    <div className='bg-gray-500/40 flex justify-center items-center gap-3 absolute inset-0  opacity-0 group-hover:opacity-100 transition-all duration-500'>
                        <ShoppingCart onClick={() => { addtocart(id) }} className='bg-maincolor text-white p-1 w-8 h-8 rounded-full hover:bg-white hover:text-maincolor transition-all cursor-pointer' />
                        <Heart onClick={togglewishlist}
                            className={` text-white p-1 w-8 h-8 rounded-full hover:bg-white hover:text-maincolor transition-all cursor-pointer ${inwishlist ? 'bg-red-500 text-red-500'
                                : 'bg-maincolor'}`} />

                        <Link to={`/product/${id}`}><Eye className='bg-maincolor text-white p-1 w-8 h-8 rounded-full hover:bg-white hover:text-maincolor transition-all cursor-pointer' /></Link>

                    </div>

                </div>

                <div className='cardbody space-y-4 p-4'>
                    <div>
                        <h2 className='text-2xl font-semibold line-clamp-1'>{title}</h2>
                        <h3 className='text-lg text-maincolor font-semibold line-clamp-2'>{category.name}</h3>
                    </div>

                    <p className='text-sm text-slate-500  line-clamp-2'>{description}</p>
                    <div className='flex justify-between items-center'>
                        <h3>{price}EGP</h3>
                        <h3><i className='fa-solid fa-star text-yellow-500 '></i>{ratingsAverage}</h3>
                    </div>

                </div>

            </div>


        </>
    )
}
