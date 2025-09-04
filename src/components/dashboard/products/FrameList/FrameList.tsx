import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
} from "../../../ui/card";
import { ScrollArea } from "../../../ui/scroll-area";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";
import { Edit, Trash2 } from "lucide-react";


interface Frame {
  id: number;
  name: string;
  type: string;
  material: string;
  shape: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

const sampleData: Frame[] = [
  { id: 1, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 2, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 3, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 4, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 5, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 6, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 7, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 8, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 9, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 10, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 11, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 12, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 13, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 14, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 15, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 16, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 17, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 18, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 19, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 20, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 21, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 22, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 23, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 24, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 25, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 26, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 27, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 28, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 29, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 30, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 31, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 32, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 33, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 34, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 35, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 36, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 37, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 38, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 39, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 40, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 41, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 42, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 43, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 44, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 45, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id:46  , name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 47, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 48, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 49, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 50, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 51, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 52, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 53, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 54, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 55, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 56, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 57, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 58, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 59, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 60, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 61, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 62, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 63, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 64, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 65, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 66, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 67, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 68, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 69, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 70, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 71, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 72, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 73, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 74, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 75, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 76, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 77, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 78, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 79, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 80, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 81, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 82, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 83, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 84, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 85, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 86, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 87, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },
  { id: 88, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", shape: "Round", color: "Black", size: "Medium", price: 200, quantity: 50 },
  { id: 89, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", shape: "Rectangle", color: "Silver", size: "Large", price: 150, quantity: 30 },
  { id: 90, name: "Trendy Frames", type: "Eyeglasses", material: "Plastic", shape: "Oval", color: "Red", size: "Small", price: 120, quantity: 20 },

  // add more sample data here...
];

const ITEMS_PER_PAGE = 5;

const FrameList = () => {
  const [frames, setFrames] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [filterShape, setFilterShape] = useState("all");
  const [page, setPage] = useState(1);
  const [portion, setPortion] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(filteredFrames?.length / ITEMS_PER_PAGE));

  const paginatedFrames = filteredFrames.slice((ITEMS_PER_PAGE * page) - ITEMS_PER_PAGE, ITEMS_PER_PAGE * page)

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(frames.filter(f => f.id !== id));
    }
  };

  const handleNext = () => {
    if((portion * ITEMS_PER_PAGE) > totalPages) return
    setPortion((prev) => prev + 1);
  }

  const handlePrev = () => {
    if(portion === 1) return 
    setPortion((prev) => prev - 1);
  }

// ((portion * ITEMS_PER_PAGE) - ITEMS_PER_PAGE), (portion * ITEMS_PER_PAGE)

  const arrayData = Array.from({ length: totalPages })?.map((_, item) => ({id: item+1}));
  console.log(arrayData)

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

      <ScrollArea className="h-[calc(100vh-390px)] lg:h-[calc(100vh-280px)] ">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block">
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SL</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Material</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Shape</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Color</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Size</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedFrames.map((frame) => (
                      <tr key={frame.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{frame.id}</td>
                        <td className="px-4 py-2">{frame.name}</td>
                        <td className="px-4 py-2">{frame.type}</td>
                        <td className="px-4 py-2">{frame.material}</td>
                        <td className="px-4 py-2">{frame.shape}</td>
                        <td className="px-4 py-2">{frame.color}</td>
                        <td className="px-4 py-2">{frame.size}</td>
                        <td className="px-4 py-2">${frame.price}</td>
                        <td className="px-4 py-2">{frame.quantity}</td>
                        <td className="px-4 py-2 flex justify-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(frame.id)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Frame</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(frame.id)}>
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Frame</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {paginatedFrames.map(frame => (
            <Card key={frame.id} className="rounded-2xl shadow-lg">
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div><span className="font-semibold">Name:</span> {frame.name}</div>
                  <div><span className="font-semibold">Type:</span> {frame.type}</div>
                  <div><span className="font-semibold">Material:</span> {frame.material}</div>
                  <div><span className="font-semibold">Shape:</span> {frame.shape}</div>
                  <div><span className="font-semibold">Color:</span> {frame.color}</div>
                  <div><span className="font-semibold">Size:</span> {frame.size}</div>
                  <div><span className="font-semibold">Price:</span> ${frame.price}</div>
                  <div><span className="font-semibold">Qty:</span> {frame.quantity}</div>

                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(frame.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(frame.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Pagination */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
    <Button size="sm"  onClick={() => setPage(1)}>First</Button>
    <Button size="sm"  onClick={handlePrev}>Prev</Button>

    {arrayData?.slice((portion * ITEMS_PER_PAGE) - ITEMS_PER_PAGE , (portion * ITEMS_PER_PAGE) )?.map((item, i) => {
        return (
            <Button
                key={i}
                size="sm"
                variant={page === item.id ? "default" : "outline"}
                onClick={() => setPage(item.id)}
            >
                {item.id}
            </Button>
        )
    })}

    <Button size="sm" disabled={page === totalPages} onClick={handleNext}>Next</Button>
    <Button size="sm" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</Button>
        </div>
    </div>
  );
};

export default FrameList;
