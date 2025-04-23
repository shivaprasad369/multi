import { SearchIcon } from 'lucide-react'
import React from 'react'
import SearchInput from './search-input'
import Categories from './categories'
interface props {
  data:any
}
export default function SearchFilter({data}:props) {
    
  return (
    <div className='px-4 w-full lg:px-12 py-6 border-b flex flex-col gap-4'>
     <SearchInput disabled={false}/>
     <Categories data={data}/>
      {/* {JSON.stringify(data)} */}
    </div>
  )
}
