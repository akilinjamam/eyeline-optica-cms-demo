import {motion} from 'framer-motion'
import { Label } from '../../ui/label';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import type { TOrderStatus } from '../../../types/type';
import { Button } from '../../ui/button';
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { useUpdateStatusMutation } from '../../../app/redux/api/salesApi';
import { closeEdit } from '../../../app/redux/features/modalSlice';

const EditSalesOrderStatus = () => {
    const dispatch = useDispatch();
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

    const { handleSubmit, control} = useForm<TOrderStatus>({
        defaultValues: initialData as TOrderStatus || {
            status: "",
        },
      });

    const [updateStatus, {isLoading}] = useUpdateStatusMutation()

    const onSubmit = async (data:TOrderStatus) => {
        const {paymentHistoryId, status, id} = data;
        
        if (!id) {
            toast.error("Order ID is required");
            return;
        }

        const updatedData = {
            id,
            data: {status, paymentHistoryId}
        };

        try {
            const response = await updateStatus(updatedData).unwrap();
            if(response.success){
                dispatch(closeEdit())
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

   
   return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Change Order Status</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          

            {/* Role Type */}
            <div className="space-y-3">
              <Label>Type</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Order received">Order Received</SelectItem>
                      <SelectItem value="processsing">Processing</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                      <SelectItem value="on the way">On the way</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div> 

            <div className="mt-6">
                <Button disabled={isLoading ? true : false}  type="submit" className="w-full md:w-auto bg-blue-600">
                    <Edit /> {isLoading ? 'Editing' : 'Change Status'}
                </Button>
            </div>     
                    
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditSalesOrderStatus;
