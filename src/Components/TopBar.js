import React from 'react'

function TopBar() {
  return (
    <div className='bg-[#eeeeee] grid md:grid-cols-3 w-full py-3 px-7 text-gray-400 text-xs items-center gap-y-3 lg:gap-y-0 justify-items-center'>
      <div className='flex items-center space-x-3 w-full justify-center md:justify-start ' >
        <div className='flex items-center space-x-1 border-r border-gray-300 pr-3'>
            <i className='bx bx-map text-lg'></i>
            <span>Pharmacies</span>
        </div>
        <div className='flex items-center space-x-1'>
            <i className='bx bx-mail-send text-lg' ></i>
            <span>Ilhamelmdb@gmail.com</span>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <p>find your Pharmacy Right Now,<c className='text-main border-b border-main cursor-pointer'>Explore Now</c></p>
        </div>
      <div className='w-full flex justify-center md:justify-end '>English</div>
    </div>
  )
}

export default TopBar
