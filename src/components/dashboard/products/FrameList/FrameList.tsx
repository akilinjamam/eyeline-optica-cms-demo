/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "../../../ui/button";
import type { Frame } from "../../../../types/interface";
import Pagination from "../../../../reusableComponent/Pagination";
import Table from "../../../../reusableComponent/Table";
import { sampleData } from "../../../../dummyData/dummyData";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import Filteration from "../../../../reusableComponent/filteration";
import { Edit, Trash2 } from "lucide-react";

const FrameList = () => {

    const handleDownloadPDF = () => {
    const doc = new jsPDF();

     const pageWidth = doc.internal.pageSize.getWidth();

    // 🏪 Shop Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Eyeline Optica", pageWidth / 2, 15, { align: "center" });

    // 📅 Current Date
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${today}`, pageWidth / 2, 22, { align: "center" });

    // Title
    doc.setFontSize(18);
    doc.text("Frame List", 14, 15);

    

    // Table data
    const tableData = filteredFrames.map((frame:any) => [
      frame.id,
      frame.name,
      frame.type,
      frame.material,
      frame.shape,
      frame.color,
      frame.size,
      frame.price,
      frame.quantity,
    ]);

    // Generate table
    autoTable(doc, {
      head: [["SL", "Name", "Type", "Material", "Shape", "Color", "Size", "Price", "Qty"]],
      body: tableData,
      startY: 25,
      styles: { halign: "center", fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] },
    });

    // Save the PDF
    doc.save("frame-list.pdf");
  };

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

  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("all");

  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterMaterial, filterShape]);

 const filteredFrames = useMemo(() => {

    const filteredData:any = frames.filter(frame => {
      const matchSearch =
        frame.name.toLowerCase().includes(search.toLowerCase()) ||
        frame.type.toLowerCase().includes(search.toLowerCase()) ||
        frame.color.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : frame.type === filterType;
      const matchMaterial = filterMaterial === "all" ? true : frame.material === filterMaterial;
      const matchShape = filterShape === "all" ? true : frame.shape === filterShape;
      const matchColor = color === "all" ? true : frame.color === color

       const matchPrice =
        (minPrice === "" || frame.price >= Number(minPrice)) &&
        (maxPrice === "" || frame.price <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial && matchShape && matchPrice && matchColor;
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [frames, search, filterType, filterMaterial, filterShape, minPrice, maxPrice, color]);
  

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


  const filters = [
    {
      label: "Type",
      placeholder: "Filter by Type",
      options: [
        { value: "all", label: "All Types" },
        { value: "Sunglasses", label: "Sunglasses" },
        { value: "Eyeglasses", label: "Eyeglasses" },
      ],
      onChange: setFilterType,
    },
    {
      label: "Material",
      placeholder: "Filter by Material",
      options: [
        { value: "all", label: "All Materials" },
        { value: "Acetate", label: "Acetate" },
        { value: "Metal", label: "Metal" },
        { value: "Plastic", label: "Plastic" },
      ],
      onChange: setFilterMaterial,
    },
    {
      label: "Shape",
      placeholder: "Filter by Shape",
      options: [
        { value: "all", label: "All Shapes" },
        { value: "Round", label: "Round" },
        { value: "Rectangle", label: "Rectangle" },
        { value: "Oval", label: "Oval" },
      ],
      onChange: setFilterShape,
    },
    {
      label: "Color",
      placeholder: "Filter by Color",
      options: [
        { value: "all", label: "All Shapes" },
        { value: "Silver", label: "Silver" },
        { value: "Red", label: "Red" },
        { value: "Black", label: "Black" },
      ],
      onChange: setColor,
    },
  ]

  const actionColumns: ActionColumn[] = [
  {
    logo: <Edit className="w-4 h-4 text-green-800"/>,
    type: "edit",
    render: handleEdit
  },
  {
    logo: <Trash2 className="w-4 h-4 text-red-800"/>,
    type: "delete",
    render: handleDelete
  },
]

  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Frame List</h2>
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
       <Pagination page={page} setPage={setPage} filteredFrames={filteredFrames} setPaginatedData={setPaginatedData}/>
      </div>
  );
};

export default FrameList;
