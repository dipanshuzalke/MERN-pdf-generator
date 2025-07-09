import { Button } from '@/components/ui/button'

function Navbar() {
  return (
    <div className='relative z-10 flex justify-between items-center px-16 py-3 bg-[#1F1F1F]'>
        <div className='flex items-center space-x-2'>
          <img src='/logo.png' alt='logo' className='h-10 w-auto' />
        </div>
        <Button
          className='bg-lime-200 text-black hover:bg-lime-300 font-semibold px-4 py-2 rounded'
          onClick={() => {
            /* TODO: Add logout logic */
          }}
        >
          Logout
        </Button>
      </div>
  )
}

export default Navbar