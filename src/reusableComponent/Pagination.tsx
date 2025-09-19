/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import type { ContactLens, Frame, ILens} from "../types/interface";
import type { TRegistration } from "../types/type";

type PortionSetter = React.Dispatch<React.SetStateAction<number>>;
type PaginatedDataSetter = React.Dispatch<React.SetStateAction<Frame[] | ILens | ContactLens | TRegistration | any>>
interface IPagination {
    filteredProduct: any;
    ITEMS_PER_PAGE?: number;
    page:number;
    setPage: PortionSetter;
    setPaginatedData: PaginatedDataSetter
}

const Pagination = ({filteredProduct, ITEMS_PER_PAGE=10,page, setPage, setPaginatedData}: IPagination) => {


      const [portion, setPortion] = useState(1);
    const ITEMS_PER_SLOT = 5;
    const totalPages = Math.max(1, Math?.ceil(filteredProduct?.length / ITEMS_PER_PAGE));
     const handleNext = () => {
        if((portion * ITEMS_PER_SLOT) > totalPages) return
        setPortion((prev) => prev + 1);
      }
    
      const handlePrev = () => {
        if(portion === 1) return 
        setPortion((prev) => prev - 1);
      }
    
    useEffect(() => {
         const paginatedFrames = filteredProduct?.slice((ITEMS_PER_PAGE * page) - ITEMS_PER_PAGE, ITEMS_PER_PAGE * page)
         setPaginatedData(paginatedFrames)
    },[ITEMS_PER_PAGE,filteredProduct, page, setPaginatedData])
    
    const arrayData = Array.from({ length: totalPages })?.map((_, item) => ({id: item+1}));

    return (
        <div className="w-full flex items-center justify-center">
          <div className="absolute bottom-20 flex flex-wrap justify-center gap-2">
            <Button className="hidden lg:block" size="sm"  onClick={() => {
              setPage(1)
              setPortion(1)
            }}>First</Button>
            <Button size="sm"  onClick={handlePrev}>Prev</Button>

            {arrayData?.slice((portion * ITEMS_PER_SLOT) - ITEMS_PER_SLOT , (portion * ITEMS_PER_SLOT) )?.map((item, i) => {
                return (
                    <Button
                        key={i}
                        size="sm"
                        variant={page === item?.id ? "default" : "outline"}
                        onClick={() => setPage(item?.id)}
                    >
                        {item?.id}
                    </Button>
                )
            })}

            <Button className="hidden lg:block">Total Pages ...{totalPages}</Button>

            <Button size="sm" disabled={page === totalPages} onClick={handleNext}>Next</Button>
            <Button className="hidden lg:block" size="sm" disabled={page === totalPages} onClick={() => {
              setPage(totalPages)
              setPortion(Math?.ceil(totalPages/ITEMS_PER_SLOT))
            }}>Last</Button>
          </div>
        </div>
    );
};

export default Pagination;