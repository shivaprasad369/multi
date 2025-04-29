import React, { Suspense } from 'react'
import configPromise from '../../../../payload.config'
import { Category } from '../../../../payload-types'
import { getPayload } from 'payload'

import Navbar from './navbar'
import Footer from './footer'
import SearchFilter, { SearchFilterLoading } from './search-filters'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
interface props {
  children: React.ReactNode
}
export default async function Layout({children}: props) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  );
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading/>}>
        <SearchFilter />
        </Suspense>
        </HydrationBoundary>
        <div className='flex-1 bg-[#f4f4f0]'>
      {children}

        </div>
      <Footer/>
    </div>
  )
}
