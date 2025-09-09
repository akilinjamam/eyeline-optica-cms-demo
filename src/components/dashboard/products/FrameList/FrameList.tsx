import { Button } from "../../../ui/button";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";
import Filteration from "../../../../reusableComponent/filteration";

import useFrameList from "./useFrameList";
import usePdfDownloader from "../../../../pdfDownloader/usePdfDownloader";
import type { IFrame } from "../../../../types/interface";
import TableScaleton from "../../../TableScaleton";

const FrameList = () => {

  const header = [
          "SL",
          "Name",
          "Type",
          "Material",
          "Shape",
          "Color",
          "Size",
          "Price",
          "Qty",
        ];
        
        const {actionColumns, columns, filterSummary, filters, maxPrice, setMaxPrice, minPrice, setMinPrice, page, setPage, paginatedData, search, setSearch, setPaginatedData,filteredData, isLoading} = useFrameList();

        // Table data
        const tableData = filteredData.map((frame: IFrame) => [
          frame.id,
          frame.name,
          frame.type,
          frame.materialsCategory,
          frame.shapeCategory,
          frame.color,
          frame.sizeCategory,
          frame.salesPrice,
          frame.quantity,
        ]);

        
        const {handleDownloadPDF} = usePdfDownloader(tableData,header, "Frame-List")
        return (
        <div className="px-4 py-2 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Frame List</h2>
            <div className="flex justify-end mb-2">
              <Button onClick={handleDownloadPDF} size="sm">Download PDF</Button>
            </div>
          </div>

          <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar">
            {isLoading ? (
              <TableScaleton/>
            ) : (
              <>
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
                <Table column={columns} paginatedData={paginatedData} actionColumn={actionColumns} />
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

export default FrameList; 
