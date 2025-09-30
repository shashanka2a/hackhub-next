'use client'
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/components/Dashboard';
import { Projects } from '@/components/Projects';
import { Judges } from '@/components/Judges';
import { Sponsors } from '@/components/Sponsors';
import { Prizes } from '@/components/Prizes';
import { Results } from '@/components/Results';
import { JudgingSetup } from '@/components/JudgingSetup';
import { JudgingSchedule } from '@/components/JudgingSchedule';
import { JudgingSession } from '@/components/JudgingSession';
import { JudgeDashboard } from '@/components/JudgeDashboard';
import { SponsorDashboard } from '@/components/SponsorDashboard';
import { RoleSelection } from '@/components/RoleSelection';
import { LandingPage } from '@/components/LandingPage';
import { AuthScreen } from '@/components/AuthScreen';
import { ImportHackathon } from '@/components/ImportHackathon';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

type Screen = 'dashboard' | 'projects' | 'judges' | 'sponsors' | 'prizes' | 'results' | 'judging-setup' | 'judging-schedule' | 'judging-session' | 'settings';
type AppState = 'landing' | 'auth' | 'role-selection' | 'import' | 'dashboard';
type UserType = 'organizer' | 'judge' | 'sponsor';

function SettingsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your hackathon event settings and preferences.
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Configuration</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Event management settings</p>
            <p>• Judge assignment rules</p>
            <p>• Scoring criteria setup</p>
            <p>• Timeline configuration</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Integrations</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Devpost API connection</p>
            <p>• Slack notifications</p>
            <p>• Email templates</p>
            <p>• Data export options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderScreen(currentScreen: Screen) {
  switch (currentScreen) {
    case 'dashboard':
      return <Dashboard />;
    case 'projects':
      return <Projects />;
    case 'judges':
      return <Judges />;
    case 'sponsors':
      return <Sponsors />;
    case 'prizes':
      return <Prizes />;
    case 'judging-setup':
      return <JudgingSetup />;
    case 'judging-schedule':
      return <JudgingSchedule />;
    case 'judging-session':
      return <JudgingSession />;
    case 'results':
      return <Results />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <Dashboard />;
  }
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [userType, setUserType] = useState<UserType>('organizer');

  const handleGetStarted = () => {
    setAppState('auth');
  };

  const handleExploreDemo = () => {
    // For demo, skip auth and go directly to dashboard
    setAppState('dashboard');
    setUserType('organizer');
  };

  const handleAuthenticated = () => {
    setAppState('role-selection');
  };

  const handleRoleSelected = (role: UserType) => {
    setUserType(role);
    
    // Route based on role
    if (role === 'organizer') {
      setAppState('import');
    } else {
      // Judges and sponsors go directly to their dashboards
      setAppState('dashboard');
    }
  };

  const handleImportComplete = () => {
    setAppState('dashboard');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  // Render different app states
  if (appState === 'landing') {
    return (
      <>
        <LandingPage 
          onGetStarted={handleGetStarted}
          onExploreDemo={handleExploreDemo}
        />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  if (appState === 'auth') {
    return (
      <>
        <AuthScreen 
          onBack={handleBackToLanding}
          onAuthenticated={handleAuthenticated}
        />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  if (appState === 'role-selection') {
    return (
      <>
        <RoleSelection 
          onRoleSelect={handleRoleSelected}
          onBack={handleBackToAuth}
        />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  if (appState === 'import') {
    return (
      <>
        <ImportHackathon 
          onComplete={handleImportComplete}
          userType={userType}
        />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  // Dashboard app - different UI based on user type
  if (userType === 'judge') {
    return (
      <>
        <JudgeDashboard />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  if (userType === 'sponsor') {
    return (
      <>
        <SponsorDashboard />
        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </>
    );
  }

  // Organizer gets full-featured dashboard
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <AppSidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        
        <div className="flex flex-col flex-1 lg:pl-64">
          <TopBar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {renderScreen(currentScreen)}
            </div>
          </main>
        </div>

        <Toaster 
          position="top-right"
          expand
          richColors
          closeButton
        />
      </div>
    </SidebarProvider>
  );
}