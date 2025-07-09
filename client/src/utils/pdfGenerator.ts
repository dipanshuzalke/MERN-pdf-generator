import jsPDF from 'jspdf';
import { Product } from '@/store/slices/productSlice';

interface GeneratePDFProps {
  invoiceNumber: string;
  date: string;
  products: Product[];
  totals: {
    subtotal: number;
    totalGst: number;
    grandTotal: number;
  };
  user: {
    name: string;
    email: string;
  };
}

export const generatePDF = ({
  invoiceNumber,
  date,
  products,
  totals,
  user,
}: GeneratePDFProps) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  // Layout constants
  const leftMargin = 60;
  const contentWidth = 480;
  const rightMargin = leftMargin + contentWidth;

  // Colors
  // Remove unsupported linearGradient usage
  // Use solid colors instead
  const darkHeader = '#23233a';
  const highlight = '#CCF575';
  const blue = '#2563eb';

  // Header: Logo and Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Levitation', leftMargin, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('infotech', leftMargin, 75);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE GENERATOR', rightMargin, 60, { align: 'right' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('Sample Output should be this', rightMargin, 75, { align: 'right' });

  // Info Bar (Name, Date, Email)
  const infoBarY = 95;
  const infoBarHeight = 44;
  doc.setFillColor(35, 35, 58);
  doc.roundedRect(leftMargin, infoBarY, contentWidth, infoBarHeight, 12, 12, 'F');
  // Name (left)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('Name', leftMargin + 16, infoBarY + 16);
  doc.setTextColor(204, 245, 117);
  doc.setFontSize(16);
  doc.text(user.name || 'Person_name', leftMargin + 16, infoBarY + 34);
  // Date (right, top)
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`Date: ${date}`, rightMargin - 16, infoBarY + 16, { align: 'right' });
  // Email (right, bottom, in pill)
  const emailWidth = doc.getTextWidth(user.email) + 24;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(rightMargin - emailWidth - 16, infoBarY + infoBarHeight - 28, emailWidth, 22, 11, 11, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  // Center the email horizontally and vertically in the pill
  doc.text(
    user.email,
    rightMargin - emailWidth / 2 - 16,
    infoBarY + infoBarHeight - 28 + 14,
    { align: 'center' }
  );

  // Table Header
  let tableY = infoBarY + infoBarHeight + 24;
  const tableHeight = 28;
  doc.setFillColor(35, 35, 58);
  doc.roundedRect(leftMargin, tableY, contentWidth, tableHeight, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  // Table columns: Product, Qty, Rate, Total Amount
  const col1 = leftMargin + 16;
  const col2 = leftMargin + 220;
  const col3 = leftMargin + 320;
  const col4 = leftMargin + contentWidth - 16;
  doc.text('Product', col1, tableY + 19);
  doc.text('Qty', col2, tableY + 19, { align: 'center' });
  doc.text('Rate', col3, tableY + 19, { align: 'right' });
  doc.text('Total Amount', col4, tableY + 19, { align: 'right' });

  // Table Rows
  let rowY = tableY + tableHeight;
  products.forEach((product, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(leftMargin, rowY, contentWidth, tableHeight, 8, 8, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(product.name, col1, rowY + 19);
    doc.text(String(product.quantity), col2, rowY + 19, { align: 'center' });
    doc.text(`₹  ${product.rate}`, col3, rowY + 19, { align: 'right' });
    doc.text(`₹  ${product.total}`, col4, rowY + 19, { align: 'right' });
    rowY += tableHeight;
  });

  // Totals Box
  const totalsBoxY = tableY + Math.max(products.length, 1) * tableHeight + 32;
  const totalsBoxWidth = 210;
  const totalsBoxHeight = 80;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(rightMargin - totalsBoxWidth, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 12, 12, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text('Total Charges', rightMargin - totalsBoxWidth + 16, totalsBoxY + 24);
  doc.text(`₹ ${totals.subtotal.toFixed(0)}`, rightMargin - 16, totalsBoxY + 24, { align: 'right' });
  doc.setTextColor(120, 120, 120);
  doc.text('GST (18%)', rightMargin - totalsBoxWidth + 16, totalsBoxY + 42);
  doc.text(`₹ ${totals.totalGst.toFixed(0)}`, rightMargin - 16, totalsBoxY + 42, { align: 'right' });
  doc.setDrawColor(220, 220, 220);
  doc.line(rightMargin - totalsBoxWidth + 16, totalsBoxY + 50, rightMargin - 16, totalsBoxY + 50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('Total Amount', rightMargin - totalsBoxWidth + 16, totalsBoxY + 68);
  doc.text(`₹ ${totals.grandTotal.toFixed(0)}`, rightMargin - 16, totalsBoxY + 68, { align: 'right' });

  // Date bottom left
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Date: ${date}`, leftMargin, totalsBoxY + totalsBoxHeight + 24);

  // Footer Info Bar
  const footerBarWidth = 420;
  const footerBarX = leftMargin + (contentWidth - footerBarWidth) / 2;
  const footerBarY = totalsBoxY + totalsBoxHeight + 44;
  doc.setFillColor(35, 35, 58);
  doc.roundedRect(footerBarX, footerBarY, footerBarWidth, 40, 16, 16, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(
    'We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.',
    leftMargin + contentWidth / 2,
    footerBarY + 25,
    { align: 'center', maxWidth: 400 }
  );

  // Save the PDF
  doc.save(`invoice-${invoiceNumber}.pdf`);
};