// SlotCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { motion } from "framer-motion";

type Slot = {
  _id: string;
  startAt: string;
  endAt: string;
  isBooked: boolean;
  patient?: { name: string };
};

export const SlotCard: React.FC<{ slot: Slot }> = ({ slot }) => {
const startDate = new Date(slot.startAt);
  const start = new Date(slot.startAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const end = new Date(slot.endAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const monthName = startDate.toLocaleDateString(undefined, { month: "long" });
  const day = startDate.getDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl shadow-sm border p-2 h-[100px]">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center text-sm">
            <span>{day}th {monthName}  / {start} - {end}</span>
            {slot.isBooked ? (
              <Badge variant="destructive">Booked</Badge>
            ) : (
              <Badge variant="blue">Available</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slot.isBooked && (
            <p className="text-xs text-gray-500">
              Patient: {slot.patient?.name || "N/A"}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
