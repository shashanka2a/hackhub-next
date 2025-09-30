'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Building2, Users, Trophy, Edit3 } from 'lucide-react';

const sponsors = [
  {
    id: 1,
    name: 'Google Cloud',
    logo: 'GC',
    track: 'Cloud Computing',
    judgesAssigned: 3,
    prizesOffered: 1,
    prizeValue: '$5,000',
    description: 'Leading cloud platform for AI and machine learning solutions.',
    color: 'from-blue-500 to-cyan-500',
    tier: 'Platinum',
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'MS',
    track: 'AI Innovation',
    judgesAssigned: 3,
    prizesOffered: 1,
    prizeValue: '$4,000',
    description: 'Empowering every person and organization on the planet to achieve more.',
    color: 'from-blue-600 to-purple-600',
    tier: 'Platinum',
  },
  {
    id: 3,
    name: 'NVIDIA',
    logo: 'NV',
    track: 'AI/ML Excellence',
    judgesAssigned: 2,
    prizesOffered: 1,
    prizeValue: '$3,500',
    description: 'The computing company powering the age of AI.',
    color: 'from-green-500 to-emerald-500',
    tier: 'Platinum',
  },
  {
    id: 4,
    name: 'Netflix',
    logo: 'NF',
    track: 'Content & Media',
    judgesAssigned: 2,
    prizesOffered: 1,
    prizeValue: '$3,000',
    description: 'The world\'s leading streaming entertainment service.',
    color: 'from-red-500 to-pink-500',
    tier: 'Gold',
  },
  {
    id: 5,
    name: 'Capital One',
    logo: 'C1',
    track: 'FinTech Innovation',
    judgesAssigned: 2,
    prizesOffered: 1,
    prizeValue: '$2,500',
    description: 'A diversified bank that offers a broad spectrum of financial products.',
    color: 'from-blue-500 to-indigo-600',
    tier: 'Gold',
  },
  {
    id: 6,
    name: 'State Farm',
    logo: 'SF',
    track: 'InsurTech',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$2,000',
    description: 'Like a good neighbor, State Farm is there.',
    color: 'from-red-600 to-red-700',
    tier: 'Gold',
  },
  {
    id: 7,
    name: 'Waymo',
    logo: 'WM',
    track: 'Autonomous Systems',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$2,000',
    description: 'Building the world\'s most experienced driver.',
    color: 'from-teal-500 to-cyan-600',
    tier: 'Gold',
  },
  {
    id: 8,
    name: 'Assurant',
    logo: 'AS',
    track: 'Digital Solutions',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$1,500',
    description: 'Global provider of risk management and digital solutions.',
    color: 'from-purple-500 to-violet-600',
    tier: 'Silver',
  },
  {
    id: 9,
    name: 'Google',
    logo: 'GO',
    track: 'Developer Tools',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$1,500',
    description: 'Organizing the world\'s information and making it universally accessible.',
    color: 'from-yellow-500 to-orange-500',
    tier: 'Silver',
  },
  {
    id: 10,
    name: 'Github',
    logo: 'GH',
    track: 'Open Source',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$1,000',
    description: 'The world\'s leading software development platform.',
    color: 'from-gray-700 to-gray-900',
    tier: 'Silver',
  },
  {
    id: 11,
    name: 'Wix.com & Base44',
    logo: 'WX',
    track: 'Web Innovation',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$1,000',
    description: 'Leading cloud-based web development platform.',
    color: 'from-blue-400 to-purple-500',
    tier: 'Silver',
  },
  {
    id: 12,
    name: 'Wolfram',
    logo: 'WF',
    track: 'Computational',
    judgesAssigned: 1,
    prizesOffered: 1,
    prizeValue: '$500',
    description: 'Computation meets knowledge in the Wolfram Language.',
    color: 'from-orange-600 to-red-600',
    tier: 'Bronze',
  },
];

export function Sponsors() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSponsors = sponsors.filter(sponsor =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sponsor.track.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 'Gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const totalSponsors = sponsors.length;
  const totalJudges = sponsors.reduce((sum, sponsor) => sum + sponsor.judgesAssigned, 0);
  const totalPrizes = sponsors.reduce((sum, sponsor) => sum + sponsor.prizesOffered, 0);
  const totalValue = sponsors.reduce((sum, sponsor) => sum + parseInt(sponsor.prizeValue.replace(/[$,]/g, '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sponsors</h1>
        <p className="text-muted-foreground">
          Manage sponsor information, tracks, and prize allocations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSponsors}</div>
            <p className="text-xs text-muted-foreground">
              Across all tiers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsor Judges</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJudges}</div>
            <p className="text-xs text-muted-foreground">
              Industry experts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prizes</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrizes}</div>
            <p className="text-xs text-muted-foreground">
              Prize categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Sponsors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sponsors by name or track..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Building2 className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSponsors.map((sponsor) => (
          <Card key={sponsor.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {sponsor.logo}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {sponsor.track}
                    </Badge>
                  </div>
                </div>
                <Badge className={getTierColor(sponsor.tier)}>
                  {sponsor.tier}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {sponsor.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-lg font-bold">{sponsor.judgesAssigned}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Judges</p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center mb-1">
                    <Trophy className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-lg font-bold">{sponsor.prizesOffered}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Prizes</p>
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Prize Pool</p>
                <p className="text-xl font-bold text-green-800 dark:text-green-200">{sponsor.prizeValue}</p>
              </div>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-950/20 dark:group-hover:to-purple-950/20 transition-all duration-200"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Sponsor Info
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSponsors.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No sponsors found</h3>
            <p className="text-muted-foreground text-center mb-6">
              No sponsors match your current search criteria. Try adjusting your search or add a new sponsor.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Building2 className="w-4 h-4 mr-2" />
              Add First Sponsor
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sponsor Analytics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sponsor Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of sponsor tiers and their contributions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {['Platinum', 'Gold', 'Silver'].map((tier) => {
              const tierSponsors = sponsors.filter(s => s.tier === tier);
              const tierValue = tierSponsors.reduce((sum, s) => sum + parseInt(s.prizeValue.replace(/[$,]/g, '')), 0);
              
              return (
                <div key={tier} className="text-center p-4 rounded-lg border">
                  <Badge className={`${getTierColor(tier)} mb-2`}>
                    {tier}
                  </Badge>
                  <div className="text-2xl font-bold">{tierSponsors.length}</div>
                  <p className="text-sm text-muted-foreground">sponsors</p>
                  <p className="text-lg font-medium mt-2">${tierValue.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}