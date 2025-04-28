import React from 'react'
import configPromise from '../../../../payload.config'
import { Category } from '../../../../payload-types'
import { getPayload } from 'payload'

import Navbar from './navbar'
import Footer from './footer'
import SearchFilter from './search-filters'
interface props {
  children: React.ReactNode
}
export default async function Layout({children}: props) {
  const payload = await getPayload({
    config: configPromise,
  })
  
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination:false,
   sort: "name",
   

    where: {
      parent: {
        exists: false,
      },
    },
  })
  // console.log(data)
  const formatedData = data.docs.map((doc) => ({
    ...doc,
    subCategories:(doc.subcategories?.docs?? []).map((doc:any)=>({
      ...(doc as Category),
      subcategories:undefined
    }))
  }))
  // console.log(formatedData, data)
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <SearchFilter data={formatedData}/>
        <div className='flex-1 bg-[#f4f4f0]'>
      {children}

        </div>
      <Footer/>
    </div>
  )
}
