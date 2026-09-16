import Skeleton from '@/components/skeleton'

const CarouselSkeleton = () => {
  return (
    <section className='min-h-screen min-w-screen'>
        <div className='min-w-full h-1/2 flex flex-col items-center relative justify-center overflow-hidden'>
            <Skeleton className='min-w-full h-full top-0 left-0 aspect-video object-cover absolute' />
        </div>

        <div className='flex flex-col mx-3'>
            <Skeleton className='w-20 h-6' />
            {Array.from({ length: 3 }).map((p, i) => 
                <Skeleton key={i} className='w-20 h-15' />
            )}
        </div>

    </section>
  )
}

export default CarouselSkeleton