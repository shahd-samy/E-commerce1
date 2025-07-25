import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../comonents/Loading/Loading';
import Categorycard from '../../comonents/Categorycard/Categorycard';
import Subcategory from './../../comonents/Subcategory/Subcategory';

export default function Category() {

    const [categories, setcategories] = useState(null);
    const [categorynum, setcategorynum] = useState(null);
    const [categoryname, setcategoryname] = useState(null);

    const imgprop = 'w-100 h-75 object-cover';

    async function getallcategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'get',
        }
        const { data } = await axios.request(options);
        //console.log(data.data);
        setcategories(data.data);
    }
    useEffect(() => {
        getallcategories()
    }, [])


    return (
        <>

            {categories ? <> <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 space-y-7'>

                {
                    categories.map((category) => {
                        return <Categorycard categoryinfo={category} key={category._id} imgprop={imgprop} onClickCard={() => { setcategorynum(category._id); setcategoryname(category.name); }}></Categorycard>

                    })
                }
            </div>
                {categorynum ? <Subcategory categorynum={categorynum} categoryname={categoryname}></Subcategory> : ""}

            </> : <Loading />}




        </>
    )
}

