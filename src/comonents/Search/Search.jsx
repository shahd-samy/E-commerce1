import React from 'react'

export default function Search({search,setsearch}) {
  return (
    <div className='py-20'>
      <input type='text' value={search} placeholder='search...' className='border-1 p-2 border-gray-500  rounded-xl w-full' 
      onChange={(e)=>setsearch(e.target.value)} >
        
      </input>
    </div>
  )
}
