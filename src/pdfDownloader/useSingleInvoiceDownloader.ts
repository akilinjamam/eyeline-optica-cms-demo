/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const useSingleInvoiceDownloader = () => {
  const handleDownloadInvoice = (sale: any) => {
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
      { align: "center" }
    );
    doc.text(
      "Cell: 01841631667, 01729435335 | Email: eyelineoptica@gmail.com",
      pageWidth / 2,
      cursorY + 11,
      { align: "center" }
    );

    // 📄 Line
    doc.setLineWidth(0.4);
    doc.line(10, cursorY + 15, pageWidth - 10, cursorY + 15);

    // 🧾 Invoice Header
    cursorY += 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Invoice", marginX, cursorY);

    const today = new Date().toLocaleDateString();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Invoice No: ${sale.invoiceNo}`, pageWidth - marginX, cursorY, {
      align: "right",
    });
    doc.text(`Date: ${today}`, pageWidth - marginX, cursorY + 6, {
      align: "right",
    });

    // 🧍 Customer Info
    cursorY += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", marginX, cursorY);
    doc.setFont("helvetica", "normal");
    doc.text(`${sale.customer_name}`, marginX, cursorY + 6);
    doc.text(`${sale.customer_address}`, marginX, cursorY + 12);
    doc.text(`Phone: ${sale.customer_phone}`, marginX, cursorY + 18);
    doc.text(`Email: ${sale.customer_email}`, marginX, cursorY + 24);

    // 🧱 Table
    cursorY += 35;
    autoTable(doc, {
      startY: cursorY,
      head: [["#", "Product Name", "Qty", "Price", "Subtotal"]],
      body: [
        [
          1,
          sale?.frameName ||
            sale?.productName ||
            sale?.lensName ||
            sale?.contactLensName ||
            sale?.accessoryName ||
            "",
          sale?.frameQty ||
            sale?.productQty ||
            sale?.lensQty ||
            sale?.contactLensQty ||
            sale?.accessoryQty ||
            "",
          `${
            sale?.frameSalesPrice?.toFixed(2) ||
            sale?.lensSalesPrice?.toFixed(2) ||
            sale?.productSalesPrice ||
            sale?.contactLensSalesPrice?.toFixed(2) ||
            sale?.accessorySalesPrice ||
            "0.00"
          }`,
          `${sale?.subtotal?.toFixed(2) || "0.00"}`,
        ],
      ],
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fillColor: [60, 60, 60] },
      columnStyles: { 1: { halign: "left" } },
    });

    // 💰 Total Section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");

    const subtotal = sale.subtotal?.toFixed(2) || "0.00";
    const deliveryFee = sale.deliveryFee?.toFixed(2) || "0.00";
    const total = ((sale.subtotal || 0) + (sale.deliveryFee || 0)).toFixed(2);
    const paid = sale.payableAmount?.toFixed(2) || "0.00";
    const due = sale.dueAmount?.toFixed(2) || "0.00";

    doc.text("Subtotal:", pageWidth - 60, finalY);
    doc.text(`${subtotal} BDT`, pageWidth - marginX, finalY, {
      align: "right",
    });

    doc.text("Delivery Fee:", pageWidth - 60, finalY + 6);
    doc.text(`${deliveryFee} BDT`, pageWidth - marginX, finalY + 6, {
      align: "right",
    });

    doc.text("Total:", pageWidth - 60, finalY + 12);
    doc.text(`${total} BDT`, pageWidth - marginX, finalY + 12, {
      align: "right",
    });

    doc.text("Paid:", pageWidth - 60, finalY + 18);
    doc.text(`${paid} BDT`, pageWidth - marginX, finalY + 18, {
      align: "right",
    });

    doc.text("Due:", pageWidth - 60, finalY + 24);
    doc.text(`${due} BDT`, pageWidth - marginX, finalY + 24, {
      align: "right",
    });

    // 💬 Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Thank you for your purchase!", pageWidth / 2, finalY + 38, {
      align: "center",
    });
    doc.text("Visit again at Eyeline Optica!", pageWidth / 2, finalY + 43, {
      align: "center",
    });

    // 💾 Save PDF
    const fileName = `Invoice_${sale.invoiceNo || "Unknown"}.pdf`;
    doc.save(fileName);
  };

  return { handleDownloadInvoice };
};

export default useSingleInvoiceDownloader;
