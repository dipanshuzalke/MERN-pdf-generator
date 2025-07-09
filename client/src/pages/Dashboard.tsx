import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  FileText,
  Download,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { RootState } from '@/store/store'
import { fetchInvoices } from '@/store/slices/invoiceSlice'
import { generatePDF } from '@/utils/pdfGenerator'
import { toast } from 'sonner'
import Navbar from '../components/Navbar'

export function Dashboard () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { invoices } = useSelector((state: RootState) => state.invoices)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchInvoices() as any)
  }, [dispatch])

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + invoice.totals.grandTotal,
    0
  )
  const totalInvoices = invoices.length
  const avgInvoiceValue = totalInvoices > 0 ? totalRevenue / totalInvoices : 0

  const handleDownloadInvoice = (invoice: any) => {
    generatePDF({
      invoiceNumber: invoice.invoiceNumber,
      date: new Date(invoice.createdAt).toLocaleDateString(),
      products: invoice.products,
      totals: invoice.totals,
      user: user!
    })
    toast.success('Invoice downloaded successfully!')
  }

  return (
    <main className='relative min-h-screen w-full bg-[#18181b] flex flex-col overflow-x-hidden'>
      <Navbar />
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none z-0'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(80,80,120,0.25) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      <div className='py-8 px-16'>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-muted-foreground'>
                Welcome back, {user?.name}! Here's your invoice overview.
              </p>
            </div>
            <Button
              onClick={() => navigate('/add-products')}
              className='bg-[#23232a] border border-lime-400 text-lime-400 hover:bg-lime-200 hover:text-black font-semibold flex items-center px-8 py-2 h-12 rounded-md shadow-none'
            >
              <Plus className='h-4 w-4 mr-2' />
              Create New Invoice
            </Button>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Revenue
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  ₹{totalRevenue.toFixed(2)}
                </div>
                <p className='text-xs text-muted-foreground'>
                  From {totalInvoices} invoices
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Invoices
                </CardTitle>
                <FileText className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalInvoices}</div>
                <p className='text-xs text-muted-foreground'>
                  Generated this period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Average Value
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  ₹{avgInvoiceValue.toFixed(2)}
                </div>
                <p className='text-xs text-muted-foreground'>Per invoice</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <FileText className='h-5 w-5' />
                <span>Recent Invoices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className='text-center py-12'>
                  <FileText className='h-16 w-16 mx-auto text-muted-foreground mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>
                    No invoices yet
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Create your first invoice to get started
                  </p>
                  <Button
                    onClick={() => navigate('/add-products')}
                    className='bg-[#23232a] text-lime-400 hover:bg-lime-200 hover:text-black font-semibold py-5 px-14 rounded-lg text-lg '
                  >
                    <Plus className='h-4 w-4 mr-2' />
                    Create Invoice
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell className='font-medium'>
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center space-x-2'>
                            <Calendar className='h-4 w-4 text-muted-foreground' />
                            <span>
                              {new Date(invoice.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.products.length} items</TableCell>
                        <TableCell className='font-medium'>
                          ₹{invoice.totals.grandTotal.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant='secondary'>Completed</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDownloadInvoice(invoice)}
                          >
                            <Download className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
