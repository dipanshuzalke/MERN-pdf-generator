import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  addProduct,
  removeProduct,
  clearProducts
} from '@/store/slices/productSlice'
import { RootState } from '@/store/store'
import { toast } from 'sonner'
import Navbar from './Navbar'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  rate: z.number().min(0.01, 'Rate must be greater than 0')
})

type ProductForm = z.infer<typeof productSchema>

export function AddProducts () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, totals } = useSelector((state: RootState) => state.products)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = (data: ProductForm) => {
    dispatch(addProduct(data))
    reset()
    toast.success('Product added successfully!')
  }

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id))
    toast.success('Product removed!')
  }

  const handleNext = () => {
    if (products.length === 0) {
      toast.error('Please add at least one product')
      return
    }
    navigate('/generate-invoice')
  }

  const handleClearAll = () => {
    dispatch(clearProducts())
    toast.success('All products cleared!')
  }

  return (
    <div className='relative min-h-screen w-full bg-[#18181b] flex flex-col overflow-x-hidden'>
      {/* Top-centered radial gradient for glow */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none z-0'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(80,80,120,0.25) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      {/* Top bar with logo and logout */}
      <Navbar />
      <main className='relative z-10 flex-1 flex flex-col p-16'>
        {/* <div className="w-full max-w-3xl mx-auto bg-[#23232a] rounded-2xl shadow-lg p-10 mt-16"> */}
        <h1 className='text-3xl font-bold text-white mb-2'>Add Products</h1>
        <p className='text-base text-gray-400 mb-8'>
          This is basic login page which is used for levitation <br />{' '}
          assignment purpose.
        </p>

        {/* Form Row */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 mb-4'
        >
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <label htmlFor='text' className='text-white'>
                Product Name
              </label>
                  <Input
                id='name'
                placeholder='Enter the product name'
                className='bg-[#18181b] text-white border border-[#444] rounded-md h-12 px-4 mt-1 focus:ring-lime-200'
                    {...register('name')}
                  />
                  {errors.name && (
                <p className='text-xs text-red-400 mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className='flex-1'>
              <label htmlFor='text' className='text-white'>
                Product Price
              </label>
              <Input
                id='rate'
                type='number'
                step='0.01'
                min='0.01'
                placeholder='Enter the price'
                className='bg-[#18181b] text-white border border-[#444] rounded-md h-12 px-4 mt-1 focus:ring-lime-200'
                {...register('rate', { valueAsNumber: true })}
              />
              {errors.rate && (
                <p className='text-xs text-red-400 mt-1'>
                  {errors.rate.message}
                </p>
                  )}
                </div>
            <div className='flex-1'>
              <label htmlFor='text' className='text-white'>
                Quantity
              </label>
                    <Input
                id='quantity'
                type='number'
                min='1'
                placeholder='Enter the Qty'
                className='bg-[#18181b] text-white border border-[#444] rounded-md h-12 px-4 mt-1 focus:ring-lime-200'
                      {...register('quantity', { valueAsNumber: true })}
                    />
                    {errors.quantity && (
                <p className='text-xs text-red-400 mt-1'>
                  {errors.quantity.message}
                </p>
                    )}
                  </div>
                </div>
          <div className='flex justify-center mt-2'>
            <Button
              type='submit'
              className='bg-[#23232a] border border-lime-400 text-lime-400 hover:bg-lime-200 hover:text-black font-semibold flex items-center px-8 py-2 h-12 rounded-md shadow-none'
            >
              Add Product <Plus className='h-4 w-4 ml-2' />
                </Button>
          </div>
              </form>

        {/* Products Table */}
        <div className='bg-[#18181b] rounded-xl overflow-hidden shadow border border-[#333] mb-10 mt-8'>
          <table className='min-w-full text-sm'>
            <thead className='bg-white'>
              <tr>
                <th className='px-4 py-3 text-left text-black font-semibold rounded-tl-xl'>
                  Product name
                  <span className='inline-flex items-center ml-1 space-x-1 align-middle'>
                    <ArrowUp className='w-5 h-5' />
                  </span>
                </th>
                <th className='px-4 py-3 text-left text-black font-semibold'>Price</th>
                <th className='px-4 py-3 text-left text-black font-semibold'>
                  Quantity
                  <span className='inline-flex items-center ml-1 space-x-1 align-middle'>
                    <ArrowDown className='w-5 h-5' />
                  </span>
                </th>
                <th className='px-4 py-3 text-left text-black font-semibold rounded-tr-xl'>
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-6 text-gray-400'>
                    No products added yet.
                  </td>
                </tr>
              ) : (
                <>
                  {products.map(product => (
                    <tr key={product.id} className='border-b border-[#23232a]'>
                      <td className='px-4 py-3 italic'>{product.name}</td>
                      <td className='px-4 py-3'>{product.rate}</td>
                      <td className='px-4 py-3'>{product.quantity}</td>
                      <td className='px-4 py-3'>INR {product.total}</td>
                    </tr>
                  ))}
                  {/* Subtotal, GST, Total rows only if products exist */}
                  <tr>
                    <td colSpan={2}></td>
                    <td className='px-4 py-3 text-right text-gray-300'>
                      Sub-Total
                    </td>
                    <td className='px-4 py-3 text-white'>
                      INR {totals.subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td className='px-4 py-3 text-right text-gray-300'>
                      Incl + GST 18%
                    </td>
                    <td className='px-4 py-3 text-white'>
                      INR {totals.grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
              </div>
              
        {/* Generate PDF Invoice Button */}
        <div className='flex justify-center'>
                <Button
                  onClick={handleNext}
            className={`bg-[#23232a] text-lime-400 hover:bg-lime-200 hover:text-black font-semibold py-5 px-24 rounded-lg text-lg ${
              products.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
                  disabled={products.length === 0}
                >
            Generate PDF Invoice
                </Button>
        </div>
      </main>
      </div>
  )
}
