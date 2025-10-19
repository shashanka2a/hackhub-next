'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, UserPlus, Building2, Award } from 'lucide-react';

const judges = [
  {
    id: 1,
    name: 'Nolan',
    email: 'nolan@shellhacks.com',
    sponsor: 'General',
    specialization: 'Full Stack Development',
    projectsJudged: 12,
    totalAssigned: 15,
    avatar: 'N',
    status: 'active',
  },
  {
    id: 2,
    name: 'Syed Mustafa',
    email: 'syed.mustafa@shellhacks.com',
    sponsor: 'General',
    specialization: 'Mobile Development',
    projectsJudged: 8,
    totalAssigned: 10,
    avatar: 'SM',
    status: 'active',
  },
  {
    id: 3,
    name: 'Dhanooram Nagaraj',
    email: 'dhanooram.nagaraj@shellhacks.com',
    sponsor: 'General',
    specialization: 'AI/ML',
    projectsJudged: 5,
    totalAssigned: 8,
    avatar: 'DN',
    status: 'active',
  },
  {
    id: 4,
    name: 'Natalie Neshama',
    email: 'natalie.neshama@shellhacks.com',
    sponsor: 'General',
    specialization: 'Web Development',
    projectsJudged: 15,
    totalAssigned: 15,
    avatar: 'NN',
    status: 'completed',
  },
  {
    id: 5,
    name: 'Serhii Romanov',
    email: 'serhii.romanov@shellhacks.com',
    sponsor: 'General',
    specialization: 'Blockchain',
    projectsJudged: 3,
    totalAssigned: 12,
    avatar: 'SR',
    status: 'active',
  },
  {
    id: 6,
    name: 'Fenil Gholani',
    email: 'fenil.gholani@shellhacks.com',
    sponsor: 'General',
    specialization: 'Hardware',
    projectsJudged: 7,
    totalAssigned: 10,
    avatar: 'FG',
    status: 'active',
  },
];

const sponsors = ['All Sponsors', 'General'];

export function Judges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState('All Sponsors');

  const filteredJudges = judges.filter(judge => {
    const searchMatch = judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       judge.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const sponsorMatch = selectedSponsor === 'All Sponsors' || judge.sponsor === selectedSponsor;
    
    return searchMatch && sponsorMatch;
  });

  const getProgressColor = (judged: number, total: number) => {
    const percentage = (judged / total) * 100;
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-purple-500 to-pink-600', 
      'from-green-500 to-blue-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-violet-600'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Judges</h1>
        <p className="text-muted-foreground">
          Manage judges and track their project review progress.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Judges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{judges.length}</div>
            <p className="text-xs text-muted-foreground">
              {judges.filter(j => j.status === 'active').length} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {judges.reduce((sum, judge) => sum + judge.projectsJudged, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              of {judges.reduce((sum, judge) => sum + judge.totalAssigned, 0)} total assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((judges.reduce((sum, judge) => sum + (judge.projectsJudged / judge.totalAssigned), 0) / judges.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              across all judges
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Judges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search judges by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Filter by sponsor" />
              </SelectTrigger>
              <SelectContent>
                {sponsors.map((sponsor) => (
                  <SelectItem key={sponsor} value={sponsor}>
                    {sponsor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Judge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Judges Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJudges.map((judge) => (
          <Card key={judge.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-card">
            <CardContent className="p-6">
              {/* Header with Avatar and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(judge.name)} flex items-center justify-center text-white font-medium text-lg shadow-lg`}>
                    {judge.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{judge.name}</h3>
                    <p className="text-sm text-muted-foreground">{judge.email}</p>
                  </div>
                </div>
                <Badge 
                  variant={judge.status === 'completed' ? 'default' : 'secondary'}
                  className={`text-xs ${judge.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}
                >
                  {judge.status}
                </Badge>
              </div>

              {/* Sponsor and Specialization */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Sponsor</span>
                  <span className="text-sm font-medium">{judge.sponsor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Specialization</span>
                  <span className="text-sm text-muted-foreground">{judge.specialization}</span>
                </div>
              </div>

              {/* Review Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Review Progress</span>
                  <span className="text-sm font-medium">
                    {judge.projectsJudged}/{judge.totalAssigned}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(judge.projectsJudged, judge.totalAssigned)}`}
                    style={{ width: `${(judge.projectsJudged / judge.totalAssigned) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((judge.projectsJudged / judge.totalAssigned) * 100)}% complete
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-sm">
                  View Projects
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={judge.status === 'completed'}
                >
                  Assign More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJudges.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserPlus className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No judges found</h3>
            <p className="text-muted-foreground text-center mb-6">
              No judges match your current search criteria. Try adjusting your filters or add a new judge.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add First Judge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}