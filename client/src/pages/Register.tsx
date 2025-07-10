import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { register as registerUser } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await dispatch(registerUser(data) as any).unwrap();
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#18181b] flex flex-col overflow-x-hidden">
      {/* Top-center radial gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(204,245,117,0.18) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      {/* Bottom-left radial gradient */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[300px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at left bottom, rgba(204,245,117,0.25) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      <div
        className='absolute -right-20 top-16 w-[400px] h-[200px] pointer-events-none z-50'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(80,80,120,0.50) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      <Navbar />
      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col md:flex-row">
        {/* Left: Form */}
        <div className="flex-1 flex flex-col justify-start pl-24 pt-24 min-h-[600px]">
          <div className="max-w-xl w-full">
            <h1 className="text-4xl font-bold text-white mb-3 text-left">Sign up to begin journey</h1>
            <p className="text-base text-gray-400 mb-8 text-left">This is basic signup page which is used for levitation assignment purpose.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-1 text-left text-base">Enter your name</label>
                <Input
                  id="name"
                  placeholder="Enter Name"
                  className="bg-[#23232a] text-white border border-[#444] rounded-md h-12 px-4 focus:ring-lime-200 placeholder-gray-400 w-full text-base"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 text-left">{errors.name.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-left">This name will be displayed with your inquiry</p>
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-1 text-left text-base">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email ID"
                  className="bg-[#23232a] text-white border border-[#444] rounded-md h-12 px-4 focus:ring-lime-200 placeholder-gray-400 w-full text-base"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 text-left">{errors.email.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-left">This email will be displayed with your inquiry</p>
              </div>
              <div>
                <label htmlFor="password" className="block text-white mb-1 text-left text-base">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the Password"
                  className="bg-[#23232a] text-white border border-[#444] rounded-md h-12 px-4 focus:ring-lime-200 placeholder-gray-400 w-full text-base"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 text-left">{errors.password.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-left">Any further updates will be forwarded on this Email ID</p>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center gap-4 mt-4">
                <Button
                  type="submit"
                  className="bg-lime-200 text-black hover:bg-lime-300 font-semibold px-8 py-2 rounded text-base"
                  disabled={isLoading}
                >
                  Register
                </Button>
                <span className="text-gray-400 text-sm">Already have account ?</span>
                <Link to="/login" className="text-lime-200 hover:underline text-sm">Login</Link>
              </div>
            </form>
          </div>
        </div>
        {/* Right: Image */}
        <div className="hidden md:flex flex-1 items-center justify-cente overflow-hidden pt-[3rem]">
          <img src="/signup.png" alt="Signup visual" className="object-cover  rounded-[3rem] max-w-[1200px] w-full max-h-[95%] ml-[2rem] shadow-lg mx-auto" />
        </div>
      </div>
    </div>
  );
}