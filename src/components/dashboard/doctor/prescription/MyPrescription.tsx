import { PrescriptionCard } from "./PrescriptionCard";
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";

export type Prescription = {
  id: string;
  doctorName: string;
  specialization: string;
  clinicName: string;
  clinicAddress: string;
  contact: string;
  patientName: string;
  age?: string;
  gender?: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  tests?: string;
  advice?: string;
};

const samplePrescriptions: Prescription[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Lee",
    specialization: "General Physician",
    clinicName: "City Health Clinic",
    clinicAddress: "123 Main St, Chittagong",
    contact: "+880 123-456-789",
    patientName: "John Doe",
    age: "35",
    gender: "Male",
    date: "2025-09-23",
    diagnosis: "Common Cold, Fever",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", frequency: "1-1-1", duration: "5 days" },
      { name: "Azithromycin", dosage: "250mg", frequency: "1-0-0", duration: "3 days" },
    ],
    tests: "CBC, Chest X-Ray",
    advice: "Drink plenty of fluids and rest well.",
  },
  {
    id: "2",
    doctorName: "Dr. Bred Cooper",
    specialization: "General Physician",
    clinicName: "Apolo Health Clinic",
    clinicAddress: "123 Main St, Chittagong",
    contact: "+880 123-456-789",
    patientName: "Smith George",
    age: "40",
    gender: "Female",
    date: "2025-09-25",
    diagnosis: "Common Cold, Fever",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", frequency: "1-1-1", duration: "5 days" },
      { name: "Azithromycin", dosage: "250mg", frequency: "1-0-0", duration: "3 days" },
    ],
    tests: "CBC, Chest X-Ray",
    advice: "Drink plenty of fluids and rest well.",
  },
  // add more sample prescriptions here
];

export default function PrescriptionList() {

  const dispatch = useDispatch();

  

  return (
    <div className="p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {samplePrescriptions.map(pres => (
          <PrescriptionCard
            key={pres.id}
            prescription={{ id: pres.id, patientName: pres.patientName, date: pres.date, diagnosis: pres.diagnosis }}
            onClick={() => dispatch(openEdit({name:"prescription-detail", data: pres}))}
          />
        ))}
      </div>

      
    </div>
  );
}
