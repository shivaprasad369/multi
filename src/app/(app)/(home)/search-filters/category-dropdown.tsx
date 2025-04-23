"use client"
import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useDropDwonPosition } from './use-dropdown-position'
import SubcategoryMenu from './subcategory-menu'
interface CategoryDropdownProps{
  category:any
  isActive:boolean
  isNavigationHovered:boolean
}
export default function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}:CategoryDropdownProps) {
    const [isOpen,setIsOpen] = React.useState(false)
 const dropdownRef=useRef<HTMLDivElement>(null)
 const {getDropdownPosition}=useDropDwonPosition(dropdownRef)
const onMouseEnter=()=>{
  if(category.subCategories){
    setIsOpen(true)
    console.log("hello")
  }
}
const onMouseLeave=()=> setIsOpen(false)

const dropdownPosition=getDropdownPosition()
  return (
    <div className='relative'
    
    ref={dropdownRef}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    >
        <div className='relative'>

    <Button variant={'elevated'}
    className={cn(`
        h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white 
        hover:border-primary text-black
   `,
        isActive && !isNavigationHovered && 'bg-white border-primary',
    )}
    >
      {category?.name}
    </Button>
    {category.subCategories && category?.subCategories?.length>0 && (
            <div
            className={cn(
                `opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px]
                border-l-transparent border-b-[10px] border-r-transparent border-b-black left-1/2 -translate-x-1/2`,
                isOpen && 'opacity-100 '
            )}
           />

    )}
        </div>
        <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={getDropdownPosition()}
        />
    </div>
  )
}
