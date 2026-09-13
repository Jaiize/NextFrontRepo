import Skeleton from "../components/skeleton";


const SkeletonPage = () => {
  
  return (
    <section className="w-full h-full mt-4">
      <main className="overflow-hidden max-sm:mt-5.5">
        <div className="flex flex-col justify-center w-full mb-5 max-sm:mb-6">
          <div className="flex flex-row justify-center w-full -mt-4 mb-7">
            <Skeleton className={`w-[28%] max-sm:w-[80%] max-md:w-[50%] max-sm:h-7 rounded-xl h-9 max-sm:mt-15 max-sm:px-1 mt-10 mb-2 max-sm:mb-0`}/>
          </div>
          {/* Wrapper for search bar */}
          <div className="flex justify-center w-full mb-5">
            <Skeleton className="w-[35%] h-10 rounded-2xl max-sm:w-[65%] max-sm:h-9" />
          </div>
        </div>
        {/* Wrapper for sorting */}
        <Skeleton className="flex flex-row items-center justify-between shadow-sm w-53 ml-3 max-sm:ml-3.5 h-10 px-3 rounded-xl max-sm:w-47 max-sm:h-8 max-sm:pl-3" />
        {/* Grid view */}
        <ul
          className={`grid grid-cols-1 sm:grid-cols-2 justify-items-center 2xl:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 p-2`}
        >
          {Array.from({length: 12}).map((g: any, i) => (
            <li key={i} className="w-full h-88.5">
              {/* Card image */}
              <Skeleton className="rounded-t-lg min-w-full h-48" />
              {/* Console or platforms svg */}
              <div className="flex flex-row justify-start items-center w-fit">
                {Array.from({ length: 3 }).map((p: any, i) => 
                  <Skeleton key={i}  className="ml-2 rounded-full h-5 w-5 mt-2" />)
                }
              </div>
              {/* Game title / name */}
              <Skeleton className="ml-2 w-20 my-2 rounded-xl h-5" />  
              {/* Game rating */}
              <Skeleton className="ml-2 w-15 rounded-xl h-5" />  
              {/* Show more / less */}
              <div className="flex flex-row justify-center items-center">
                <Skeleton className="w-15 mt-5 h-5 rounded-xl" />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default SkeletonPage;