import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const [cookies,removeCookie] = useCookies(['name']);
    const navigate = useNavigate()

    const[jwt,setjwt] =useState(null)

    useEffect(()=>{
        if(cookies.jwt != "undefined")
        {
            setjwt(cookies.jwt)
        }
    },[cookies])

    const logout = ()=>{
        removeCookie('jwt')
        removeCookie('userId')
        removeCookie('first_name')
        removeCookie('last_name')
        window.location.reload();
        navigate("/pharmacy")
    }

  const ModalAuth =()=>{
    const modal= document.querySelector('.authmodal')
    modal.classList.add('flex')
    modal.classList.remove('hidden')
}

  const openSideBar = () => {
    const sideBar1 = document.querySelector('.SideBar1')
    const sideBar2 = document.querySelector('.SideBar2')

    sideBar1.classList.remove('hidden')
    sideBar2.classList.remove('-left-full')

    sideBar2.classList.add('left-0')
  }
  return (
    <div className='bg-white shadow py-7 px-5 flex items-center justify-between font-roboto'>
        <i className='bx bx-search text-2xl text-gray-500 hidden lg:flex'></i>
      <div className='flex items-center lg:space-x-20 text-sm'>
          <div className='lg:flex items-center space-x-7 hidden'>
            <span className='text-main border-b border-main'><Link to="/">Home</Link></span>
            {jwt &&
              <span><Link to="/city">Cities</Link></span>
            }
            <span>About us</span>
          </div>
          <h1 className='text-3xl font-logo'>Phar<c className='text-main'>Map</c></h1>
          <div className='lg:flex items-center space-x-7 hidden'>
            <span>Home</span>
            {
              jwt &&
              <span><Link to="/pharmacy">Pharmacies</Link></span>
            }
            <span>About us</span>
          </div>
      </div>
      <i onClick={openSideBar} className='bx bx-menu text-3xl text-black lg:hidden'></i>
      {!jwt 
      && 
      <i onClick={ModalAuth} className='bx bx-user text-2xl text-gray-500 hidden lg:flex cursor-pointer'></i>
      }
      {jwt
      &&
      <div className='flex items-center space-x-3 text-sm text-main'>
        <span className='font-semibold'>{cookies.first_name}</span>
        <i onClick={logout} className='bx bxs-door-open cursor-pointer text-2xl'  ></i>
      </div>
      }
    </div>
  )
}

export default Header
