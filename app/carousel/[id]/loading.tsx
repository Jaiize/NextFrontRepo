import Skeleton from '@/components/skeleton'

const CarouselSkeleton = () => {
  return (
    <section className='min-h-screen w-full mb-10'>
        <Skeleton className='w-full h-250' />

        <div className='flex flex-col mx-3'>
            <Skeleton className='w-30 h-6 my-10 rounded-lg' />
            <div className='flex flex-row flex-wrap gap-5 w-full'>
                {Array.from({ length: 3 }).map((p, i) => 
                    <Skeleton key={i} className='w-35 h-17 rounded-xl' />
                )}
            </div>
        </div>

    </section>
  )
}

export default CarouselSkeleton