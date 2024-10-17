import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import ShopGridSection from '@/components/shopgridsection/ShopGridSection'
import ShopUpperSection from '@/components/shopuppersection/ShopUpperSection'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
        <Navbar/>
        <ShopUpperSection/>
        <ShopGridSection/>
        <Footer/>
    </div>
  )
}

export default page