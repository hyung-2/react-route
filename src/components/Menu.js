import React from 'react'
import { Link } from 'react-router-dom'
//Link : a태그와 비슷-새로고침은 없음
import './Menu.css'
import posts from '../PostData'

function Menu(){
  return(
    <>
      <Link to='/' className='menu-item'>HOME</Link>
      <Link to='/about' className='menu-item'>ABOUT</Link>
      <Link to='/posts' className='menu-item'>POST</Link>
    </>
  )
}


export default Menu

