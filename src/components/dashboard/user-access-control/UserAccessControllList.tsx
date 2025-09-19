import { useState } from "react";
import useUserAccessControllList from "./useUserAccessControllList";
import type { TableColumn, TRegistration } from "../../../types/type";
import usePdfDownloader from "../../../pdfDownloader/usePdfDownloader";
import { Button } from "../../ui/button";
import ColumnManager from "../../../reusableComponent/ColumnManager";
import Filteration from "../../../reusableComponent/filteration";
import Table from "../../../reusableComponent/Table";
import Pagination from "../../../reusableComponent/Pagination";
import TableSkeleton from "../../TableScaleton";

const UserAccessControllList = () => {

        const {actionColumns,filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, showCheck} = useUserAccessControllList();

        const defaultColumn = columns?.slice(0,8)
       
         const [dynamicColumns, setDynamicColumns] = useState<TableColumn[]>(defaultColumn); // initially your normal columns
        
         // Table data
         const tableData = filteredData.map((clens: TRegistration) =>
           dynamicColumns.map(item => clens[item.key as keyof TRegistration])
         );
     
         // Header
         const header = dynamicColumns.map(item => item.label);
     
         // PDF hook
         const { handleDownloadPDF } = usePdfDownloader(tableData, header, "User-List");
     
       
        return (
        <div className="px-4 py-2 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between">
            {/* <h2 className="text-2xl font-bold mb-4">Frame List</h2> */}
            <div className="flex  justify-end mb-2">
             <div className="flex flex-wrap mb-2">
                <Button className="ml-0 lg:mb-0 mb-2 w-full lg:w-auto " onClick={handleDownloadPDF} size="sm">Download PDF</Button>
                <ColumnManager columns={columns} dynamicColumns={dynamicColumns} setDynamicColumns={setDynamicColumns} />
            </div>
            </div>
          </div>

          <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar">
            {isLoading ? (
              <TableSkeleton/>
            ) : (
              <>
                <Filteration
                  filterSummary={filterSummary}
                  search={search}
                  setSearch={setSearch}
                  filters={filters}
                  showPriceRange={false}
                />
                <Table column={dynamicColumns} paginatedData={paginatedData} actionColumn={actionColumns} showCheck={showCheck}/>
              </>
            )}
          </div>

          {!isLoading && (
            <Pagination
              page={page}
              setPage={setPage}
              filteredProduct={filteredData}
              setPaginatedData={setPaginatedData}
            />
          )}
        </div>
      );
};

export default UserAccessControllList; 
