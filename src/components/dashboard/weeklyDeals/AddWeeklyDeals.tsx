import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

// shadcn ui
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { useEditWeeklyDeals } from "./useWeeklyDeals";



export default function EditWeeklyDeals() {
  const {
    formData,
    updateField,
    initialLoading,
    loading,
    apiError,
    isDirty,
    submitUpdate,
  } = useEditWeeklyDeals();

  const { register, handleSubmit, setValue } = useForm({});

  React.useEffect(() => {
    if (formData) {
      setValue("title", formData.title);
      setValue("description", formData.description);
      setValue("startDate", formData.startDate);
      setValue("endDate", formData.endDate);
      setValue("discountPercent", formData.discountPercent);
      setValue("active", formData.active);
    }
  }, [formData, setValue]);

  async function onSubmit() {
    await submitUpdate();
   
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full mx-auto p-3"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Deal</CardTitle>
        </CardHeader>
        <CardContent>
          {initialLoading ? (
            <div className="p-6 text-center text-muted-foreground">Loading...</div>
          ) : !formData ? (
            <div className="text-red-600">Failed to load deal.</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {apiError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-md">{apiError}</div>
              )}

              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue={formData.title}
                  {...register("title")}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue={formData.description}
                  {...register("description")}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    defaultValue={formData.startDate}
                    {...register("startDate")}
                    onChange={(e) => updateField("startDate", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    defaultValue={formData.endDate}
                    {...register("endDate")}
                    onChange={(e) => updateField("endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Discount */}
              <div>
                <Label htmlFor="discountPercent">Discount (%)</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  defaultValue={formData.discountPercent}
                  {...register("discountPercent")}
                  onChange={(e) => updateField("discountPercent", Number(e.target.value))}
                />
              </div>

              {/* Active */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(value) => updateField("active", value)}
                  />
                  <Label>Active</Label>
                </div>

                <div className="text-sm text-muted-foreground">
                  {isDirty ? "Unsaved changes" : "Saved"}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                  {loading ? "Updating..." : "Update"}
                </Button>

              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
