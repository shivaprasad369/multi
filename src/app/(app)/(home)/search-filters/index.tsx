import React from 'react'
import SearchInput from './search-input'
import Categories from './categories'


export default function SearchFilter() {
 
  return (
    <div
    style={{backgroundColor:'#f5f5f5'}}
    className='px-4 w-full lg:px-12 py-6 border-b flex flex-col gap-4'>
     <SearchInput disabled={false}/>
     <Categories/>
      {/* {JSON.stringify(data)} */}
    </div>
  )
}
export const SearchFilterLoading=()=> {
 
  return (
    <div 
    style={{backgroundColor:'#f5f5f5'}}
    className='px-4 w-full lg:px-12 py-6 border-b flex flex-col gap-4'>
     <SearchInput disabled={false}/>
     <div className='hidden lg:block'>
      <div className="h-10"></div>
     </div>
    </div>
  )
}