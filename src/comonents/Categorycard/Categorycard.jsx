import React from 'react'

export default function Categorycard({ categoryinfo, imgprop, onClickCard }) {

    const { id, name, image } = categoryinfo;

    return (
        <>
            <div className='card bg-white shadow-lg cardshadow transition-all duration-300' onClick={onClickCard} >

                <div>
                    <img src={image} alt='imageCover' className={imgprop}></img>
                </div>

                <div className='cardbody space-y-4 p-5' >
                    <h2 className='text-2xl font-bold text-maincolor text-center line-clamp-1'>{name}</h2>
                </div>
            </div>

        </>
    )
}
