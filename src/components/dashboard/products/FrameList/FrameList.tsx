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

const FrameList = () => {

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "type", label: "Type", align: "left" },
  { key: "material", label: "Material", align: "left" },
  { key: "shape", label: "Shape", align: "left" },
  { key: "color", label: "Color", align: "left" },
  { key: "size", label: "Size", align: "left" },
  { key: "price", label: "Price", align: "left" },
  { key: "quantity", label: "Qty", align: "left" },
  // { key: "actions", label: "Actions", align: "center" },
];


  const [frames, setFrames] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [filterShape, setFilterShape] = useState("all");
  const [paginatedData, setPaginatedData] = useState<Frame[]>([])
  const [page, setPage] = useState(1);


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

      return matchSearch && matchType && matchMaterial && matchShape;
    });
  }, [frames, search, filterType, filterMaterial, filterShape]);
  


 

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(frames.filter(f => f.id !== id));
    }
  };


  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Frame List</h2>
        <div className="flex justify-end mb-2">
            <Button size="sm">Download PDF</Button>
        </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <Input
          placeholder="Search by name, type, color..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />

        <div className="flex flex-wrap gap-2">
          <Select onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Sunglasses">Sunglasses</SelectItem>
              <SelectItem value="Eyeglasses">Eyeglasses</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterMaterial}>
            <SelectTrigger className="w-40">
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
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shapes</SelectItem>
              <SelectItem value="Round">Round</SelectItem>
              <SelectItem value="Rectangle">Rectangle</SelectItem>
              <SelectItem value="Oval">Oval</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

     {/* Table */}
      <Table column={columns} paginatedData={paginatedData} handleEdit={handleEdit} handleDelete={handleDelete} />
      {/* Pagination */}
       <Pagination page={page} setPage={setPage} filteredFrames={filteredFrames} setPaginatedData={setPaginatedData}/>
    </div>
  );
};

export default FrameList;
