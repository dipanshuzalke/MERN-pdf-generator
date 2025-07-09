import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/slices/authSlice'
import { RootState } from '@/store/store'

function Navbar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  return (
    <div className='relative z-10 flex justify-between items-center px-16 py-3 bg-[#1F1F1F]'>
      <div className='flex items-center space-x-2'>
        <img src='/logo.png' alt='logo' className='h-10 w-auto' />
      </div>
      {user ? (
        <Button
          className='bg-lime-200 text-black hover:bg-lime-300 font-semibold px-4 py-2 rounded'
          onClick={() => {
            dispatch(logout())
            navigate('/login')
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          className='bg-lime-200 text-black hover:bg-lime-300 font-semibold px-4 py-2 rounded'
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}
    </div>
  )
}

export default Navbar
