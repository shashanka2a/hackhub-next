'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Trophy, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft,
  CheckCircle,
  Chrome,
  Github,
  Settings,
  Users,
  Building2,
  BarChart3,
  Gavel,
  Gift
} from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onAuthenticated: () => void;
}

type UserRole = 'organizer' | 'judge' | 'sponsor';

export function AuthScreen({ onBack, onAuthenticated }: AuthScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [selectedRole, setSelectedRole] = useState<UserRole>('organizer');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const getRoleIllustration = (role: UserRole) => {
    switch (role) {
      case 'organizer':
        return {
          image: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBjaGFydHMlMjBtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5MjI0MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          title: "Manage Everything",
          description: "Comprehensive dashboard to oversee judges, projects, and results in real-time.",
          features: ["Event Management", "Judge Assignment", "Live Analytics", "Results Export"],
          gradient: "from-violet-500 to-blue-600"
        };
      case 'judge':
        return {
          image: "https://images.unsplash.com/photo-1596574027151-2ce81d85af3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMGp1ZGdlJTIwZXZhbHVhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5MjI0MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          title: "Evaluate Projects",
          description: "Streamlined interface for fair and efficient project evaluation.",
          features: ["Project Reviews", "Scoring System", "Table Management", "Progress Tracking"],
          gradient: "from-green-500 to-emerald-600"
        };
      case 'sponsor':
        return {
          image: "https://images.unsplash.com/photo-1663274358921-4c6611b0f581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwdHJvcGh5JTIwcHJpemUlMjB3aW5uZXIlMjBzcG9uc29yfGVufDF8fHx8MTc1OTIyNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          title: "Award Prizes",
          description: "Track engagement and select winners for your sponsored categories.",
          features: ["Prize Management", "Winner Selection", "Engagement Metrics", "Brand Visibility"],
          gradient: "from-orange-500 to-red-600"
        };
    }
  };

  const currentIllustration = getRoleIllustration(selectedRole);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Dynamic Role Illustration */}
        <div className={`hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br ${currentIllustration.gradient} transition-all duration-700 ease-in-out`}>
          <div className="max-w-md mx-auto text-white space-y-8">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>HackHub</h2>
              </div>
              
              <h1 className="text-4xl font-bold leading-tight" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>
                {currentIllustration.title}
              </h1>
              
              <p className="text-white/90 text-lg">
                {currentIllustration.description}
              </p>
            </div>
            
            {/* Role Selection Tabs */}
            <div className="space-y-4">
              <p className="text-white/80 text-sm font-medium">Choose your role:</p>
              <div className="flex gap-2">
                {(['organizer', 'judge', 'sponsor'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedRole === role
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Illustration Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm transition-all duration-500 group-hover:bg-white/20"></div>
              <div className="relative overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={currentIllustration.image}
                  alt={`${selectedRole} dashboard illustration`}
                  className="w-full h-64 object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Feature List */}
            <div className="space-y-3">
              {currentIllustration.features.map((feature, index) => (
                <div 
                  key={feature} 
                  className="flex items-center gap-3 text-white/90 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-white">
          <div className="mx-auto w-full max-w-md space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>HackHub</span>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>
                {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-600">
                {authMode === 'signup' 
                  ? 'Start managing hackathons like a pro' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                onClick={() => handleSocialLogin('devpost')}
                disabled={isLoading}
              >
                <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
                Continue with Devpost
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <Chrome className="w-5 h-5 mr-3 text-gray-700" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Auth Tabs */}
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signup' | 'login')}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="signup" className="data-[state=active]:bg-white">Sign Up</TabsTrigger>
                <TabsTrigger value="login" className="data-[state=active]:bg-white">Login</TabsTrigger>
              </TabsList>

              {/* Signup Form */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loginPassword" className="text-gray-700">Password</Label>
                      <Button variant="link" className="px-0 font-normal text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="loginPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{' '}
              <Button variant="link" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700">
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="link" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}