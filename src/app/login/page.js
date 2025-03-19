'use client'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/app/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export default function LoginPage() {
  const { user, login, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  const onSubmit = async (data) => {
    await login(data.email, data.password)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-skygreen-100 to-white flex items-center justify-center p-4"
    >
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl space-y-6"
      >
        <div className="space-y-2 text-center">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-gray-900"
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-500">Sign in to continue</p>
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

        <div className="space-y-4">
          <div className="space-y-2">
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all"
              disabled={loading}
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

          <div className="space-y-2">
          <div className="space-y-2 relative">
  <input
    {...register('password')}
    placeholder="Password"
    type={showPassword ? 'text' : 'password'}
    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-egreen-500 focus:border-transparent transition-all pr-12"
    disabled={loading}
  />
  <motion.button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-0.5 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {showPassword ? (
      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
    ) : (
      <EyeIcon className="w-5 h-5 text-gray-500" />
    )}
  </motion.button>
</div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-egreen-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-egreen-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-600"
        >
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-egreen-500 hover:underline font-medium"
          >
            Register here
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}