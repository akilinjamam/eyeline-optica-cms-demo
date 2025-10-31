/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { useForm } from "react-hook-form";
import type { ICategory } from "../../../../../types/interface";
import { useUpdateCategoryMutation } from "../../../../../app/redux/api/categoryApi";
import { closeEdit } from "../../../../../app/redux/features/modalSlice";
import { toast } from "react-toastify";
import { useState } from "react";


const useEditCategory = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal);
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");


const { register, handleSubmit, control, watch, formState} = useForm<ICategory>({
    defaultValues: initialData as ICategory || {
     category:"",
     categoryType: ""
    },
  });

  const [editCategory, { isLoading, error }] = useUpdateCategoryMutation();
  const dispatch = useDispatch();
  
  console.log(isLoading)
  console.log(error)
  


  const onSubmit = async (data: ICategory) => {
    
    const newData = {
      id: initialData?._id,
      data
    };
    console.log(newData)
    try {
      const response = await editCategory(newData as any).unwrap();
      if (response.success) {
        dispatch(closeEdit())
        toast.success(response.message);  
        setSuccessMsg(response.message)
      
      }
    } catch (err: any) {
      if (err?.data?.message) {
        alert(err.data.message);
        setErrorMsg(err.data.message)
      }
    }
  };

  return {register, handleSubmit, control,  onSubmit, watch, formState,  isLoading, successMsg, errorMsg}

};

export default useEditCategory;