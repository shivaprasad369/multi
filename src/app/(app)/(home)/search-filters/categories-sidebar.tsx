import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import { Category } from '../../../../../payload-types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
 interface Props{
    open:boolean,
    onOpenChange:(open:boolean)=>void,
    data:Category[]
}
export default function CategoriesSidebar({open,onOpenChange,data}:Props) {
    const [parentCategories,setParentCategories]=React.useState<Category[] | null>(null)
    const [selectedCategory,setSelectedCategory]=React.useState<Category  | null>(null)
 const router = useRouter()

    const correctVategory=parentCategories??data??[]

    const handleOpenChange=(open:boolean)=>{
        setParentCategories(null)
        setSelectedCategory(null)
        onOpenChange(open)
       
    }

 const handleCategoryClick=(category:Category)=>{
    //@ts-ignore
    if(category.subcategories && category.subCategories?.length>0){
        //@ts-ignore
        setParentCategories(category.subCategories as Category[])
        setSelectedCategory(category)
    }else{
        if(parentCategories &&selectedCategory){
            router.push(`/${selectedCategory.slug}/${category.slug}`)
        }else{
            if(category.slug==='all'){
                router.push('/')
            }else{
            router.push(`/${category.slug}`)
        }
        }
        handleOpenChange(false)
        }
    }
const handleBackClick=()=>{
    if(parentCategories){
        setParentCategories(null)
        setSelectedCategory(null)
    }
}
const backgroundColor=selectedCategory?.color || "#F5F5F5"
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
    
    
       

      <SheetContent
      side="left"
      className='p-0 transition-none'
      style={{backgroundColor}}
      >
        <SheetHeader >
         <SheetTitle>
            Categories
        </SheetTitle>
        </SheetHeader>
      <ScrollArea className='flex flex-col h-full  overflow-y-auto'>
        {parentCategories && (
            <button
           
            onClick={()=>handleBackClick()}
            className='w-full border-0 rounded-0 text-left p-4 hover:bg-black hover:text-white
             flex items-center  text-base font-medium'
            >
                <ChevronLeft className='size-4 mr-2'/>
                Back
            </button>
        )
    }
        {correctVategory?.map((category:Category)=>(
            <div key={category.id}>
                <button
                
                className='w-full border-0 rounded-0 text-left p-4 hover:bg-black hover:text-white
                 flex items-center cursor-pointer text-base font-medium'
                onClick={()=> handleCategoryClick(category)  }
                >
                    {category.name}
                    {/* @ts-ignore */}
                    {category.subcategories && category.subCategories?.length>0 && (
                        <ChevronRightIcon className='size-4 ml-auto'/>
                    )}
                </button>
            </div>
        ))}
      </ScrollArea>
       
      </SheetContent>
    </Sheet>
  )
}
