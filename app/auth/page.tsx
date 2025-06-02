"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, User, UserCheck, Crown, Users, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

const predefinedRoles = [
  {
    id: "analyst",
    name: "KYC Analyst",
    icon: User,
    email: "analyst@regsecured.com",
    password: "analyst123",
    description: "Review and analyze compliance data, manage cases and screening",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "reviewer",
    name: "Compliance Officer",
    icon: UserCheck,
    email: "reviewer@regsecured.com",
    password: "reviewer123",
    description: "Review and approve compliance decisions, manage risk assessments",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "relationship-manager",
    name: "Relationship Manager",
    icon: Users,
    email: "rm@regsecured.com",
    password: "rm123",
    description: "Manage client relationships and initiate onboarding processes",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "admin",
    name: "System Administrator",
    icon: Settings,
    email: "admin@regsecured.com",
    password: "admin123",
    description: "Manage system configuration, users, and platform settings",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: "superadmin",
    name: "Super Admin",
    icon: Crown,
    email: "superadmin@regsecured.com",
    password: "superadmin123",
    description: "Full system access and multi-tenant management",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "client",
    name: "Client Portal",
    icon: Globe,
    email: "client@regsecured.com",
    password: "client123",
    description: "Client Access Portal Bridge - External client onboarding and document management",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
]

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleRoleSelect = (role: (typeof predefinedRoles)[0]) => {
    setEmail(role.email)
    setPassword(role.password)
    setSelectedRole(role.id)
  }

  const handleLogin = () => {
    if (email && password) {
      // Store the role in localStorage for the dashboard to use
      const role = predefinedRoles.find((r) => r.email === email)
      if (role) {
        localStorage.setItem("userRole", role.id)
        localStorage.setItem("userName", role.name)
        router.push(`/dashboard/${role.id}`)
      }
    }
  }

  const handleSignUp = () => {
    // For demo purposes, just switch to sign in
    setIsSignIn(true)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header Section - Above both columns */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-stone-50" />
            </div>
            <span className="text-xl font-medium text-slate-800">RegSecured</span>
          </div>
          <h1 className="text-2xl font-light text-slate-800 mb-2">Quick Role Access</h1>
          <p className="text-slate-600 font-light">Select a predefined role to quickly access the platform</p>
        </div>

        {/* Main Content - Role Cards and Auth Form Aligned */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Role Selection */}
          <div className="grid gap-4">
            {predefinedRoles.map((role) => {
              const IconComponent = role.icon
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedRole === role.id ? "border-slate-400 shadow-md" : "border-stone-200 hover:border-stone-300"
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-slate-800">{role.name}</h3>
                          <Badge className={`text-xs ${role.color}`}>{role.id}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 font-light">{role.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center lg:justify-start">
            <Card className="w-full max-w-md border-stone-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-light text-slate-800">{isSignIn ? "Sign In" : "Sign Up"}</CardTitle>
                <p className="text-slate-600 font-light">
                  {isSignIn ? "Access your compliance dashboard" : "Create your RegSecured account"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-stone-300"
                    />
                  </div>
                  {!isSignIn && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                      <Input type="password" placeholder="Confirm your password" className="border-stone-300" />
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 h-12"
                  onClick={isSignIn ? handleLogin : handleSignUp}
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setIsSignIn(!isSignIn)}
                    className="text-sm text-slate-600 hover:text-slate-800 font-light"
                  >
                    {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>

                {selectedRole && (
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <p className="text-xs text-slate-600 font-light">
                      Selected role:{" "}
                      <span className="font-medium">{predefinedRoles.find((r) => r.id === selectedRole)?.name}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
