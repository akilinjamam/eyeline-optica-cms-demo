/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetWeeklyDealsQuery, useUpdateWeeklyDealsMutation } from "../../../app/redux/api/weeklyDealsApi";
import type { IWeeklyDeals } from "../../../types/interface";
import { toast } from "react-toastify";

export interface WeeklyDealForm {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  discountPercent: number;
  active: boolean;
}

export function useEditWeeklyDeals() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formData, setFormData] = useState<WeeklyDealForm | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const {data:dealsData} = useGetWeeklyDealsQuery("");
  const [updateDeals] = useUpdateWeeklyDealsMutation()
    const data = dealsData?.data;
  // Fetch deal on mount
  useEffect(() => {
    async function fetchDeal() {
      try {
        setInitialLoading(true);
        const normalized: WeeklyDealForm = {
          title: data?.title ?? "",
          description: data?.description ?? "",
          startDate: data?.startDate ? new Date(data?.startDate).toISOString().slice(0, 10) : "",
          endDate: data?.endDate ? new Date(data?.endDate).toISOString().slice(0, 10) : "",
          discountPercent: data?.discountPercent ?? 0,
          active: !!data?.active,
        };

        setFormData(normalized);
        setApiError(null);
      } catch (err: any) {
        setApiError(err.message || "Failed to load data");
      } finally {
        setInitialLoading(false);
      }
    }

    fetchDeal();
  }, [data]);

  function updateField<K extends keyof WeeklyDealForm>(key: K, value: WeeklyDealForm[K]) {
    setFormData((prev) => prev ? { ...prev, [key]: value } : prev);
    setIsDirty(true);
  }

  async function submitUpdate() {
    if (!formData) return;
    setLoading(true);
    setApiError(null);

    try {
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const updateData = {
        id:data?._id as string,
        data: payload as IWeeklyDeals
      }

      const res = await updateDeals(updateData) as any

      if (res?.data?.success){
        toast.success(res?.data?.message)
      }

      const updated = await res?.message;
      setIsDirty(false);
      return updated;
    } catch (err: any) {
      setApiError(err.message || "Update failed");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    updateField,
    initialLoading,
    loading,
    apiError,
    isDirty,
    submitUpdate,
  };
}
