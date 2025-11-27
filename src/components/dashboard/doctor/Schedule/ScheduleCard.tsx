// SlotCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { motion } from "framer-motion";
import { Accessibility, ListChecks, SquareStack, Video } from "lucide-react";
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";
type TDoctor = {
  _id:string;
  name?:string;
}

type Slot = {
  _id: string;
  doctor?:TDoctor;
  startAt: string;
  endAt: string;
  isBooked: boolean;
  patient?: {_id:string ,name: string };
  isVideo?:boolean;
  isPrescription?:boolean;
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

  const dispatch = useDispatch();

  const handleVideoCall = (value:Slot) => {
  
      const prescriptionData = {
        doctorId: value?.doctor?._id,
        roomId:value?._id
      };

       dispatch(openEdit({name:'video',data:prescriptionData}));
  }
  const handlePrescription = (value:Slot) => {
    
      const prescriptionData = {
        doctorId: value?.doctor?._id,
        doctorName: value?.doctor?.name,
        patientId: value?.patient?._id,
        patientName:value?.patient?.name,
        slotId:value?._id,
      };

       dispatch(openEdit({name:'add-prescription',data:prescriptionData}));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl shadow-sm border p-2 h-auto">
        <CardHeader className="pb-2">
          <CardTitle className="lg:flex md:flex flex-wrap justify-between items-center text-sm">
            <span className="mb-2">{day}th {monthName}  / {start} - {end}</span>
            {slot.isBooked ? (
              <div className="flex items-center">
                <Badge className="mr-2" variant="destructive"><ListChecks/> Booked</Badge>
                <Badge onClick={() => handleVideoCall(slot)} className="cursor-pointer mr-2" variant="blue"><Video/> Video Call</Badge>
                <Badge onClick={() => handlePrescription(slot)} className="cursor-pointer" variant="blue"><Video/>Prescription</Badge>
              </div>
            ) : (
             <div className="flex items-center"><Badge variant="blue"><SquareStack/> Available</Badge></div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slot.isBooked && (
            <div className="flex items-center text-gray-500 mb-1">
              <Accessibility size={17}/>
              <p className="text-xs  ml-[2px]">
               patient: {slot.patient?.name || "N/A"}
            </p>
            </div>
          )}
          {slot.isBooked && (
            <div className={`flex items-center ${slot?.isVideo ? "text-green-500" : "text-red-500"} mb-1`}>
              <Video size={17}/>
              <p className="text-xs  ml-[2px]">
               video: {slot?.isVideo ? "yes" : "N/A"}
            </p>
            </div>
          )}
          {slot.isBooked && (
            <div className={`flex items-center ${slot?.isPrescription ? "text-green-500" : "text-red-500"} mb-1`}>
              <ListChecks size={15}/>
              <p className="text-xs  ml-[2px]">
               prescription: {slot?.isPrescription ? "yes" : "N/A"}
            </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
