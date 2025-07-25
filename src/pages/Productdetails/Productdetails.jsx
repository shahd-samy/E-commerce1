import { ArrowBigLeft, ArrowBigRight, ArrowBigRightIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../comonents/Loading/Loading';
import axios from 'axios';
import { CartContext } from '../../context/Cart.context';
import Card from '../../comonents/Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import useonline from './../../hooks/Useonline';

export default function Productdetails() {

    const { id } = useParams();
    const [productdetails, setproductdetails] = useState(null);
    const { addtocart } = useContext(CartContext);
    const [relatedproducts, setrelatedproducts] = useState(null);
    const { online } = useonline()



    async function getrelatedproducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productdetails.category._id}`,
            method: 'get',
        }
        const { data } = await axios.request(options);
        //console.log(data.data);
        setrelatedproducts(data.data);
    }



    async function getproductdetails() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'get',
        }
        const { data } = await axios.request(options);
        //console.log(data.data);
        setproductdetails(data.data);
    }


    useEffect(() => {
        getproductdetails()
    }, [id])

    useEffect(() => {
        if (productdetails)
            getrelatedproducts()
    }, [productdetails])




    return (
        <>
            {productdetails == null ? <Loading></Loading> :

                <>

                    <div className='grid grid-cols-12 gap-6 py-10'>

                        <div className='col-span-4 relative'>

                            <ReactImageGallery showPlayButton={false} showFullscreenButton={false} items={productdetails.images.map((image) => { return { original: image, thumbnail: image } })}></ReactImageGallery>

                        </div>


                        <div className='col-span-8 py-5 space-y-40'>
                            <div className='space-y-7'>

                                <div>
                                    <h2 className='text-xl'>{productdetails.title}</h2>
                                    <h3 className='text-maincolor font-bold'>{productdetails.category.name}</h3>
                                </div>


                                <p>{productdetails.description}</p>

                                <div className='flex items-center justify-between'>
                                    <p>{productdetails.price} EGP</p>
                                    <h4>{productdetails.ratingsAverage}<i className='fa-solid fa-star text-yellow-500'></i></h4>
                                </div>

                            </div>
                            {online ?
                                <button onClick={() => { addtocart(productdetails.id) }} className='bg-maincolor text-white rounded w-full py-1 hover:opacity-85 hover:cursor-pointer'>Add To Cart</button>
                                : <h2 className='text-red-500'>you are offline</h2>}
                        </div>

                    </div>


                    <div className='p-10 space-y-5'>
                        <h2 className='text-3xl font-bold'>Related Products</h2>

                        <Swiper loop={true} slidesPerView={6} spaceBetween={'10px'}>

                            {
                                relatedproducts?.map((product) =>
                                    <SwiperSlide key={product.id}>

                                        <Card productinfo={product}></Card>

                                    </SwiperSlide>

                                )}

                        </Swiper>



                    </div>







                </>
            }
        </>
    )
}
