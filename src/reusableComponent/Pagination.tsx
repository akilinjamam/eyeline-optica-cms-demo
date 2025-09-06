import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import type { Frame } from "../types/interface";

type PortionSetter = React.Dispatch<React.SetStateAction<number>>;
type PaginatedDataSetter = React.Dispatch<React.SetStateAction<Frame[]>>
interface IPagination {
    filteredFrames: Frame[];
    ITEMS_PER_PAGE?: number;
    page:number;
    setPage: PortionSetter;
    setPaginatedData: PaginatedDataSetter
}

const Pagination = ({filteredFrames, ITEMS_PER_PAGE=10,page, setPage, setPaginatedData}: IPagination) => {


      const [portion, setPortion] = useState(1);
    const ITEMS_PER_SLOT = 5;
    const totalPages = Math.max(1, Math.ceil(filteredFrames?.length / ITEMS_PER_PAGE));
     const handleNext = () => {
        if((portion * ITEMS_PER_SLOT) > totalPages) return
        setPortion((prev) => prev + 1);
      }
    
      const handlePrev = () => {
        if(portion === 1) return 
        setPortion((prev) => prev - 1);
      }
    
    useEffect(() => {
         const paginatedFrames = filteredFrames.slice((ITEMS_PER_PAGE * page) - ITEMS_PER_PAGE, ITEMS_PER_PAGE * page)
         setPaginatedData(paginatedFrames)
    },[ITEMS_PER_PAGE,filteredFrames, page, setPaginatedData])
    
    const arrayData = Array.from({ length: totalPages })?.map((_, item) => ({id: item+1}));

    return (
         <div className="flex flex-wrap justify-center gap-2 mt-6">
        <Button size="sm"  onClick={() => {
          setPage(1)
          setPortion(1)
        }}>First</Button>
        <Button size="sm"  onClick={handlePrev}>Prev</Button>

        {arrayData?.slice((portion * ITEMS_PER_SLOT) - ITEMS_PER_SLOT , (portion * ITEMS_PER_SLOT) )?.map((item, i) => {
            return (
                <Button
                    key={i}
                    size="sm"
                    variant={page === item.id ? "default" : "outline"}
                    onClick={() => setPage(item.id)}
                >
                    {item.id}
                </Button>
            )
        })}

    <Button>Total Pages ...{totalPages}</Button>

    <Button size="sm" disabled={page === totalPages} onClick={handleNext}>Next</Button>
    <Button size="sm" disabled={page === totalPages} onClick={() => {
      setPage(totalPages)
      setPortion(Math.ceil(totalPages/ITEMS_PER_SLOT))
    }}>Last</Button>
        </div>
    );
};

export default Pagination;