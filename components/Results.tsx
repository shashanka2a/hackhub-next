'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Trophy, Medal, Award, Download, ExternalLink, Crown } from 'lucide-react';

const overallWinners = [
  {
    rank: 1,
    projectName: 'EcoTracker',
    team: 'Green Innovators',
    track: 'AI/ML',
    score: 95,
    sponsors: ['Google Cloud', 'Sustainability Corp'],
    description: 'AI-powered carbon footprint tracking with personalized recommendations',
    prize: '$10,000 Grand Prize',
  },
  {
    rank: 2,
    projectName: 'MediConnect',
    team: 'Digital Health',
    track: 'Web Development',
    score: 92,
    sponsors: ['AWS', 'HealthTech Solutions'],
    description: 'Telemedicine platform for rural healthcare access',
    prize: '$5,000 Second Place',
  },
  {
    rank: 3,
    projectName: 'CryptoWallet Pro',
    team: 'Crypto Pioneers',
    track: 'Blockchain',
    score: 90,
    sponsors: ['Ethereum Foundation', 'Binance'],
    description: 'Secure cryptocurrency wallet with portfolio management',
    prize: '$3,000 Third Place',
  },
];

const trackWinners = {
  'AI/ML': [
    {
      rank: 1,
      projectName: 'EcoTracker',
      team: 'Green Innovators',
      score: 95,
      sponsors: ['Google Cloud'],
      description: 'AI-powered carbon footprint tracking',
      prize: 'Best AI/ML Solution - $2,500',
    },
    {
      rank: 2,
      projectName: 'SmartDetect',
      team: 'Vision AI',
      score: 88,
      sponsors: ['NVIDIA'],
      description: 'Computer vision for manufacturing quality control',
      prize: 'AI Innovation Award - $1,500',
    },
  ],
  'Web Development': [
    {
      rank: 1,
      projectName: 'MediConnect',
      team: 'Digital Health',
      score: 92,
      sponsors: ['AWS'],
      description: 'Rural telemedicine platform',
      prize: 'Best Web App - $2,500',
    },
    {
      rank: 2,
      projectName: 'EduPlatform',
      team: 'Learn Together',
      score: 85,
      sponsors: ['Vercel'],
      description: 'Collaborative learning management system',
      prize: 'Web Innovation - $1,500',
    },
  ],
  'Mobile Apps': [
    {
      rank: 1,
      projectName: 'FitAI',
      team: 'Healthy Coders',
      score: 89,
      sponsors: ['Microsoft Azure'],
      description: 'AI-powered personalized fitness coaching',
      prize: 'Best Mobile App - $2,500',
    },
    {
      rank: 2,
      projectName: 'LocalMarket',
      team: 'Community First',
      score: 84,
      sponsors: ['Stripe'],
      description: 'Hyperlocal marketplace for small businesses',
      prize: 'Mobile UX Award - $1,500',
    },
  ],
  'Blockchain': [
    {
      rank: 1,
      projectName: 'CryptoWallet Pro',
      team: 'Crypto Pioneers',
      score: 90,
      sponsors: ['Ethereum Foundation'],
      description: 'Advanced DeFi wallet solution',
      prize: 'Best Blockchain App - $2,500',
    },
    {
      rank: 2,
      projectName: 'SupplyChain',
      team: 'Chain Masters',
      score: 82,
      sponsors: ['Polygon'],
      description: 'Transparent supply chain tracking',
      prize: 'Blockchain Innovation - $1,500',
    },
  ],
};

const specialAwards = [
  {
    title: 'Most Creative Solution',
    winner: 'ArtSpace VR',
    team: 'Creative Minds',
    sponsor: 'Meta',
    prize: '$1,000',
  },
  {
    title: 'Best Use of APIs',
    winner: 'DataFusion',
    team: 'API Masters',
    sponsor: 'Postman',
    prize: '$1,000',
  },
  {
    title: 'Sustainability Impact',
    winner: 'EcoTracker',
    team: 'Green Innovators',
    sponsor: 'Sustainability Corp',
    prize: '$1,500',
  },
];

function ProjectCard({ project, showRank = true }: { project: any; showRank?: boolean }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-amber-600 to-amber-800';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {showRank && (
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br ${getRankBg(project.rank)} flex items-center justify-center shadow-lg`}>
          {getRankIcon(project.rank)}
        </div>
      )}
      <CardHeader className={showRank ? 'pt-20' : ''}>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="group-hover:text-blue-600 transition-colors">
              {project.projectName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">by {project.team}</p>
          </div>
          {project.score && (
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              {project.score}/100
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        
        <div>
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            {project.prize}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.sponsors?.map((sponsor: string) => (
            <Badge key={sponsor} variant="outline" className="text-xs">
              {sponsor}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            View Project
          </Button>
          <Button size="sm" variant="ghost" className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Results() {
  const [selectedTrack, setSelectedTrack] = useState('Overall');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Results & Leaderboards</h1>
        <p className="text-muted-foreground">
          View winners and rankings across all categories and tracks.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">250</p>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Award className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">$75,000</p>
            <p className="text-sm text-muted-foreground">Total Prizes</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Medal className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">32</p>
            <p className="text-sm text-muted-foreground">Winners</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Crown className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Special Awards</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Hackathon Results
          </CardTitle>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Final rankings and winners across all categories
            </p>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Results
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTrack} onValueChange={setSelectedTrack}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="Overall">Overall</TabsTrigger>
              <TabsTrigger value="AI/ML">AI/ML</TabsTrigger>
              <TabsTrigger value="Web Development">Web Dev</TabsTrigger>
              <TabsTrigger value="Mobile Apps">Mobile</TabsTrigger>
              <TabsTrigger value="Blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="Overall" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">🏆 Overall Winners</h3>
                <div className="grid gap-6 lg:grid-cols-3">
                  {overallWinners.map((project) => (
                    <ProjectCard key={project.rank} project={project} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">🎖️ Special Awards</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {specialAwards.map((award, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Award className="w-5 h-5 text-purple-500" />
                          <h4 className="font-medium">{award.title}</h4>
                        </div>
                        <p className="text-sm font-medium">{award.winner}</p>
                        <p className="text-xs text-muted-foreground">by {award.team}</p>
                        <div className="flex justify-between items-center mt-3">
                          <Badge variant="outline">{award.sponsor}</Badge>
                          <p className="text-sm font-medium text-green-600">{award.prize}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {Object.entries(trackWinners).map(([track, winners]) => (
              <TabsContent key={track} value={track} className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{track} Track Winners</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {winners.map((project) => (
                      <ProjectCard key={project.rank} project={project} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}