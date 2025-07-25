import React from 'react'
import homeslider2 from '../../assets/images/slider-image-2.jpeg'
import homeslider3 from '../../assets/images/slider-image-3.jpeg'
import homeslider1 from '../../assets/images/slider-image-1.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Slider() {
    return (
        <div>

            <div className='grid grid-cols-12'>

                <div className='col-span-8'>
                    <Swiper loop={true} slidesPerView={1}>
                        <SwiperSlide>
                            <img src={homeslider3} alt='homeslider3' className='h-full object-cover'></img>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={homeslider1} alt='homeslider1'></img>
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={homeslider2} alt='homeslider2'></img>
                        </SwiperSlide>

                    </Swiper>
                </div>

                <div className='col-span-4'>
                    <img src={homeslider1} alt='homeslider1'></img>
                    <img src={homeslider2} alt='homeslider2'></img>
                </div>

            </div>

        </div>
    )
}
