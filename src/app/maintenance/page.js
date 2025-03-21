'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowPathIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/app/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export default function MaintenancePage() {
  const { user, login, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('maintenance-auth', 'true')
      document.cookie = 'maintenance-auth=true; path=/'
      router.push('/')
    }
  }, [user, router])

  const onSubmit = async (data) => {
    await login(data.email, data.password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">🛠 Maintenance Mode</h1>
          <p className="text-gray-500 text-sm">Authorized personnel only</p>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">{error}</p>
        )}

        <div className="space-y-4">
          <input
            {...register('email')}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-600"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              {...register('password')}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-600"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </motion.form>
    </div>
  )
}
