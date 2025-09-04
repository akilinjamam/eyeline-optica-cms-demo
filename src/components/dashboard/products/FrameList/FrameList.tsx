import { useState } from "react";
import {
  Card,
  CardContent,
} from "../../../ui/card";
import { ScrollArea } from "../../../ui/scroll-area";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
import { Edit, Trash2 } from "lucide-react";

interface Frame {
  id: number;
  name: string;
  type: string;
  material: string;
  color: string;
  size: string;
  shape: string;
  price: number;
  quantity: number;
}

const sampleData: Frame[] = [
  { id: 1, name: "Stylish Sunglasses", type: "Sunglasses", material: "Acetate", color: "Black", size: "Medium", shape: "Round", price: 200, quantity: 50 },
  { id: 2, name: "Classic Eyeglasses", type: "Eyeglasses", material: "Metal", color: "Silver", size: "Large", shape: "Rectangle", price: 150, quantity: 30 },
];

const FrameList = () => {
  const [frames, setFrames] = useState(sampleData);

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(frames.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Frame List</h2>

      <Card className="rounded-3xl shadow-lg">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-150px)]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Material</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Color</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Size</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Shape</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {frames.map(frame => (
                  <tr key={frame.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{frame.name}</td>
                    <td className="px-4 py-2">{frame.type}</td>
                    <td className="px-4 py-2">{frame.material}</td>
                    <td className="px-4 py-2">{frame.color}</td>
                    <td className="px-4 py-2">{frame.size}</td>
                    <td className="px-4 py-2">{frame.shape}</td>
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
                {frames.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                      No frames found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default FrameList;
