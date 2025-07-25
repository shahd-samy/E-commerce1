import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import axios from 'axios';

export default function Categoryslider() {
    const [categories, setcategories] = useState(null);

    async function getallcategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET',
        }
        const { data } = await axios.request(options);
        // console.log(data.data);
        setcategories(data.data);
    }
    useEffect(() => {
        getallcategories()
    }, [])


    return (
        <>

            {categories ? <Swiper modules={[Pagination]} loop={true} slidesPerView={6} pagination={{ clickable: true }} >

                {
                    categories.map((category) =>
                        <SwiperSlide key={category._id}>
                            <img src={category.image} alt='categoryslider' className='h-64 object-cover'></img>
                            <h2 className='mt-2 text-lg'>{category.name}</h2>
                        </SwiperSlide>

                    )}



            </Swiper> : <Loading />}




        </>
    )
}
