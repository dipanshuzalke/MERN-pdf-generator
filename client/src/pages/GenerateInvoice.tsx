import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Layout } from '@/components/Layout';
import { RootState } from '@/store/store';
import { generateInvoice } from '@/store/slices/invoiceSlice';
import { clearProducts } from '@/store/slices/productSlice';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

export function GenerateInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totals } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.invoices);

  const invoiceNumber = `INV-${Date.now()}`;
  const currentDate = new Date().toLocaleDateString();

  const handleGenerateInvoice = async () => {
    try {
      await dispatch(generateInvoice({ products, totals }) as any).unwrap();
      dispatch(clearProducts());
      toast.success('Invoice generated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF({
      invoiceNumber,
      date: currentDate,
      products,
      totals,
      user: user!,
    });
    toast.success('PDF downloaded successfully!');
  };

  if (products.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Products Added</h1>
          <p className="text-muted-foreground mb-6">
            Please add products before generating an invoice.
          </p>
          <Button onClick={() => navigate('/add-products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Add Products
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-[#18181b] py-8">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-[700px] w-full px-8 py-8">
          {/* Top: Logo and Title */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <img src="/invoice-logo.png" alt="logo" className="h-10 w-auto text-black" />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-black tracking-tight">INVOICE GENERATOR</h2>
              <p className="text-xs text-gray-500">Sample Output should be this</p>
            </div>
          </div>
          <hr className="border-gray-300" />

          {/* Name, Date, Email Bar */}
          <div className="flex items-center justify-between rounded-xl px-6 py-3 my-6" style={{background: 'linear-gradient(90deg, #23233a 70%, #3a4a2b 100%)'}}>
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">Name</span>
              <span className="text-[#CCF575] text-lg font-mono font-bold">{user?.name || 'Person_name'}</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-white text-xs">Date : {currentDate}</span>
              <span className="bg-white text-black text-xs px-4 py-1 rounded-full font-mono">{user?.email || 'example@email.com'}</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-[#23233a] to-[#3a4a2b] text-white">
                  <th className="py-3 px-4 text-left font-semibold">Product</th>
                  <th className="py-3 px-4 text-center font-semibold">Qty</th>
                  <th className="py-3 px-4 text-right font-semibold">Rate</th>
                  <th className="py-3 px-4 text-right font-semibold">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product.id} className={idx % 2 === 1 ? 'bg-gray-100/60' : ''}>
                    <td className="py-2 px-4 italic text-black">{product.name}</td>
                    <td className="py-2 px-4 text-center text-black">{product.quantity}</td>
                    <td className="py-2 px-4 text-right text-black">₹ {product.rate}</td>
                    <td className="py-2 px-4 text-right text-black">₹ {product.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Box */}
          <div className="flex justify-end mt-8">
            <div className="bg-white border rounded-xl shadow p-6 w-[260px]">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Total Charges</span>
                <span className="text-gray-700 font-semibold">₹{totals.subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">GST (18%)</span>
                <span className="text-gray-500">₹{totals.totalGst.toFixed(0)}</span>
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-blue-600 text-lg">₹ {totals.grandTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Date bottom left */}
          <div className="mt-8 flex justify-between items-end">
            <span className="text-xs text-gray-500">Date: {currentDate}</span>
          </div>

          {/* Footer Info Bar */}
          <div className="flex justify-center mt-8">
            <div className="bg-[#23233a] text-white text-xs rounded-full px-8 py-4 max-w-xl text-center">
              We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-8">
            <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              onClick={handleGenerateInvoice} 
              className="flex-1"
              disabled={isLoading}
            >
              <Mail className="h-4 w-4 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Invoice'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}