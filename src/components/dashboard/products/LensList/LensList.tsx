/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../../../ui/button";

import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";

import Filteration from "../../../../reusableComponent/filteration";

import useLenseList from "./useLenseList";
import usePdfDownloader from "../../../../pdfDownloader/usePdfDownloader";
import TableSkeleton from "../../../TableScaleton";

const LensList = () => {

  const {actionColumns, columns, filterSummary, filteredDataa, filters, maxPrice, setMaxPrice, minPrice,setMinPrice, page, setPage, paginatedData, search, setPaginatedData, setSearch, isLoading} = useLenseList();

   // Table data
    const tableData = filteredDataa.map((lens:any) => [
      lens.id,
      lens.name,
      lens.lensType,
      lens.material,
      lens.index,
      lens.color,
      lens.salesPrice,
      lens.stock,
    ]);

    const header = ["SL", "Name", "Type", "Material", "Shape", "Color", "Size", "Price"]

    const {handleDownloadPDF} = usePdfDownloader(tableData, header, "Lens-List")

  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Lens List</h2>
          <div className="flex justify-end mb-2">
              <Button onClick={handleDownloadPDF} size="sm">Download PDF</Button>
          </div>
        </div>

  
      <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar ">
        {/* Accordion for Search + Filters */}
        {
          isLoading
          ?  
          <TableSkeleton/> // loading scheleton
          :
          <>
            <Filteration filterSummary={filterSummary} search={search} setSearch={setSearch} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} minPrice={minPrice} filters={filters} showPriceRange={true}/>

            {/* Table */}
            <Table column={columns} paginatedData={paginatedData}  actionColumn={actionColumns}/>
          </>
        }
      </div>
        {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredProduct={filteredDataa} setPaginatedData={setPaginatedData}/>
      </div>
  );
};

export default LensList;
