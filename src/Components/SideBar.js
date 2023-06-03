import React from 'react'

function SideBar() {
    const closeSideBar = () => {
        const sideBar1 = document.querySelector('.SideBar1')
        const sideBar2 = document.querySelector('.SideBar2')
    
        sideBar1.classList.add('hidden')
        sideBar2.classList.add('-left-full')
    
        sideBar2.classList.remove('left-0')
      }
  return (
    <div className='font-roboto'>
        <div onClick={closeSideBar} className='SideBar1 hidden w-full h-screen fixed top-0 z-100 bg-gray-500/60 transition duration-100'>
        </div>
        <div className='SideBar2 text-sm flex flex-col w-2/3 lg:w-1/3 h-screen top-0 fixed bg-white z-100 -left-full transition duration-100'>
            <div className='flex items-center justify-between px-2 py-5'>
                <h1 className='text-3xl font-logo'>Phar<c className='text-main'>Map</c></h1>
                <i onClick={closeSideBar} className='bx bx-x  text-2xl font-bold rounded cursor-pointer'></i>
            </div>
            <div className='flex flex-col px-5 text-gray-700 font-semibold'>
                <span className='cursor-pointer text-main py-4 border-b border-gray-200'>Home</span>
                <span className='cursor-pointer text-black py-4 border-y border-gray-200'>Pharmacies</span>
                <span className='cursor-pointer text-black py-4 border-y border-gray-200'>Contact us</span>
                <span className='cursor-pointer text-black py-4 border-y border-gray-200'>About us</span>
                <span className='cursor-pointer text-black py-4 border-gray-200'>Home</span>
            </div>
        </div>
    </div>
  )
}

export default SideBar
