/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import type { IPromo } from "../../../../types/interface";
import { useCreatePromoMutation } from "../../../../app/redux/api/promoApi";

const useAddPromo = () => {
  const [createPromo, { isLoading }] = useCreatePromoMutation();

  const form = useForm<IPromo>({
    defaultValues: {
      name: "",
      amount: undefined,
      percent: false,
      active: false,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = async (data: IPromo) => {
    try {
      const payload = {
        ...data,
        name: data.name.toUpperCase(),
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      };

      console.log(payload);

      await createPromo(payload).unwrap();

      toast.success("Promo created successfully 🚀");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create promo");
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};

export default useAddPromo;
