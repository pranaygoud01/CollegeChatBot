import React from 'react'

import { motion } from "motion/react"
import { Link } from 'react-router'
const Button = ({name,path}) => {
  return (
    <Link to={path}>
    <motion.button whileTap={{scale:0.8}} transition={{duration:.5}} className='px-10 py-3 text-md rounded-[14px] h-full bg-gray-100 font-bold  text-[#3c3c3c] w-full'>
       {name}
      </motion.button>
      </Link>
  )
}

export default Button