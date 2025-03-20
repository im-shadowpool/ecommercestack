'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/UserContext'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  confirmPassword: z.string(),
  agreeTerms: z.literal(true)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})



export default function RegisterForm() {
  const router = useRouter()
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  

    useEffect(() => {
      if (user) {
        router.push("/");
      }
    }, [user, router]);
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  })
  

  const calculatePasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    
    const strengthLevel = Object.values(requirements).filter(Boolean).length;
    return { strengthLevel, requirements };
  };
  

  const PasswordRequirement = ({
    valid,
    children,
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex items-center gap-2 text-sm"
    >
      {valid ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className={valid ? "text-green-600" : "text-gray-500"}>
        {children}
      </span>
    </motion.div>
  );

  const password = watch('password')
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password || ''))
  }, [password])

  const onSubmit = async (data) => {
    setError('')
    startTransition(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password
          })
        })
        // console.log({
        //     fullName: `${data.firstName} ${data.lastName}`,
        //     email: data.email,
        //     password: data.password
        //   })
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }

        setSuccess(true)
        setTimeout(() => router.push('/login'), 2000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registration failed')
      }
    })
  }

  
  useEffect(() => {
    if (password) {
      const { strengthLevel, requirements } = calculatePasswordStrength(password);
      setStrengthLevel(strengthLevel);
      setRequirements(requirements);
    } else {
      setStrengthLevel(0);
      setRequirements({
        length: false,
        uppercase: false,
        number: false,
        special: false,
      });
    }
  }, [password]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-skygreen-100 to-white flex items-center justify-center p-4"
    >
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl bg-white rounded-2xl p-8 shadow-xl space-y-6"
      >
        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-bold text-gray-900">Register to Euca Online</h1>
          <p className="text-gray-500">Eucalyptus Laundry & Household Cleaning. A better clean for the whole home.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-50 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Registration successful! Redirecting...
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <input
              {...register('firstName')}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all"
              disabled={isPending}
            />
            {errors.firstName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.firstName.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register('lastName')}
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all"
              disabled={isPending}
            />
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.lastName.message}
              </motion.p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <input
            {...register('email')}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all"
            disabled={isPending}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div className="space-y-4">
        <div className="space-y-2 relative">
  <input
    {...register('password')}
    placeholder="Password"
    type={showPassword ? 'text' : 'password'}
    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all pr-12"
    disabled={isPending}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-0.5 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
  >
    {showPassword ? (
      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
    ) : (
      <EyeIcon className="w-5 h-5 text-gray-500" />
    )}
  </button>
</div>
  
  <div className="flex gap-1 h-2">
  {[...Array(4)].map((_, i) => {
    const isActive = i < strengthLevel;
    return (
      <motion.div
        key={i}
        className="flex-1 rounded-full bg-gray-200" // Base gray background
        animate={{
          scaleX: 1, // Always visible
          backgroundColor: isActive ? '#10B981' : '#E5E7EB'
        }}
        initial={{ scaleX: 1, backgroundColor: '#E5E7EB' }}
        transition={{
          backgroundColor: { duration: 0.3 },
          scaleX: { type: "spring", stiffness: 300, damping: 20 }
        }}
      />
    );
  })}
</div>

<AnimatePresence>
  {password && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2 pt-2"
    >
      <PasswordRequirement valid={requirements.length}>
        At least 8 characters
      </PasswordRequirement>
      <PasswordRequirement valid={requirements.uppercase}>
        At least one uppercase letter
      </PasswordRequirement>
      <PasswordRequirement valid={requirements.number}>
        At least one number
      </PasswordRequirement>
      <PasswordRequirement valid={requirements.special}>
        At least one special character
      </PasswordRequirement>
    </motion.div>
  )}
</AnimatePresence>
</div>

{/* Conditional Confirm Password Field */}
<AnimatePresence>
  {strengthLevel === 4 && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-2"
    >
     <div className="space-y-2 relative">
  <input
    {...register('confirmPassword')}
    placeholder="Confirm Password"
    type={showConfirmPassword ? 'text' : 'password'}
    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all pr-12"
    disabled={isPending}
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-0.5 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
  >
    {showConfirmPassword ? (
      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
    ) : (
      <EyeIcon className="w-5 h-5 text-gray-500" />
    )}
  </button>
</div>
      {errors.confirmPassword && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {errors.confirmPassword.message}
        </motion.p>
      )}
    </motion.div>
  )}
</AnimatePresence>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agreeTerms"
            {...register('agreeTerms')}
            className="w-5 h-5 rounded border-gray-300 text-egreen-500 focus:ring-egreen-500"
            disabled={isPending}
          />
          <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          By using this form you agree with the storage and handling of your data by this website.
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isPending}
          className="w-fit px-6 bg-egreen-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-egreen-800 transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <>
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </motion.button>
        
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left text-sm text-gray-600"
                >
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-egreen-500 hover:underline font-medium"
                  >
                    Login here
                  </button>
                </motion.div>
      </form>
    </motion.div>
  )
}