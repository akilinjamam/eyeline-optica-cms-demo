/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";
import type { TableColumn } from "../types/type";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { openModal } from "../app/redux/features/modalSlice";

type TColumnManager = {
    columns:TableColumn[];
    dynamicColumns:TableColumn[];
    setDynamicColumns:any;
    defaultCol?:number;
}

const ColumnManager = ({columns, dynamicColumns, setDynamicColumns, defaultCol=8}: TColumnManager) => {

    const {ids} = useSelector((state:RootState) => state.modal)

    const restColumn = columns?.slice(defaultCol)
  
    const [removedColumns, setRemoveColumns] = useState<TableColumn[]>(restColumn);
      
    const [removeSelectValue, setRemoveSelectValue] = useState<
        string | undefined
      >(undefined);

    const dispatch = useDispatch();


    const addColumn = (key:string) => {
    if(dynamicColumns.length >= defaultCol) return; // max 8 columns
    const newColumn = removedColumns?.find(col => col.key === key)
    setRemoveColumns(removedColumns?.filter(col => col.key !== key))
    if(newColumn){
        setDynamicColumns((add:TableColumn[]) => [...add, newColumn]);
    }
};

const removeColumn = (key: string) => {
  if (dynamicColumns.length <= 1) return; // at least 1 column

  // remove column from dynamic
  setDynamicColumns(dynamicColumns.filter(col => col.key !== key));

  // add removed column back
  const addRemovedColumn = dynamicColumns.find(col => col.key === key);
  if (addRemovedColumn) {
    setRemoveColumns(prev => [...prev, addRemovedColumn]);
  }

  // reset select back to placeholder (fix)
  setRemoveSelectValue(undefined);
};


    return (
        <div className="flex flex-wrap">
            <div className="lg:ml-3">
                <Select disabled={dynamicColumns?.length >= defaultCol} value={removeSelectValue}  onValueChange={(val) => {
                  addColumn(val)
                  setRemoveSelectValue("");
                }}>
                  <SelectTrigger className="lg:w-[180px] lg:mb-0 mb-2 w-full ">
                    <SelectValue placeholder="Add Fields"  />
                  </SelectTrigger>
                  <SelectContent >
                    {removedColumns?.map(col => (
                      <SelectItem className="block" key={col.key} value={col.key}>
                        <Check/> {col.label}
                      </SelectItem>
                    ))}
                    
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:ml-3 ml-2">
                <Select 
                  value={removeSelectValue}
                    onValueChange={(val) => {
                      removeColumn(val);        // remove column
                      setRemoveSelectValue(""); // reset so placeholder shows again
                    }}
                  >
                  <SelectTrigger className="lg:w-[180px] w-full">
                    <SelectValue  placeholder="Remove Fields"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicColumns?.map(col => (
                      <SelectItem className={`${col.key === 'id' ? 'hidden' : ''}`} key={col.key} value={col.key}>
                        <X className={`mr-2 h-4 w-4`} /> {col.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div onClick={() => dispatch(openModal())} className="ml-3 ">
                  {ids.length > 0 && <Button className="cursor-pointer lg:mt-0">Delete {ids.length}</Button>}
              </div>
        </div>
    );
};

export default ColumnManager;