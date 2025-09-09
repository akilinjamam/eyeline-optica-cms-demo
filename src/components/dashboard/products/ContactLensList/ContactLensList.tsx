import { Button } from "../../../ui/button";
import type { ContactLens} from "../../../../types/interface";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";

import Filteration from "../../../../reusableComponent/filteration";

import useContactList from "./useContactList";
import usePdfDownloader from "../../../../pdfDownloader/usePdfDownloader";

const ContactLensList = () => {

  const {actionColumns, columns, filterSummary, filteredData, filters, maxPrice, minPrice, page, paginatedData, search, setSearch, setMaxPrice, setMinPrice, setPaginatedData, setPage} = useContactList()

  
    // Table data
    const tableData = filteredData.map((clens:ContactLens) => [
      clens.id,
      clens.name,
      clens.type,
      clens.material,
      clens.baseCurve,
      clens.color,
      clens.salesPrice,
      clens.stock,
    ]);

    const header = ["SL", "Name", "Type", "Material", "Shape", "Color", "Size", "Price"]

  const {handleDownloadPDF} = usePdfDownloader(tableData, header, "Contact-Lens-List")

  
  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Contact Lens List</h2>
          <div className="flex justify-end mb-2">
              <Button onClick={handleDownloadPDF} size="sm">Download PDF</Button>
          </div>
        </div>

  
      <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar ">
        {/* Accordion for Search + Filters */}
       <Filteration filterSummary={filterSummary} search={search} setSearch={setSearch} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} minPrice={minPrice} filters={filters} showPriceRange={true}/>

        {/* Table */}
        <Table column={columns} paginatedData={paginatedData}  actionColumn={actionColumns}/>
      </div>
        {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredProduct={filteredData} setPaginatedData={setPaginatedData}/>
      </div>
  );
};

export default ContactLensList;
