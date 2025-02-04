import React from 'react'
import Button from './Button'

const Box = () => {
  return (
    <div className='w-[350px] h-[220px] flex flex-col shadow-md rounded-[35px] bg-white p-8'>
      <p className='font-bold text-2xl text-[#313131]'>ChatBot</p>
      <div className='h-[92px] w-full flex justify-center items-center'>
      <p className='text-sm font-medium  text-neutral-400'>Ask any query about <span className='font-bold text-blue-400'>Sri indu College</span> </p>
    
      </div>
      
      <Button name="New Message" path="/chat"/>
 
    </div>
  )
}

export default Box