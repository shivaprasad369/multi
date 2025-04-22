"use client"
import React from 'react'
import { Chilanka, Poppins } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import NavbarSlider from './navbar-slider'
import { MenuIcon } from 'lucide-react'
const poppin=Poppins({
    subsets:['latin'],
    weight:['700']
})
interface NavbarItemProps{
    children:React.ReactNode,
    isActive?:boolean,
    href?:string
}
const NavbarItems=({
    children,
    isActive,
    href
}:NavbarItemProps)=>{
    return(
        <Button 
        asChild
        variant={"outline"}
        className={cn(
            isActive && "bg-black text-white hover:text-black hover:bg-white ",
        "hover:bg-transparent rounded-full hover:border-primary  border-transparent px-3.5  text-lg"
        )}
        >
            {/* @ts-ignore */}
            <Link href={href}>
{ children}
            </Link>
        </Button>
    )
}
const navbarItems=[{
    children:'Home',
    href:'/'

},
{
    children:'About',
    href:'/about'
},
{
    children:'Features',
    href:'/features'
},
{
    children:'Pricing',
    href:'/pricing'
},
{
    children:'Contact',
    href:'/contact'
}
]
export default function Navbar() {
    const [isSidebarOpen,setIsSidebarOpen]=React.useState(false)
    const pathname= usePathname()
  return (
    <nav className='h-20 flex border  font-medium  bg-white justify-between'>
      <Link href='/' className="pl-6  flex items-center">
      <span className={cn("text-5xl font-semibold",poppin.className)}>
      Tennzo
      </span>
      </Link>
<NavbarSlider 
open={isSidebarOpen}
onOpenChange={setIsSidebarOpen}
items={navbarItems}

/>
      <div className='items-center gap-4 hidden  lg:flex'>
            {
                navbarItems.map((item)=>(
                    //@ts-ignore
                    <NavbarItems key={item.href} href={item.href}
                     {...item}
                     isActive={pathname===item.href}
                     >
                        {item.children}
                    </NavbarItems>
                ))
            }
      </div>
      <div className='hidden lg:flex '> 
        <Button
        asChild
        variant={"secondary"} className={`
            border-l border-t-0 border-r-0 border-b-0 bg-white rounded-none px-12 h-full 
            hover:bg-pink-400 transition-colors text-lg
            `}>
                <Link href={'/sing-in'}>
            Login
                </Link>
        </Button>
        <Button
        asChild
        className={`
            border-l border-t-0 border-r-0 border-b-0 text-white bg-black rounded-none px-12 h-full 
            hover:bg-pink-400 transition-colors text-lg hover:text-black
            `}>
            <Link href={'/sign-up'}>
            Start selling
            </Link>
        </Button>

      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button variant={'ghost'}
        className='sixe-12 border-transparent bg-white'
        onClick={()=>setIsSidebarOpen(true)}
        >
            <MenuIcon/>
        </Button>
      </div>

    </nav>
  )
}
