// PrescriptionPreview.tsx
import { forwardRef } from "react";

type Medicine = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
};

type Prescription = {
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
  medicines: Medicine[];
  tests?: string;
  advice?: string;
};

export const PrescriptionPreview = forwardRef<HTMLDivElement, { prescription: Prescription }>(
  ({ prescription }, ref) => {
    return (
      <div
        ref={ref}
        className="max-w-3xl mx-auto bg-white text-black p-8 border border-gray-200 shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">{prescription.clinicName}</h1>
            <p className="text-sm">{prescription.clinicAddress}</p>
            <p className="text-sm">Contact: {prescription.contact}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{prescription.doctorName}</p>
            <p className="text-sm">{prescription.specialization}</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <p>
            <span className="font-medium">Patient:</span> {prescription.patientName}
          </p>
          <p>
            <span className="font-medium">Date:</span> {prescription.date}
          </p>
          {prescription.age && (
            <p>
              <span className="font-medium">Age:</span> {prescription.age}
            </p>
          )}
          {prescription.gender && (
            <p>
              <span className="font-medium">Gender:</span> {prescription.gender}
            </p>
          )}
        </div>

        {/* Diagnosis */}
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Diagnosis</h2>
          <p className="text-sm text-gray-700">{prescription.diagnosis}</p>
        </div>

        {/* Medicines */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Medicines</h2>
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Dosage</th>
                <th className="border p-2 text-left">Frequency</th>
                <th className="border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med, i) => (
                <tr key={i}>
                  <td className="border p-2">{med.name}</td>
                  <td className="border p-2">{med.dosage}</td>
                  <td className="border p-2">{med.frequency}</td>
                  <td className="border p-2">{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tests */}
        {prescription.tests && (
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Recommended Tests</h2>
            <p className="text-sm text-gray-700">{prescription.tests}</p>
          </div>
        )}

        {/* Advice */}
        {prescription.advice && (
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Advice</h2>
            <p className="text-sm text-gray-700">{prescription.advice}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-12">
          <div className="text-right">
            <p className="font-medium">_________________________</p>
            <p className="text-sm">Doctor’s Signature</p>
          </div>
        </div>
      </div>
    );
  }
);

PrescriptionPreview.displayName = "PrescriptionPreview";
