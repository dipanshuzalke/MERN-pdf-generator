import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const sliderImages = ['/login1.jpg', '/login2.jpg']; // Place your images in public folder

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: current * 440, // 420px image + 20px gap
        behavior: "smooth",
      });
    }
  }, [current]);

  const onSubmit = async (data: LoginForm) => {
    try {
      await dispatch(login(data) as any).unwrap();
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#18181b] flex flex-col overflow-x-hidden">
      {/* Top-center oval gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(80,80,120,0.25) 0%, rgba(24,24,27,0.0) 70%)'
        }}
      />
      <Navbar />
      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Left: Image Slider */}
        <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden px-8 pt-20">
          <div
            ref={scrollRef}
            className="w-[530px] h-[570px] overflow-x-auto flex flex-row gap-4 snap-x snap-mandatory scroll-smooth pl-4 pr-4 hide-scrollbar"
          >
            {sliderImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`slide-${idx}`}
                className="w-[420px] h-[540px] object-cover rounded-[2.5rem] snap-center shrink-0"
                draggable={false}
              />
            ))}
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-xl w-full mx-auto">
          <img src='/logo2.png' alt='logo' className='h-16 w-auto mb-8' />
            <h1 className="text-4xl font-bold text-white mb-2 text-left">Let the Journey Begin!</h1>
            <p className="text-base text-gray-400 mb-8 text-left">This is basic login page which is used for levitation assignment purpose.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white mb-1 text-left">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email ID"
                  className="bg-[#23232a] text-white border border-[#444] rounded-md h-12 px-4 focus:ring-lime-200 placeholder-gray-400 w-full"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 text-left">{errors.email.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-left">This email will be displayed with your inquiry</p>
              </div>
              <div>
                <label htmlFor="password" className="block text-white mb-1 text-left">Current Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the Password"
                  className="bg-[#23232a] text-white border border-[#444] rounded-md h-12 px-4 focus:ring-lime-200 placeholder-gray-400 w-full"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 text-left">{errors.password.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-left">This email will be displayed with your inquiry</p>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center gap-4 mt-4">
                <Button
                  type="submit"
                  className="bg-lime-200 text-black hover:bg-lime-300 font-semibold px-8 py-2 rounded"
                  disabled={isLoading}
                >
                  Login now
                </Button>
                <Link to="/forgot-password" className="text-gray-400 hover:underline text-sm ml-2">Forget password ?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}