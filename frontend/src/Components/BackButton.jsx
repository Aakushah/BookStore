import React from 'react'
import {Link} from 'react-router-dom'
import { BsArrowLeftCircleFill } from "react-icons/bs";
const BackButton = ({destination = '/'}) => {
  return (
    <div className='flex'>
        
        <Link 
        to={destination} 
        className='bg-sky-400 text-black px-4 py-1 rounded-lg w-fit'
        >
        <BsArrowLeftCircleFill  className='text-2xl'  />

        </ Link>

    </div>

  )
}

export default BackButton