import React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@radix-ui/react-scroll-area'
interface NavbarItem{
    href?:string,
    children:React.ReactNode
}
interface props{
    items:NavbarItem[],
    open:boolean,
   onOpenChange:(open:boolean)=>void
}

export default function NavbarSlider({
    items,
    open,
    onOpenChange
}:props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
        side='left'
        className='p-0 transition-none'
        >
            <SheetHeader className='p-4 border-b'>
                <div className='flex items-center'>
                    <SheetTitle>
                        Menu
                    </SheetTitle>
                </div>

            </SheetHeader>
            <ScrollArea>
               
                    <div className='flex flex-col overflow-y-auto h-full pb-2'>
                        {
                            items.map((item)=>(
                                <Link key={item.href}
                                onClick={()=>onOpenChange(false)}
                                className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                                //@ts-ignore
                                
                                href={item.href} {...item}>
                                    {item.children}
                                </Link>
                            ))
                        }
                        <Link href='/sign-in'
                        onClick={()=>onOpenChange(false)}
                         className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
                        Login
                        </Link>
                        <Link href='/sign-up'
                        onClick={()=>onOpenChange(false)}
                         className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
                        Start selling
                        </Link>
                    </div>
            </ScrollArea>

        </SheetContent>
      
    </Sheet>
  )
}
