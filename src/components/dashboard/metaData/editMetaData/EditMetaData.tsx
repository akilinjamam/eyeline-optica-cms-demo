/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import useEditMetaData from "./useEditMetaData";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";

export const EditMetaData = () => {

  const { onSubmit, handleSubmit, register, loading, successMsg, errorMsg } = useEditMetaData();


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-2 mx-auto mt-8"
    >
      <Card className="p-4 shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Update Meta Data
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="space-y-3 cursor-not-allowed ">
                <Label>Route Name</Label>
                <Input placeholder="" {...register("routeName")} disabled/>
            </div>
            <div className="space-y-3">
                <Label>Title</Label>
                <Input placeholder="write short title" {...register("title")}/>
            </div>
            <div className="space-y-3">
                <Label>Description</Label>
                <Textarea placeholder="write description" {...register("description")}/>
            </div>
        

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Updating..." : "Edit Meta Data"}
            </Button>

            {/* Status Messages */}
            {successMsg && (
              <p className="text-green-600 text-center text-sm mt-2">
                {successMsg}
              </p>
            )}
            {errorMsg && (
              <p className="text-red-600 text-center text-sm mt-2">
                {errorMsg as string}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
