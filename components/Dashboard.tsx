'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  FolderOpen, 
  Users, 
  Building2, 
  Trophy, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const statsCards = [
  {
    title: 'Projects',
    value: '250',
    change: '+8 from last hour',
    icon: FolderOpen,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Judges',
    value: '62',
    change: '48 active now',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Sponsors',
    value: '13',
    change: '12 prize tracks',
    icon: Building2,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Prizes',
    value: '14',
    change: '$45.6k total value',
    icon: Trophy,
    gradient: 'from-orange-500 to-red-500',
  },
];

const upcomingDeadlines = [
  {
    title: 'Project Submissions Close',
    time: 'Oct 18, 10:30 PM PDT',
    status: 'urgent',
    icon: AlertCircle,
  },
  {
    title: 'Judging Period Ends',
    time: 'Oct 19, 4:00 PM PDT',
    status: 'warning',
    icon: Clock,
  },
  {
    title: 'Awards Ceremony',
    time: 'Oct 19, 6:00 PM PDT',
    status: 'info',
    icon: Trophy,
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">DubHacks '25 Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor DubHacks '25 progress and manage all aspects of the event at UW Seattle.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Tracker */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Judging Progress
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track how many projects have been reviewed by judges
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">165/250 projects (66%)</span>
              </div>
              <Progress value={67} className="h-3" />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI/ML Track</span>
                  <span className="font-medium">38/52 (73%)</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Web Development</span>
                  <span className="font-medium">42/61 (69%)</span>
                </div>
                <Progress value={69} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mobile Apps</span>
                  <span className="font-medium">35/48 (73%)</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Blockchain</span>
                  <span className="font-medium">28/41 (68%)</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hardware</span>
                  <span className="font-medium">15/22 (68%)</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Social Impact</span>
                  <span className="font-medium">7/23 (30%)</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className={`p-2 rounded-lg ${
                  deadline.status === 'urgent' 
                    ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' 
                    : deadline.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                }`}>
                  <deadline.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">{deadline.time}</p>
                </div>
                <Badge 
                  variant={
                    deadline.status === 'urgent' 
                      ? 'destructive' 
                      : deadline.status === 'warning'
                      ? 'secondary'
                      : 'default'
                  }
                  className="text-xs"
                >
                  {deadline.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Live Judging Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Live Judging Progress
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring of judging sessions and fairness metrics
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium">Active Sessions</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-xs text-blue-600">Judges currently evaluating</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium">Fairness Check</p>
              </div>
              <p className="text-2xl font-bold text-green-600">94%</p>
              <p className="text-xs text-green-600">Projects with ≥3 judges</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <p className="text-sm font-medium">Avg Score</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">82.3</p>
              <p className="text-xs text-purple-600">Out of 100 points</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Judge Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    SC
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">Currently judging: MiamiTech Navigator</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    MJ
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mike Johnson</p>
                    <p className="text-xs text-muted-foreground">Completed: 12/15 projects</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  Break (5 min)
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Common tasks to help you manage the hackathon efficiently
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button className="p-4 text-left rounded-lg border border-border hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group">
              <Users className="w-8 h-8 mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Setup Judging</h3>
              <p className="text-xs text-muted-foreground">Configure judging type & timing</p>
            </button>
            
            <button className="p-4 text-left rounded-lg border border-border hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50 dark:hover:from-green-950/20 dark:hover:to-blue-950/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group">
              <Trophy className="w-8 h-8 mb-2 text-green-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Update Prizes</h3>
              <p className="text-xs text-muted-foreground">Manage prize distribution</p>
            </button>
            
            <button className="p-4 text-left rounded-lg border border-border hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/20 dark:hover:to-pink-950/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group">
              <Building2 className="w-8 h-8 mb-2 text-purple-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Sponsor Reports</h3>
              <p className="text-xs text-muted-foreground">Generate sponsor analytics</p>
            </button>
            
            <button className="p-4 text-left rounded-lg border border-border hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group">
              <FolderOpen className="w-8 h-8 mb-2 text-orange-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Export Data</h3>
              <p className="text-xs text-muted-foreground">Download project submissions</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}