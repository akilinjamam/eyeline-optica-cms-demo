import { Button } from "../../../ui/button";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";
import Filteration from "../../../../reusableComponent/filteration";
import usePdfDownloader from "../../../../pdfDownloader/usePdfDownloader";
import TableSkeleton from "../../../TableScaleton";
import type { TableColumn } from "../../../../types/type";
import { useState } from "react";
import type { ILens } from "../../../../types/interface";
import ColumnManager from "../../../../reusableComponent/ColumnManager";
import useWishlistLensList from "./useWishlistLens";

const WishlistLens = () => {

  const {columns, setSearch, search,  filterSummary, paginatedData, setPaginatedData,  filters, page, setPage, filteredDataa, isLoading, showCheck} = useWishlistLensList();

   const defaultColumn = columns?.slice(0,8)
          
  const [dynamicColumns, setDynamicColumns] = useState<TableColumn[]>(defaultColumn);
           
  // Table data
  const tableData = filteredDataa.map((clens: ILens) =>
  dynamicColumns.map(item => clens[item.key as keyof ILens])
  );
        
  // Header
  const header = dynamicColumns.map(item => item.label);
        
  // PDF hook
  const { handleDownloadPDF } = usePdfDownloader(tableData, header, "wishlist-Lens-List");

  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-2xl font-bold mb-4">Lens List</h2> */}
          <div className="flex flex-wrap mb-2">
              <Button className="mb-2 lg:mb-0 w-full lg:w-auto" onClick={handleDownloadPDF} size="sm">Download PDF</Button>
              <ColumnManager columns={columns} dynamicColumns={dynamicColumns} setDynamicColumns={setDynamicColumns} />
          </div>
        </div>

  
      <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar ">
        {/* Accordion for Search + Filters */}
        {
          isLoading
          ?  
          <TableSkeleton/>
          :
          <>
            <Filteration filterSummary={filterSummary} search={search} setSearch={setSearch}  filters={filters} showPriceRange={true}/>

            {/* Table */}
            <Table column={dynamicColumns} paginatedData={paginatedData}  actionColumn={[]} showCheck={showCheck}/>
          </>
        }
      </div>
        {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredProduct={filteredDataa} setPaginatedData={setPaginatedData}/>
      </div>
  );
};

export default WishlistLens;
