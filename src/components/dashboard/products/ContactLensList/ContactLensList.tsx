import { Button } from "../../../ui/button";
import type { ContactLens} from "../../../../types/interface";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";
import Filteration from "../../../../reusableComponent/filteration";
import useContactList from "./useContactList";
import usePdfDownloader from "../../../../pdfDownloader/usePdfDownloader";
import TableSkeleton from "../../../TableScaleton";
import { useState } from "react";
import type { TableColumn } from "../../../../types/type";
import ColumnManager from "../../../../reusableComponent/ColumnManager";

const ContactLensList = () => {

  
  
  const {actionColumns, columns, filterSummary, filteredData, filters, maxPrice, minPrice, page, paginatedData, search, setSearch, setMaxPrice, setMinPrice, setPaginatedData, setPage,isLoading} = useContactList()
    const defaultColumn = columns?.slice(0,8)
  
    const [dynamicColumns, setDynamicColumns] = useState<TableColumn[]>(defaultColumn); // initially your normal columns
   
    // Table data
    const tableData = filteredData.map((clens: ContactLens) =>
      dynamicColumns.map(item => clens[item.key as keyof ContactLens])
    );

    // Header
    const header = dynamicColumns.map(item => item.label);

    // PDF hook
    const { handleDownloadPDF } = usePdfDownloader(tableData, header, "Contact-Lens-List");

  

  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-2xl font-bold mb-4">Contact Lens List</h2> */}
          <div className="flex mb-2">
              <Button className="ml-0" onClick={handleDownloadPDF} size="sm">Download PDF</Button>
              <ColumnManager columns={columns} dynamicColumns={dynamicColumns} setDynamicColumns={setDynamicColumns} />
              
          </div>
        </div>
        
        <div className="w-full h-[70vh] overflow-y-scroll hide-scrollbar">
          {isLoading ? 
            <TableSkeleton />
             : 
            <>
              {/* Accordion for Search + Filters */}
              <Filteration
                filterSummary={filterSummary}
                search={search}
                setSearch={setSearch}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                minPrice={minPrice}
                filters={filters}
                showPriceRange={true}
              />

              {/* Table (has its own horizontal scroll + drag) */}
              <Table
                column={dynamicColumns}
                paginatedData={paginatedData}
                actionColumn={actionColumns}
              />
            </>
          }
        </div>
        {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredProduct={filteredData} setPaginatedData={setPaginatedData}/>
      </div>
  );
};

export default ContactLensList;
