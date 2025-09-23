/* eslint-disable @typescript-eslint/no-explicit-any */
import autoTable from "jspdf-autotable";
import type { Prescription } from "../components/dashboard/doctor/prescription/MyPrescription";
import jsPDF from "jspdf";

const usePrescriptionPdfDownloader = (prescription: Prescription) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(16);
    doc.text(prescription.clinicName, 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text(prescription.clinicAddress, 105, 21, { align: "center" });
    doc.text(`Contact: ${prescription.contact}`, 105, 26, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(15, 30, 195, 30);

    // Doctor info
    doc.setFontSize(12);
    doc.text(
      `Doctor: ${prescription.doctorName} (${prescription.specialization})`,
      15,
      40
    );

    // Patient info
    doc.text(`Patient: ${prescription.patientName}`, 15, 50);
    doc.text(`Age: ${prescription.age || ""}`, 90, 50);
    doc.text(`Gender: ${prescription.gender || ""}`, 120, 50);
    doc.text(`Date: ${prescription.date}`, 150, 50);

    // Diagnosis
    doc.setFontSize(12);
    doc.text("Diagnosis:", 15, 60);
    doc.setFontSize(10);
    doc.text(prescription.diagnosis, 15, 65);

    // Medicines Table
    autoTable(doc, {
      startY: 75,
      head: [["Name", "Dosage", "Frequency", "Duration"]],
      body: prescription.medicines.map((med) => [
        med.name,
        med.dosage,
        med.frequency,
        med.duration,
      ]),
      theme: "grid",
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
    });

    const lastAutoTable = (doc as any).lastAutoTable;
    const nextY = lastAutoTable ? lastAutoTable.finalY + 10 : 100;

    if (prescription.tests) {
      doc.setFontSize(12);
      doc.text("Recommended Tests:", 15, nextY);
      doc.setFontSize(10);
      doc.text(prescription.tests, 15, nextY + 5);
    }

    if (prescription.advice) {
      doc.setFontSize(12);
      doc.text("Advice:", 15, nextY + 15);
      doc.setFontSize(10);
      doc.text(prescription.advice, 15, nextY + 20);
    }

    // Footer: Doctor Signature
    doc.setFontSize(10);
    doc.text("_________________________", 150, 280);
    doc.text("Doctor's Signature", 155, 285);

    doc.save(`Prescription-${prescription.patientName}.pdf`);
  };

  return { generatePDF };
};

export default usePrescriptionPdfDownloader;
