/* eslint-disable @typescript-eslint/no-explicit-any */
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox"; // ✅ Assuming you have shadcn/ui checkbox
import type { ContactLens, Frame, ILens, ITableInfo } from "../types/interface";
import type { ActionColumn, TableColumn } from "../types/type";
import { useDispatch, useSelector } from "react-redux";
import { addAllIds, addIds,  deletableItem,  deleteIds, removeIds } from "../app/redux/features/modalSlice";
import type { RootState } from "../app/store";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const Table = ({ paginatedData, column, actionColumn, showCheck }: ITableInfo<ContactLens | ILens | Frame>) => {
  const location = useLocation()
  const deletableItemName = location.pathname;
  console.log(deletableItemName)
  const dispatch = useDispatch();
  const {ids} = useSelector((state:RootState) => state.modal);
  const handleRow = (row: any, col: any) => {
    if (typeof row[col.key] === "boolean") {
      return row[col.key] ? "Yes" : "No";
    }
    return row[col.key];
  };

  const handleCheckboxChange = (id: string) => {
    dispatch(deletableItem(deletableItemName))

    if(ids.includes(id)){
      dispatch(removeIds(id))
    }else{
      dispatch(addIds(id))
    }
    
  };

  const handleSelectAll = () => {
    dispatch(deletableItem(deletableItemName))
    if (ids.length === paginatedData.length) {
      dispatch(deleteIds());
      
    } else {
      const value = paginatedData.map((row: any) => row._id)
      dispatch(addAllIds(value))
    }
  };


  return (
    <ScrollArea className="h-[calc(100vh-390px)] lg:h-[calc(100vh-200px)] text-sm">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block">
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    {/* ✅ Select All Checkbox */}
                    <th className="px-4 py-2 text-center">
                      {showCheck && <Checkbox
                        checked={ids.length === paginatedData.length}
                        onCheckedChange={handleSelectAll}
                      />}
                    </th>
                    {column.map((col: TableColumn) => (
                      <th
                        key={col.key}
                        className={`px-4 py-2 text-${col.align || "left"} text-sm font-medium text-gray-700`}
                      >
                        {col.label}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedData?.map((row: Frame | any) => (
                    <tr key={row.id} className={`${ids.includes(row._id) ? 'bg-red-200' : 'hover:bg-gray-50'} `}>
                      {/* ✅ Row Checkbox */}
                      <td className="px-4 py-2 text-center">
                        {showCheck && <Checkbox
                          checked={ids.includes(row._id)}
                          onCheckedChange={() => handleCheckboxChange(row._id)}
                        />}
                      </td>

                      {column?.map((col: TableColumn) => (
                        <td key={col.key} className={`px-4 py-2 text-${col.align || "left"}`}>
                          {handleRow(row, col)}
                        </td>
                      ))}

                      {/* Actions column */}
                      <td className="px-4 py-2 flex justify-center gap-2">
                        <TooltipProvider>
                          {actionColumn?.map((action: ActionColumn, i: number) => (
                            <Tooltip key={i}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => action.render(row._id)}
                                >
                                  {action.logo}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          ))}
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
        {paginatedData?.map((row: Frame | any) => (
          <Card key={row.id} className="rounded-2xl shadow-lg">
            <CardContent>
              <div className="flex flex-col gap-2">
                {/* ✅ Checkbox for mobile */}
                <div className="flex items-center gap-2">
                  {showCheck && <Checkbox
                    checked={ids.includes(row.id)}
                    onCheckedChange={() => handleCheckboxChange(row.id)}
                  />}
                  <span className="font-semibold">Select</span>
                </div>

                {column?.map((col: TableColumn) => (
                  <div key={col.key}>
                    <span className="font-semibold">{col.label}:</span> {row[col.key]}
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  {actionColumn?.map((action: ActionColumn, i: number) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="sm"
                      onClick={() => action.render(row.id)}
                    >
                      {action.logo}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Table;
