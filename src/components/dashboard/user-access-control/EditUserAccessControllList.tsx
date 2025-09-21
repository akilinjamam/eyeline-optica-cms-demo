import {motion} from 'framer-motion'
import { Label } from '../../ui/label';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import type { TRegistration } from '../../../types/type';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';
import { Edit } from 'lucide-react';
import { useUpdateUserMutation } from '../../../app/redux/api/authApi';
import { toast } from 'react-toastify';

const EditUserAccessControll = () => {

    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

    
    
    const { handleSubmit, control} = useForm<TRegistration>({
        defaultValues: initialData as TRegistration || {
            role: "",
            access: false
        },
      });

    const [updateUser, {isLoading}] = useUpdateUserMutation()

    const onSubmit = async (data:TRegistration) => {
        const {access, role, _id} = data;
        
        const updatedData = {
            id:_id,
            data: {access, role}
        };

        try {
            const response = await updateUser(updatedData).unwrap();
            if(response.success){
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
        <h2 className="text-2xl font-bold mb-4">Edit User Access Control</h2>

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
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="doctor & admin">Doctor & Admin</SelectItem>
                      <SelectItem value="employee & admin">Employee & Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>  

            {/* Weekly Deals */}
            <div className="mt-2 flex items-center gap-3">
                <Controller
                     name="access"
                     control={control}
                     render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                                 />
                    <span className="text-gray-700">Access Permission</span>
            </div>   

            <div className="mt-6">
                <Button disabled={isLoading ? true : false}  type="submit" className="w-full md:w-auto bg-blue-600">
                    <Edit /> {isLoading ? 'Editing' : 'Edit User Access Control'}
                </Button>
            </div>     
                    
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditUserAccessControll;
