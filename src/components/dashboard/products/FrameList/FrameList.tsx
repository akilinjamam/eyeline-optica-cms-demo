import { useState, useMemo, useEffect } from "react";

import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

import type { Frame } from "../../../../types/interface";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";
import { sampleData } from "../../../../dummyData/dummyData";
import type { TableColumn } from "../../../../types/type";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../ui/accordion";
import {Search} from 'lucide-react'

const FrameList = () => {

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "center" },
  { key: "name", label: "Name", align: "center" },
  { key: "type", label: "Type", align: "center" },
  { key: "material", label: "Material", align: "center" },
  { key: "shape", label: "Shape", align: "center" },
  { key: "color", label: "Color", align: "center" },
  { key: "size", label: "Size", align: "center" },
  { key: "price", label: "Price", align: "center" },
  { key: "quantity", label: "Qty", align: "center" },
  // { key: "actions", label: "Actions", align: "center" },
];


  const [frames, setFrames] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [filterShape, setFilterShape] = useState("all");
  const [paginatedData, setPaginatedData] = useState<Frame[]>([])
  const [page, setPage] = useState(1);

   const [minPrice, setMinPrice] = useState(""); // New state
    const [maxPrice, setMaxPrice] = useState(""); // New state


  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterMaterial, filterShape]);

  const filteredFrames = useMemo(() => {
    return frames.filter(frame => {
      const matchSearch =
        frame.name.toLowerCase().includes(search.toLowerCase()) ||
        frame.type.toLowerCase().includes(search.toLowerCase()) ||
        frame.color.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : frame.type === filterType;
      const matchMaterial = filterMaterial === "all" ? true : frame.material === filterMaterial;
      const matchShape = filterShape === "all" ? true : frame.shape === filterShape;

       const matchPrice =
        (minPrice === "" || frame.price >= Number(minPrice)) &&
        (maxPrice === "" || frame.price <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial && matchShape && matchPrice;
    });
  }, [frames, search, filterType, filterMaterial, filterShape, minPrice, maxPrice]);
  

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(frames.filter(f => f.id !== id));
    }
  };

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterType !== "all") activeFilters.push(`Type: ${filterType}`);
  if (filterMaterial !== "all") activeFilters.push(`Material: ${filterMaterial}`);
  if (filterShape !== "all") activeFilters.push(`Shape: ${filterShape}`);
  if (minPrice) activeFilters.push(`Min: ${minPrice}`);
  if (maxPrice) activeFilters.push(`Max: ${maxPrice}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";



  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Frame List</h2>
          <div className="flex justify-end mb-2">
              <Button size="sm">Download PDF</Button>
          </div>
        </div>

  
      <div className="w-full h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar ">
        {/* Accordion for Search + Filters */}
        <Accordion type="single" collapsible className="mb-4 bg-gray-100 rounded-md px-2">
          <AccordionItem value="filters">
            <AccordionTrigger className="text-lg font-medium">
              <span><Search/></span>
               <span className="text-sm text-gray-500">{filterSummary}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2">
                {/* Search */}
                <Input
                  placeholder="Search by name, type, color..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full mb-2"
                />

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <Select onValueChange={setFilterType}>
                    <SelectTrigger className="w-full lg:w-40 md:w-40">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Sunglasses">Sunglasses</SelectItem>
                      <SelectItem value="Eyeglasses">Eyeglasses</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={setFilterMaterial}>
                    <SelectTrigger className="lg:w-40 md:w-40 w-full">
                      <SelectValue placeholder="Filter by Material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Materials</SelectItem>
                      <SelectItem value="Acetate">Acetate</SelectItem>
                      <SelectItem value="Metal">Metal</SelectItem>
                      <SelectItem value="Plastic">Plastic</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={setFilterShape}>
                    <SelectTrigger className="lg:w-40 md:w-40 w-full">
                      <SelectValue placeholder="Filter by Shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Shapes</SelectItem>
                      <SelectItem value="Round">Round</SelectItem>
                      <SelectItem value="Rectangle">Rectangle</SelectItem>
                      <SelectItem value="Oval">Oval</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Price Range */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-30"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-30"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Table */}
        <Table column={columns} paginatedData={paginatedData} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
        {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredFrames={filteredFrames} setPaginatedData={setPaginatedData}/>
    </div>
  );
};

export default FrameList;
