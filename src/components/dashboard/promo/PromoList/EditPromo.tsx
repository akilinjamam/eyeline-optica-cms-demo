/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useUpdatePromoMutation } from "../../../../app/redux/api/promoApi";

interface PromoFormValues {
  name: string;
  amount: number;
  percent: boolean;
  active: boolean;
  startTime: Date;
  endTime: Date;
}

interface EditPromoProps {
  promo: any; // better: type IPromo
}

// 👉 convert Date → datetime-local string
const formatDate = (date: Date) => {
  const d = new Date(date);
  return d.toISOString().slice(0, 16);
};

const EditPromo = ({ promo }: EditPromoProps) => {
  const [updatePromo, { isLoading }] = useUpdatePromoMutation();

  const form = useForm<PromoFormValues>({
    defaultValues: {
      name: "",
      amount: undefined,
      percent: false,
      active: true,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  // ✅ Prefill data
  useEffect(() => {
    if (promo) {
      form.reset({
        name: promo.name,
        amount: promo.amount,
        percent: promo.percent,
        active: promo.active,
        startTime: new Date(promo.startTime),
        endTime: new Date(promo.endTime),
      });
    }
  }, [promo, form]);

  const onSubmit = async (data: PromoFormValues) => {
    try {
      await updatePromo({
        id: promo._id,
        body: {
          ...data,
          name: data?.name?.toUpperCase(),
          startTime: new Date(data.startTime),
          endTime: new Date(data.endTime),
        },
      }).unwrap();

      toast.success("Promo updated successfully 🚀");
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto h-screen flex flex-col"
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Edit Promo</CardTitle>
        </CardHeader>

        <CardContent className="overflow-y-auto flex-1 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Promo name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount ({form.watch("percent") ? "%" : "৳"})
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? undefined : Number(value),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Percent */}
              <FormField
                control={form.control}
                name="percent"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel>Is Percentage?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Active */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={formatDate(field.value)}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={formatDate(field.value)}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Promo"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditPromo;
