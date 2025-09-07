/* eslint-disable @typescript-eslint/no-explicit-any */
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import type { ContactLens, Frame, ITableInfo, Lens } from "../types/interface";
import type { ActionColumn, TableColumn } from "../types/type";

const Table = ({ paginatedData, column, actionColumn }: ITableInfo<ContactLens | Lens | Frame>) => {
  const handleRow = (row:any, col:any) => {
    if(col.key === "uvProtection"){
        if(row[col.key]){
          return 'Yes'
        }else{
          return 'No'
        }
    }else{
      return row[col.key]
    }

  }
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
                    {column.map((col: TableColumn) => (
                      <th
                        key={col.key}
                        className={`px-4 py-2 text-${col.align || "left"} text-sm font-medium text-gray-700`}
                      >
                        {col.label}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((row: Frame | any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {column.map((col: TableColumn) => (
                        <td key={col.key} className={`px-4 py-2 text-${col.align || "left"}`}>
                          {
                            handleRow(row,col)
                          }
                        </td>
                      ))}

                      {/* Actions column */}
                      <td className="px-4 py-2 flex justify-center gap-2">
                        <TooltipProvider>
                         {
                          actionColumn.map((action:ActionColumn) => {
                            return (
                               <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => action.render(row.id)}>
                                {action.logo}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>
                            )
                          })
                         }

                         
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
        {paginatedData.map((row: Frame | any) => (
          <Card key={row.id} className="rounded-2xl shadow-lg">
            <CardContent>
              <div className="flex flex-col gap-2">
                {column.map((col: TableColumn) => (
                  <div key={col.key}>
                    <span className="font-semibold">{col.label}:</span>{" "}
                    {row[col.key]}
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  {
                    actionColumn.map((action:ActionColumn) => (
                      <Button variant="ghost" size="sm" onClick={() => action.render(row.id)}>
                    {action.logo}
                  </Button>
                    ))
                  }
                 
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
