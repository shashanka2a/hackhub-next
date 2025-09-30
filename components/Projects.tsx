'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Search, Filter, Eye, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'EcoTracker',
    table: 'A-12',
    track: 'AI/ML',
    assignedJudges: ['Sarah Chen', 'Mike Johnson'],
    status: 'judged',
    description: 'An AI-powered app that helps users track their carbon footprint and suggests eco-friendly alternatives.',
    techStack: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
    sponsors: ['Google Cloud', 'Sustainability Corp'],
    team: 'Green Innovators',
    devpostUrl: 'https://devpost.com/ecotracker',
  },
  {
    id: 2,
    name: 'MediConnect',
    table: 'B-05',
    track: 'Web Development',
    assignedJudges: ['Dr. Lisa Park'],
    status: 'pending',
    description: 'A telemedicine platform connecting patients with healthcare providers in rural areas.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC'],
    sponsors: ['AWS', 'HealthTech Solutions'],
    team: 'Digital Health',
    devpostUrl: 'https://devpost.com/mediconnect',
  },
  {
    id: 3,
    name: 'CryptoWallet Pro',
    table: 'C-08',
    track: 'Blockchain',
    assignedJudges: ['Alex Rivera', 'Emma Wilson', 'Tom Baker'],
    status: 'judged',
    description: 'A secure, user-friendly cryptocurrency wallet with advanced portfolio management features.',
    techStack: ['React', 'Solidity', 'Web3.js', 'MongoDB'],
    sponsors: ['Ethereum Foundation', 'Binance'],
    team: 'Crypto Pioneers',
    devpostUrl: 'https://devpost.com/cryptowallet-pro',
  },
  {
    id: 4,
    name: 'FitAI',
    table: 'A-18',
    track: 'Mobile Apps',
    assignedJudges: ['Jessica Kim'],
    status: 'pending',
    description: 'AI-powered fitness app that creates personalized workout plans based on user preferences and goals.',
    techStack: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Dart'],
    sponsors: ['Microsoft Azure', 'FitnessTech Inc'],
    team: 'Healthy Coders',
    devpostUrl: 'https://devpost.com/fitai',
  },
];

const tracks = ['All Tracks', 'AI/ML', 'Web Development', 'Mobile Apps', 'Blockchain'];
const sponsors = ['All Sponsors', 'Google Cloud', 'AWS', 'Microsoft Azure', 'Ethereum Foundation'];

export function Projects() {
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedSponsor, setSelectedSponsor] = useState('All Sponsors');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(project => {
    const trackMatch = selectedTrack === 'All Tracks' || project.track === selectedTrack;
    const sponsorMatch = selectedSponsor === 'All Sponsors' || project.sponsors.includes(selectedSponsor);
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    const searchMatch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       project.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    return trackMatch && sponsorMatch && statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage and monitor all hackathon project submissions.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects or teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTrack} onValueChange={setSelectedTrack}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Select track" />
              </SelectTrigger>
              <SelectContent>
                {tracks.map((track) => (
                  <SelectItem key={track} value={track}>
                    {track}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Select sponsor" />
              </SelectTrigger>
              <SelectContent>
                {sponsors.map((sponsor) => (
                  <SelectItem key={sponsor} value={sponsor}>
                    {sponsor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'judged' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('judged')}
              >
                Judged
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Submissions ({filteredProjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Table #</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Assigned Judges</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow 
                    key={project.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.table}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.track}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.assignedJudges.slice(0, 3).map((judge, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-background"
                            title={judge}
                          >
                            {judge.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                        {project.assignedJudges.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                            +{project.assignedJudges.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={project.status === 'judged' ? 'default' : 'secondary'}
                        className={project.status === 'judged' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedProject?.name}
              <Badge variant="outline">{selectedProject?.track}</Badge>
            </DialogTitle>
            <DialogDescription>
              Team: {selectedProject?.team} • Table: {selectedProject?.table}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Sponsor Partners</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.sponsors.map((sponsor) => (
                    <Badge key={sponsor} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {sponsor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Assigned Judges</h4>
                <div className="space-y-2">
                  {selectedProject.assignedJudges.map((judge) => (
                    <div key={judge} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                        {judge.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{judge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex items-center gap-2" asChild>
                  <a href={selectedProject.devpostUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    View on Devpost
                  </a>
                </Button>
                <Button variant="outline">
                  Assign More Judges
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}