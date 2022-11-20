import React from 'react'

const Traveler = ({traveler}) => {
  return (
    <div className='relative'>
      <div className='absolute top-0 left-0 bg-white bg-opacity-30 rounded-lg mt-5 ml-12 pl-20 pt-3 pb-3'>
        <h3>{traveler.name}</h3>
        <p>{traveler.bio}</p>
      </div>
      <img src={traveler.photo.url} alt={traveler.name} width='100px' height='100px' className="align-middle rounded-full translate-y-4 z-10 mb-20" />
    </div>
  )
}

export default Traveler