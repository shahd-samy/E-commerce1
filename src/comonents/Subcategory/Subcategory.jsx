import React, { useEffect, useState } from 'react'
import Loading from '../../comonents/Loading/Loading';
import axios from 'axios';

export default function Subcategory({ categorynum, categoryname }) {

    const [specificsubcategory, setspecificsubcategory] = useState(null);

    async function getspecificsubcategories() {

        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories/${categorynum}/subcategories`,
            method: 'get',
        }

        const { data } = await axios.request(options);
        //console.log(data.data);
        setspecificsubcategory(data.data);
    }

    useEffect(() => {
        getspecificsubcategories()
    }, [categorynum])


    return (
        <>
            <h2 className='text-3xl text-maincolor text-center font-semibold py-9'>{categoryname} Subcategories</h2>
            {specificsubcategory ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-7 space-y-8'>

                {
                    specificsubcategory.map((specificsubcategory) => {
                        return <>

                            <div key={specificsubcategory._id} className='card bg-white cardshadow transition-all duration-300 rounded-2xl border-1 border-slate-200'>
                                <h2 className='text-2xl font-bold text-black text-center py-5'>{specificsubcategory.name}</h2>
                            </div>
                        </>

                    })
                }
            </div> : <Loading />}
        </>
    )

}
