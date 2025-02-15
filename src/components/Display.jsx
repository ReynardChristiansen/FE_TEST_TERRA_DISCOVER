import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import Add from './Add';

const Display = () => {
  return (
    <div className='w-[100%] m-2 px-6 pt-4 rounded bg-gray-100 text-white overflow-auto lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/Add' element={<Add />} />
      </Routes>
    </div>
  )
}



export default Display;