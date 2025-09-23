import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { motion } from "framer-motion";

type PrescriptionSummary = {
  id: string;
  patientName: string;
  date: string;
  diagnosis: string;
};

export const PrescriptionCard: React.FC<{
  prescription: PrescriptionSummary;
  onClick: () => void;
}> = ({ prescription, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card onClick={onClick} className="p-4 rounded-xl shadow hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex justify-between">
            <span>{prescription.patientName}</span>
            <span className="text-gray-500 text-xs">{prescription.date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm truncate">Diagnosis: {prescription.diagnosis}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
