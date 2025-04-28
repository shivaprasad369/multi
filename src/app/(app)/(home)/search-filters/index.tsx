"use client"
import React from 'react'
import SearchInput from './search-input'
import Categories from './categories'
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function SearchFilter() {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className='px-4 w-full lg:px-12 py-6 border-b flex flex-col gap-4'>
     <SearchInput disabled={false}/>
     <Categories data={data}/>
      {/* {JSON.stringify(data)} */}
    </div>
  )
}
