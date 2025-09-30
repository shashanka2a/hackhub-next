'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Users, 
  Building2, 
  ArrowRight,
  Shield,
  Trophy,
  CheckCircle2
} from 'lucide-react';

type UserType = 'organizer' | 'judge' | 'sponsor';

interface RoleSelectionProps {
  onRoleSelect: (role: UserType) => void;
  onBack: () => void;
}

const roles = [
  {
    type: 'organizer' as UserType,
    title: 'Event Organizer',
    description: 'Manage all aspects of your hackathon including projects, judges, sponsors, and results',
    icon: Settings,
    features: [
      'Full event management dashboard',
      'Import hackathon from Devpost',
      'Manage judges and assignments',
      'Configure prizes and tracks',
      'Generate results and analytics'
    ],
    gradient: 'from-violet-500 to-blue-600',
    badge: 'Full Access',
    nextStep: 'Set up your hackathon'
  },
  {
    type: 'judge' as UserType,
    title: 'Judge',
    description: 'Evaluate projects assigned to you with a streamlined judging interface',
    icon: Users,
    features: [
      'Simplified judging dashboard',
      'Project-by-project evaluation',
      'Star rating and feedback system',
      'Progress tracking',
      'Distraction-free interface'
    ],
    gradient: 'from-green-500 to-emerald-600',
    badge: 'Judging Only',
    nextStep: 'Start judging projects'
  },
  {
    type: 'sponsor' as UserType,
    title: 'Sponsor',
    description: 'Judge projects in your sponsored track and discover innovative solutions',
    icon: Building2,
    features: [
      'Track-specific project judging',
      'Technology integration highlights',
      'Sponsor-focused evaluation criteria',
      'Winner identification tools',
      'Brand integration features'
    ],
    gradient: 'from-orange-500 to-red-600',
    badge: 'Track Access',
    nextStep: 'Judge your track projects'
  }
];

export function RoleSelection({ onRoleSelect, onBack }: RoleSelectionProps) {
  const handleRoleSelect = (role: UserType) => {
    onRoleSelect(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome to HackHub</h1>
              <p className="text-muted-foreground">ShellHacks 2025 • Miami, FL</p>
            </div>
          </div>
          <h2 className="text-xl text-muted-foreground mb-2">Choose Your Role</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select how you'll be participating in ShellHacks 2025. Each role has a tailored interface designed for your specific needs.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {roles.map((role) => (
            <Card 
              key={role.type}
              className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-violet-200 dark:hover:border-violet-800"
              onClick={() => handleRoleSelect(role.type)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${role.gradient} text-white border-0`}
                    >
                      {role.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    What you'll get:
                  </h4>
                  <ul className="space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white border-0 group-hover:shadow-md transition-all duration-200`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleSelect(role.type);
                  }}
                >
                  {role.nextStep}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Need to change your role later? Contact the event organizers.
          </p>
          
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}