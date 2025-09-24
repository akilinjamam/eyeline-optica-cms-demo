// SlotList.tsx
import { useEffect, useState } from "react";
import { SlotCard } from "./ScheduleCard";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DateRangeFilter } from "../../../../reusableComponent/DateRangeFilter";
import { useGetAllSlotQuery } from "../../../../app/redux/api/scheduleApi";
import useFindUser from "../../../../reusableComponent/useFindUser";
import { useGetSingleDoctorQuery } from "../../../../app/redux/api/doctorApi";
import { SlotCardSkeleton } from "../../../../reusableComponent/ScheduleSceleton";

export type Slot = {
  _id: string;
  startAt: string;
  endAt: string;
  isBooked: boolean;
  patient?: { name: string };
};

const SlotList: React.FC = () => {

  const {email} = useFindUser();
  console.log(email)
  
  const { data:doctor } = useGetSingleDoctorQuery(email);
      
  const { data: allSlot, isLoading } = useGetAllSlotQuery(doctor?.data?._id as string );
  console.log(allSlot?.message);

  const [filtered, setFiltered] = useState<Slot[]>([]);
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({from:startOfDay(today), to: endOfDay(today)});
  const [statusFilter, setStatusFilter] = useState<"all" | "booked" | "available">("all");

  useEffect(() => {
    let newFiltered: Slot[] = Array.isArray(allSlot?.data) ? allSlot.data : [];

    // Date range filter
    if (range?.from && range?.to) {
      newFiltered = newFiltered.filter((slot) =>
        isWithinInterval(new Date(slot.startAt), {
          start: range.from!,
          end: range.to!,
        })
      );
    }

    // Status filter
    if (statusFilter === "booked") {
      newFiltered = newFiltered.filter((slot) => slot.isBooked);
    } else if (statusFilter === "available") {
      newFiltered = newFiltered.filter((slot) => !slot.isBooked);
    }

    setFiltered(newFiltered);
  }, [range, statusFilter, allSlot]);

  

  return (
    <div className="p-4 overflow-x-scroll h-[90vh] hide-scrollbar">
      <DateRangeFilter onChange={setRange} />

      {/* Status filter buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1 rounded ${statusFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("booked")}
          className={`px-3 py-1 rounded ${statusFilter === "booked" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Booked
        </button>
        <button
          onClick={() => setStatusFilter("available")}
          className={`px-3 py-1 rounded ${statusFilter === "available" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Available
        </button>
      </div>

      <br /><br />

      {
        isLoading
        ?
        <SlotCardSkeleton/>
        :
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        { filtered.map((slot) => (
          <SlotCard key={slot._id} slot={slot} />
        ))}
      </div>
      }
    </div>
  );
};

export default SlotList;
