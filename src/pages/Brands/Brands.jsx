import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../comonents/Loading/Loading';
import Categorycard from '../../comonents/Categorycard/Categorycard';
import { X } from 'lucide-react';

export default function Brands() {

    const [brands, setbrands] = useState(null);
    const imgprop = '';

    async function getallbrands() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: 'get',
        }
        const { data } = await axios.request(options);
        console.log(data.data);
        setbrands(data.data);
    }
    useEffect(() => {
        getallbrands()
    }, [])


    return (
        <>
            <h1 className='text-maincolor text-4xl font-bold text-center pb-12'>All Brands</h1>

            {brands ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 space-y-7'>

                {brands.map((brand) => (

                    <Categorycard categoryinfo={brand} key={brand._id} imgprop={imgprop} onClickCard={() => setitem(brand)}></Categorycard>
                ))
                }
            </div> : <Loading />}


        </>
    )
}
