
import React from 'react'
import { Category } from '../../../../../payload-types'
import Link from 'next/link'

interface Props{
    category:Category,
    isOpen:boolean,
    position:{top:number,left:number}
    
}
export default function SubcategoryMenu({
    category,
    isOpen,
    position

}:Props) 
{
    if(!isOpen || !category.subcategories || !category?.subcategories?.docs?.length){
        return null
    }
    const backgroundColor=category?.color ||"#F5F5F5";
    console.log(backgroundColor)
  return (
    <div 
    className='fixed z-100'
    style={{
        top:position.top+55,
        left:position.left
    }
}
    >
      <div className="h-3 w-60">
        <div
        style={{backgroundColor}}
        className={`w-50 text-black rounded-md overflow-hidden border
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]
        `}>
         <div>
          {/* @ts-ignore */}
            {category?.subCategories?.map((subcategory:any)=>
               <Link 
               key={subcategory.slug}
               href={`/${category.slug}/${subcategory.slug}`}
               className='text-black w-full text-left  p-4 
               hover:bg-black hover:text-white flex justify-between 
               items-center underline font-medium'
               >
                {subcategory.name}
               </Link>
            )}
         </div>
        </div>
      </div>
    </div>
  )
}
