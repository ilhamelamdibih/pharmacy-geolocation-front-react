import React from 'react'

function Footer() {
  return (
    <div className='bg-main  flex flex-col font-roboto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 items-start py-10 px-10'>
            <div className='flex flex-col  space-y-3'>
                <h1 className='text-3xl font-logo'>Phar<c className='text-white'>Map</c></h1>
                <p className='text-gray-300 text-sm'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede ...
                </p>
            </div>
            <div className='flex flex-col space-y-3 text-sm'>
                <h2 className='text-md font-bold text-white'>Contact Us</h2>
                <div className='flex flex-col space-y-2 text-white'>
                    <p>Address : <c className='text-gray-300'>Marrakech</c></p>
                    <p>Phone : <c className='text-gray-300'>+212 6123456</c></p>
                    <p>Mail : <c className='text-gray-300'>ilhamelmdb@gmail.com</c></p>
                </div>
            </div>
            <div className='flex flex-col space-y-3 text-sm'>
                <h2 className='text-md font-bold text-white'>Pages</h2>
                <div className='flex flex-col space-y-2 text-white'>
                    <p>Home</p>
                    <p>Pharmacies</p>
                    <p>Contact us</p>
                    <p>About us</p>
                </div>
            </div>
            <div className='flex flex-col space-y-3 text-sm'>
                <h2 className='text-md font-bold text-white'>Join us</h2>
                <div className='flex flex-col space-y-4 text-white'>
                    <p>Join our newsletter to get latest updates</p>
                    <div className='flex items-center space-x-3 w-full'>
                        <input type='email' placeholder='Your Email' className='text-sm outline-none border-b-2 border-white py-1 bg-main text-white placeholder:text-gray-200 w-2/3'/>
                        <i className='bx bx-envelope text-xl border-b-2 border-white'></i>
                    </div>
                    <div className='flex items-center space-x-3 pt-2'>
                        <i className='bx bxl-facebook'></i>
                        <i className='bx bxl-twitter' ></i>
                        <i className='bx bxl-instagram' ></i>
                        <i className='bx bxl-gmail'></i>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between py-4 border-t border-gray-200 px-10'>
            <p className='text-sm text-gray-200'>Copyright © 2023. All Right Reserved</p>
            <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'>
                <i className='bx bxs-chevrons-up text-main'></i>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Footer
