'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Edit3,
  Plus,
  Filter
} from 'lucide-react';

const scheduleSlots = [
  {
    id: 1,
    time: '2:00 PM',
    endTime: '2:08 PM',
    judge: 'Shashank Jagannatham',
    project: 'EcoTracker',
    table: 'A-12',
    track: 'AI/ML',
    status: 'scheduled',
  },
  {
    id: 2,
    time: '2:08 PM',
    endTime: '2:16 PM',
    judge: 'Shashank Jagannatham',
    project: 'SmartDetect',
    table: 'A-15',
    track: 'AI/ML',
    status: 'scheduled',
  },
  {
    id: 3,
    time: '2:00 PM',
    endTime: '2:08 PM',
    judge: 'Syed Mustafa',
    project: 'MediConnect',
    table: 'B-05',
    track: 'Web Dev',
    status: 'completed',
  },
  {
    id: 4,
    time: '2:16 PM',
    endTime: '2:24 PM',
    judge: 'Dhanooram Nagaraj',
    project: 'CryptoWallet Pro',
    table: 'C-08',
    track: 'Blockchain',
    status: 'conflict',
    conflictReason: 'Overlaps with break time',
  },
  {
    id: 5,
    time: '2:08 PM',
    endTime: '2:16 PM',
    judge: 'Natalie Neshama',
    project: 'FitAI',
    table: 'A-18',
    track: 'Mobile',
    status: 'scheduled',
  },
  {
    id: 6,
    time: '2:24 PM',
    endTime: '2:32 PM',
    judge: 'Serhii Romanov',
    project: 'BlockchainVault',
    table: 'C-15',
    track: 'Blockchain',
    status: 'scheduled',
  },
  {
    id: 7,
    time: '2:32 PM',
    endTime: '2:40 PM',
    judge: 'Fenil Gholani',
    project: 'IoT Dashboard',
    table: 'D-02',
    track: 'Hardware',
    status: 'scheduled',
  },
];

const judgeSchedules = [
  {
    judge: 'Shashank Jagannatham',
    totalSlots: 15,
    completedSlots: 8,
    upcomingSlots: 7,
    nextSlot: {
      time: '2:00 PM',
      project: 'EcoTracker',
      table: 'A-12',
    },
  },
  {
    judge: 'Syed Mustafa',
    totalSlots: 12,
    completedSlots: 6,
    upcomingSlots: 6,
    nextSlot: {
      time: '2:30 PM',
      project: 'DataPlatform',
      table: 'B-12',
    },
  },
  {
    judge: 'Dhanooram Nagaraj',
    totalSlots: 10,
    completedSlots: 3,
    upcomingSlots: 7,
    nextSlot: {
      time: '2:45 PM',
      project: 'AI Classifier',
      table: 'A-20',
    },
  },
  {
    judge: 'Natalie Neshama',
    totalSlots: 14,
    completedSlots: 5,
    upcomingSlots: 9,
    nextSlot: {
      time: '2:08 PM',
      project: 'FitAI',
      table: 'A-18',
    },
  },
  {
    judge: 'Serhii Romanov',
    totalSlots: 11,
    completedSlots: 4,
    upcomingSlots: 7,
    nextSlot: {
      time: '2:24 PM',
      project: 'BlockchainVault',
      table: 'C-15',
    },
  },
  {
    judge: 'Fenil Gholani',
    totalSlots: 13,
    completedSlots: 7,
    upcomingSlots: 6,
    nextSlot: {
      time: '2:32 PM',
      project: 'IoT Dashboard',
      table: 'D-02',
    },
  },
];

export function JudgingSchedule() {
  const [viewMode, setViewMode] = useState<'organizer' | 'judge'>('organizer');
  const [selectedJudge, setSelectedJudge] = useState('Shashank Jagannatham');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'conflict':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'conflict':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Judging Schedule</h1>
        <p className="text-muted-foreground">
          Manage and monitor judging sessions and assignments.
        </p>
      </div>

      {/* View Mode Toggle */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'organizer' | 'judge')}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="organizer">Organizer View</TabsTrigger>
            <TabsTrigger value="judge">Judge View</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Slot
            </Button>
          </div>
        </div>

        {/* Organizer View */}
        <TabsContent value="organizer" className="space-y-6">
          {/* Schedule Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <p className="text-sm font-medium">Total Slots</p>
                </div>
                <p className="text-2xl font-bold">125</p>
                <p className="text-xs text-muted-foreground">Across all judges</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-sm font-medium">Completed</p>
                </div>
                <p className="text-2xl font-bold">68</p>
                <p className="text-xs text-muted-foreground">54% progress</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <p className="text-sm font-medium">Upcoming</p>
                </div>
                <p className="text-2xl font-bold">52</p>
                <p className="text-xs text-muted-foreground">Next 4 hours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <p className="text-sm font-medium">Conflicts</p>
                </div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Need resolution</p>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  Schedule Timeline
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Bulk Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduleSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[80px]">
                        <p className="font-medium">{slot.time}</p>
                        <p className="text-xs text-muted-foreground">{slot.endTime}</p>
                      </div>
                      
                      <div className="w-px h-12 bg-border"></div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {slot.judge.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{slot.judge}</p>
                          <p className="text-sm text-muted-foreground">{slot.project}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{slot.table}</span>
                      </div>
                      
                      <Badge variant="outline">{slot.track}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(slot.status)}>
                        {getStatusIcon(slot.status)}
                        <span className="ml-1">{slot.status}</span>
                      </Badge>
                      
                      {slot.status === 'conflict' && (
                        <Button variant="outline" size="sm">
                          Resolve
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="sm">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Judge View */}
        <TabsContent value="judge" className="space-y-6">
          {/* Judge Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Judge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {judgeSchedules.map((judge) => (
                  <button
                    key={judge.judge}
                    onClick={() => setSelectedJudge(judge.judge)}
                    className={`p-4 text-left rounded-lg border transition-all hover:shadow-md ${
                      selectedJudge === judge.judge
                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-300'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                        {judge.judge.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-medium">{judge.judge}</h3>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{judge.completedSlots}/{judge.totalSlots} completed</p>
                      <p>{judge.upcomingSlots} upcoming</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Judge Schedule */}
          {selectedJudge && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-500" />
                  {selectedJudge}'s Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Next Assignment */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Next Assignment</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-medium text-green-700 dark:text-green-300">
                          {judgeSchedules.find(j => j.judge === selectedJudge)?.nextSlot.time}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">Today</p>
                      </div>
                      <div className="w-px h-8 bg-green-300"></div>
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">
                          {judgeSchedules.find(j => j.judge === selectedJudge)?.nextSlot.project}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Table {judgeSchedules.find(j => j.judge === selectedJudge)?.nextSlot.table}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Simple Schedule List */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Scheduled Sessions</h4>
                    {scheduleSlots
                      .filter(slot => slot.judge === selectedJudge)
                      .map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-center min-w-[60px]">
                              <p className="font-medium text-sm">{slot.time}</p>
                              <p className="text-xs text-muted-foreground">{slot.endTime}</p>
                            </div>
                            <div>
                              <p className="font-medium">{slot.project}</p>
                              <p className="text-sm text-muted-foreground">Table {slot.table}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(slot.status)}>
                            {getStatusIcon(slot.status)}
                            <span className="ml-1">{slot.status}</span>
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}