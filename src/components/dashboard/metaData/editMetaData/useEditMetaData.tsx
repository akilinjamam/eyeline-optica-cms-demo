/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { closeEdit } from "../../../../app/redux/features/modalSlice";
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useForm } from "react-hook-form";
import type {IMeta} from "../../../../types/interface";
import { useUpdateMetaDataMutation } from "../../../../app/redux/api/metaApi";


const useEditMetaData = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

const { register, handleSubmit} = useForm<IMeta>({
    defaultValues: initialData as IMeta || {
      title: "",
      routeName: "",
      description: ""
    },
  });

   const [successMsg, setSuccessMsg] = useState<string>("");
  const [editMeta, { isLoading:loading, error:errorMsg, }] = useUpdateMetaDataMutation();
  const dispatch = useDispatch();
  
  const onSubmit = async (data: IMeta) => {
    const {_id , routeName,  ...remaining } = data;
    console.log(routeName)
    const formData = {
      id:_id,
      data: {...remaining}
    };
    try {
      const response = await editMeta(formData as any).unwrap();
      if (response.success) {
        dispatch(closeEdit())
        toast.success(response.message);  
    
      }
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err?.data?.message);
        setSuccessMsg(err?.data?.message)
      }
    }
  };

  return {register, handleSubmit, onSubmit, loading,errorMsg, successMsg}

};

export default useEditMetaData;