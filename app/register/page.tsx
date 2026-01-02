"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setLoading(true)
    const name = `${formData.firstName} ${formData.lastName}`
    const success = await register(name, formData.email, formData.password)
    if (success) {
      // Check if user is admin and redirect accordingly
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        if (user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Create Account</h1>
          <p className="text-gray-700 text-sm uppercase tracking-widest">
            Join ATELIER today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                placeholder="First name"
                required
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent pr-12"
                placeholder="Create password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent pr-12"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <input type="checkbox" className="mr-3 mt-1" required />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <Link href="/terms" className="text-accent hover:text-primary font-bold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-accent hover:text-primary font-bold">
                Privacy Policy
              </Link>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:text-primary font-bold">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-500">Or sign up with</span>
          </div>
          <div className="space-y-3">
            <button className="w-full border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50 smooth-transition">
              Continue with Google
            </button>
            <button className="w-full border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50 smooth-transition">
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}