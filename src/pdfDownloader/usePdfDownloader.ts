/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type IusePdfDownloader = {
  tableData: any;
  header: any;
};

const usePdfDownloader = (tableData: any, header: any, title: string) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // 🏪 Shop Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Eyeline Optica", pageWidth / 2, 15, { align: "center" });

    // 📅 Current Date
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${today}`, pageWidth / 2, 22, { align: "center" });

    // Title
    doc.setFontSize(18);
    doc.text(title, 14, 15);

    // Generate table
    autoTable(doc, {
      head: [header],
      body: tableData,
      startY: 25,
      styles: { halign: "center", fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] },
    });

    // Save the PDF
    doc.save(`${title}.pdf`);
  };

  return { handleDownloadPDF };
};

export default usePdfDownloader;
