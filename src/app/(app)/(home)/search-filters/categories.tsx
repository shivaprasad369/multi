'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Category } from '../../../../../payload-types'
import CategoryDropdown from './category-dropdown'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ListFilterIcon } from 'lucide-react'
import CategoriesSidebar from './categories-sidebar'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function Categories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [isAnyHovered, setIsAnyHovered] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const activeCategory = 'all'
  const activeCategoryIndex = data?.findIndex((category) => category.slug === activeCategory)
  const isActiveCategoryHidden = activeCategoryIndex !== -1 && activeCategoryIndex >= visibleCount

  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const availableWidth = containerWidth - viewAllWidth

      const items = Array.from(measureRef.current.children)
      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width
        if (totalWidth + width <= availableWidth) {
          totalWidth += width
          visible++
        } else {
          break
        }
      }

      setVisibleCount(visible)
    }

    const resizeObserver = new ResizeObserver(calculateVisibleCount)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Run once on mount
    calculateVisibleCount()

    return () => {
      resizeObserver.disconnect()
    }
  }, [data.length])

  console.log('Visible Count:', visibleCount)

  return (
    <div className='relative w-full'>
      {
  <CategoriesSidebar
  open={isSidebarOpen}
  onOpenChange={setIsSidebarOpen}
  // data={data}
/>
      }
      {/* measure width */}
      <div
        ref={measureRef}
        className='absolute opacity-0 pointer-events-none flex'
        style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}
      >
        {data?.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className='flex -mb-[2rem] flex-nowrap items-center'
      >
        {data?.slice(0, visibleCount).map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}

        <div ref={viewAllRef} className='shrink-0 mb-[2rem]'>
          <Button
            variant='elevated'
            className={cn(
              `
                h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white 
                hover:border-primary text-black
              `,
              isActiveCategoryHidden && !isAnyHovered && 'bg-white border-primary'
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className='ml-2 ' />
          </Button>
        </div>
      </div>
    </div>
  )
}
