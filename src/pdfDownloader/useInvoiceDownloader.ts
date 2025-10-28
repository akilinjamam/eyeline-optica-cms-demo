/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { IFrameSaleInfo } from "../types/interface";

const useInvoiceDownloader = () => {
  const handleDownloadInvoice = (
    rowData: IFrameSaleInfo[],
    title = "Frame Order Invoice"
  ) => {
    if (!rowData || rowData.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 14;
    let cursorY = 20;

    // 🏪 Shop Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Eyeline Optica", pageWidth / 2, cursorY, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong",
      pageWidth / 2,
      cursorY + 6,
      {
        align: "center",
      }
    );
    doc.text(
      "Cell: 01841631667, 01729435335 | Email: eyelineoptica@gmail.com",
      pageWidth / 2,
      cursorY + 11,
      {
        align: "center",
      }
    );

    // 📄 Line
    doc.setLineWidth(0.4);
    doc.line(10, cursorY + 15, pageWidth - 10, cursorY + 15);

    // 🧾 Invoice Header
    cursorY += 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, marginX, cursorY);

    const today = new Date().toLocaleDateString();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Date: ${today}`, pageWidth - marginX, cursorY, {
      align: "right",
    });

    console.log(rowData);

    // 🧍 Customer Info (use first item as customer ref)
    const first = rowData[1];
    cursorY += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Customer:", marginX, cursorY);
    doc.setFont("helvetica", "normal");
    doc.text(`${first.customer_name}`, marginX, cursorY + 6);
    doc.text(`${first.customer_address}`, marginX, cursorY + 12);
    doc.text(`Phone: ${first.customer_phone}`, marginX, cursorY + 18);
    doc.text(`Email: ${first.customer_email}`, marginX, cursorY + 24);

    // 🧱 Table Data
    const tableBody = rowData.map((item, index) => [
      index + 1,
      item.frameName || "",
      item.frameQty || "",
      item?.frameSalesPrice,
      item.subtotal?.toFixed(2) || "0.00",
    ]);

    // Calculate total subtotal
    const totalSubtotal = rowData[0].subtotal;

    // Add table
    cursorY += 35;
    autoTable(doc, {
      startY: cursorY,
      head: [["#", "Frame Name", "Qty", "Price", "Subtotal"]],
      body: tableBody,
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fillColor: [66, 66, 66] },
      columnStyles: {
        1: { halign: "left" },
        4: { halign: "right" },
      },
    });

    // 💰 Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Total:", pageWidth - 60, finalY);
    doc.text(`${totalSubtotal.toFixed(2)} BDT`, pageWidth - marginX, finalY, {
      align: "right",
    });

    // 💬 Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Thank you for your purchase!", pageWidth / 2, finalY + 20, {
      align: "center",
    });
    doc.text("Visit again at Eyeline Optica!", pageWidth / 2, finalY + 25, {
      align: "center",
    });

    // 💾 Save PDF
    const fileName = `Frame_Invoice_${first.invoiceNo || "All"}.pdf`;
    doc.save(fileName);
  };

  return { handleDownloadInvoice };
};

export default useInvoiceDownloader;
