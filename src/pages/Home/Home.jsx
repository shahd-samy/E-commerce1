import React, { useEffect, useState } from 'react'
import Card from '../../comonents/Card/Card'
import axios from 'axios';
import Loading from '../../comonents/Loading/Loading';
import Slider from '../../comonents/Slider/Slider';
import useonline from '../../hooks/Useonline';
import Search from '../../comonents/Search/Search';
import Categoryslider from '../../comonents/Categoryslider/Categoryslider';


export default function Home() {
  const [products, setproducts] = useState(null);
  const { online } = useonline()
  const [search, setsearch] = useState('')
  async function getallproducts(values) {

    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/products',
      method: 'get',
    }
    const { data } = await axios.request(options);
    //console.log(data.data);
    setproducts(data.data);
  }

  useEffect(() => {
    getallproducts()
  }, [])



  return (
    <div className='py-10 space-y-8'>

      <Slider></Slider>
      <Categoryslider></Categoryslider>
      <Search search={search} setsearch={setsearch}></Search>

      {products ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-7'>

        {
          products.map((product) => {
            if (search == "")
              return <Card productinfo={product} key={product.id} />
            else {
              if (product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.category.name.toLowerCase().includes(search.toLowerCase()) ||
                product.slug.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())

              )
                return <Card productinfo={product} key={product.id} />

            }
          })
        }

      </div> : <Loading />}

    </div>
  )
}
