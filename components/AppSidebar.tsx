'use client'
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Building2,
  Trophy,
  Target,
  Settings,
  Timer,
  Calendar,
  Play,
} from 'lucide-react';

type Screen = 'dashboard' | 'projects' | 'judges' | 'sponsors' | 'prizes' | 'results' | 'judging-setup' | 'judging-schedule' | 'judging-session' | 'settings';

interface AppSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const navigationItems = [
  {
    id: 'dashboard' as Screen,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'projects' as Screen,
    label: 'Projects',
    icon: FolderOpen,
  },
  {
    id: 'judges' as Screen,
    label: 'Judges',
    icon: Users,
  },
  {
    id: 'sponsors' as Screen,
    label: 'Sponsors',
    icon: Building2,
  },
  {
    id: 'prizes' as Screen,
    label: 'Prizes',
    icon: Trophy,
  },
  {
    id: 'judging-setup' as Screen,
    label: 'Judging Setup',
    icon: Timer,
  },
  {
    id: 'judging-schedule' as Screen,
    label: 'Judging Schedule',
    icon: Calendar,
  },
  {
    id: 'judging-session' as Screen,
    label: 'Judge Session',
    icon: Play,
  },
  {
    id: 'results' as Screen,
    label: 'Results',
    icon: Target,
  },
  {
    id: 'settings' as Screen,
    label: 'Settings',
    icon: Settings,
  },
];

export function AppSidebar({ currentScreen, onScreenChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">HackHub</h2>
            <p className="text-muted-foreground text-sm">ShellHacks 2025</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onScreenChange(item.id)}
                isActive={currentScreen === item.id}
                className="w-full justify-start gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 group"
              >
                <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}