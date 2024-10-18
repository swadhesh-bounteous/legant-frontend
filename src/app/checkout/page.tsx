import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'
import OrderSummary from './OrderSummary'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <OrderSummary/>
        <Footer/>
    </div>
  )
}

export default page