

const Skeleton = ({ className }: { className: string }) => {
  return (
    <div className={`animate-pulse bg-gray-600 ${className}`} />
  )
}

export default Skeleton