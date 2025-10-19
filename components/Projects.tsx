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
    name: 'Nuu',
    table: 'A-12',
    track: 'AI/ML',
    assignedJudges: ['Nolan', 'Syed Mustafa'],
    status: 'judged',
    description: 'Scan it. Plan it. Buy it. AI-powered shopping assistant with visual recognition.',
    techStack: ['React', 'Python', 'TensorFlow', 'OpenAI'],
    sponsors: ['VISA', 'MLH - ElevenLabs'],
    team: 'Nuu Team',
    devpostUrl: 'https://devpost.com/nuu',
  },
  {
    id: 2,
    name: 'Evie',
    table: 'B-05',
    track: 'Social Good',
    assignedJudges: ['Dhanooram Nagaraj'],
    status: 'pending',
    description: 'Take a breath. Give one back. Mental health and wellness platform.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC'],
    sponsors: ['DubHacks NEXT', 'Best Freshman'],
    team: 'Evie Team',
    devpostUrl: 'https://devpost.com/evie',
  },
  {
    id: 3,
    name: 'Daydreamer.ai',
    table: 'C-08',
    track: 'AI/ML',
    assignedJudges: ['Natalie Neshama', 'Serhii Romanov', 'Fenil Gholani'],
    status: 'judged',
    description: 'Daydreamer is a digital playground for stories of your choice, the place where imagination meets AI.',
    techStack: ['React', 'OpenAI', 'Gemini API', 'MongoDB'],
    sponsors: ['MLH - Gemini API', 'MLH - ElevenLabs'],
    team: 'Daydreamer Team',
    devpostUrl: 'https://devpost.com/daydreamer-ai',
  },
  {
    id: 4,
    name: 'VibeDance',
    table: 'A-18',
    track: 'Mobile Apps',
    assignedJudges: ['Nolan'],
    status: 'pending',
    description: 'Were you bad at Just Dance when you were little? Our app tracks your dance moves and provides feedback.',
    techStack: ['Flutter', 'TensorFlow', 'Computer Vision', 'Dart'],
    sponsors: ['MLH - ElevenLabs', 'VISA'],
    team: 'VibeDance Team',
    devpostUrl: 'https://devpost.com/vibedance',
  },
  {
    id: 5,
    name: 'DisastEarth',
    table: 'D-02',
    track: 'Social Good',
    assignedJudges: ['Nolan', 'Syed Mustafa'],
    status: 'judged',
    description: 'Helping detect all of earth\'s natural disasters, one place at a time.',
    techStack: ['React', 'Python', 'TensorFlow', 'OpenAI'],
    sponsors: ['Okanagan', 'Statsig'],
    team: 'DisastEarth Team',
    devpostUrl: 'https://devpost.com/disastearth',
  },
  {
    id: 6,
    name: 'ElderLink',
    table: 'E-15',
    track: 'Social Good',
    assignedJudges: ['Dhanooram Nagaraj'],
    status: 'pending',
    description: 'Personalized Conversations, Health-Tracking, and Community Matching for elderly care.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'AI'],
    sponsors: ['DubHacks NEXT', 'Best Freshman'],
    team: 'ElderLink Team',
    devpostUrl: 'https://devpost.com/elderlink',
  },
  {
    id: 7,
    name: 'Quickly',
    table: 'F-08',
    track: 'AI/ML',
    assignedJudges: ['Natalie Neshama'],
    status: 'judged',
    description: 'Your feed just got smarter. AI-powered social media content curation.',
    techStack: ['React', 'OpenAI', 'Gemini API', 'MongoDB'],
    sponsors: ['MLH - Gemini API', 'MLH - Reach Capital'],
    team: 'Quickly Team',
    devpostUrl: 'https://devpost.com/quickly',
  },
  {
    id: 8,
    name: 'IoTelligence',
    table: 'G-12',
    track: 'Hardware',
    assignedJudges: ['Serhii Romanov', 'Fenil Gholani'],
    status: 'pending',
    description: 'Take control of your network; see, manage, and optimize your IoT devices.',
    techStack: ['React', 'Node.js', 'IoT', 'WebSocket'],
    sponsors: ['MLH - Cloudflare', 'Okanagan'],
    team: 'IoTelligence Team',
    devpostUrl: 'https://devpost.com/iotelligence',
  },
  {
    id: 9,
    name: 'CareLens',
    table: 'H-05',
    track: 'AI/ML',
    assignedJudges: ['Nolan'],
    status: 'judged',
    description: 'Fall-detection system that utilizes multi-agent architecture for real-time health monitoring.',
    techStack: ['Python', 'TensorFlow', 'Computer Vision', 'AI'],
    sponsors: ['MLH - ElevenLabs', 'VISA'],
    team: 'CareLens Team',
    devpostUrl: 'https://devpost.com/carelens',
  },
  {
    id: 10,
    name: 'Dubflow',
    table: 'I-18',
    track: 'Mobile Apps',
    assignedJudges: ['Syed Mustafa', 'Dhanooram Nagaraj'],
    status: 'pending',
    description: 'The cutest way to stay accountable. DubFlow is a smart focus tracker with gamification.',
    techStack: ['Flutter', 'Firebase', 'AI', 'Dart'],
    sponsors: ['DubHacks NEXT', 'Best Freshman'],
    team: 'Dubflow Team',
    devpostUrl: 'https://devpost.com/dubflow',
  },
  {
    id: 11,
    name: 'Discreetly',
    table: 'J-22',
    track: 'Social Good',
    assignedJudges: ['Natalie Neshama'],
    status: 'judged',
    description: 'In an emergency, our app contacts help through a button, voice, motion, or location.',
    techStack: ['React Native', 'Node.js', 'Emergency APIs', 'GPS'],
    sponsors: ['Okanagan', 'Statsig'],
    team: 'Discreetly Team',
    devpostUrl: 'https://devpost.com/discreetly',
  },
  {
    id: 12,
    name: 'Syndicate',
    table: 'K-14',
    track: 'Web Development',
    assignedJudges: ['Serhii Romanov', 'Fenil Gholani'],
    status: 'pending',
    description: 'Syndicate was made to bring the hackers of DubHacks25 back together through networking.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC'],
    sponsors: ['MLH - GoDaddy', 'DubHacks NEXT'],
    team: 'Syndicate Team',
    devpostUrl: 'https://devpost.com/syndicate',
  },
  {
    id: 13,
    name: 'The Grounds',
    table: 'L-07',
    track: 'Social Good',
    assignedJudges: ['Nolan', 'Syed Mustafa'],
    status: 'judged',
    description: 'The Grounds is specially designed for individuals with Parkinson\'s disease to improve their quality of life.',
    techStack: ['React', 'Node.js', 'AI', 'Health APIs'],
    sponsors: ['Okanagan', 'Best Freshman'],
    team: 'The Grounds Team',
    devpostUrl: 'https://devpost.com/the-grounds',
  },
  {
    id: 14,
    name: 'FocalAi',
    table: 'M-19',
    track: 'AI/ML',
    assignedJudges: ['Dhanooram Nagaraj', 'Natalie Neshama'],
    status: 'pending',
    description: 'We\'re redefining our relationship with AI, using it not to distract, but to focus and enhance productivity.',
    techStack: ['React', 'OpenAI', 'Gemini API', 'AI'],
    sponsors: ['MLH - Gemini API', 'MLH - Reach Capital'],
    team: 'FocalAi Team',
    devpostUrl: 'https://devpost.com/focalai',
  },
  {
    id: 15,
    name: 'Magnetic Board',
    table: 'N-11',
    track: 'Web Development',
    assignedJudges: ['Serhii Romanov'],
    status: 'judged',
    description: 'A digital version of those magnetic drawing boards we had as kids, built with modern web technologies.',
    techStack: ['React', 'Canvas API', 'WebGL', 'JavaScript'],
    sponsors: ['MLH - GoDaddy', 'VISA'],
    team: 'Magnetic Board Team',
    devpostUrl: 'https://devpost.com/magnetic-board',
  },
  {
    id: 16,
    name: 'ConQuest',
    table: 'O-16',
    track: 'Mobile Apps',
    assignedJudges: ['Fenil Gholani'],
    status: 'pending',
    description: 'Gamify your study sessions! Conquer campus spots by studying there, earn points and compete with friends.',
    techStack: ['Flutter', 'Firebase', 'GPS', 'Dart'],
    sponsors: ['DubHacks NEXT', 'Best Freshman'],
    team: 'ConQuest Team',
    devpostUrl: 'https://devpost.com/conquest',
  },
  {
    id: 17,
    name: 'Tower',
    table: 'P-09',
    track: 'Web Development',
    assignedJudges: ['Nolan', 'Syed Mustafa'],
    status: 'judged',
    description: 'Seamless file sync & discovery across your local network with privacy-first approach.',
    techStack: ['Next.js', 'Node.js', 'P2P', 'WebRTC'],
    sponsors: ['MLH - Cloudflare', 'Okanagan'],
    team: 'Tower Team',
    devpostUrl: 'https://devpost.com/tower',
  },
  {
    id: 18,
    name: 'Brain-Bloom',
    table: 'Q-13',
    track: 'Mobile Apps',
    assignedJudges: ['Dhanooram Nagaraj', 'Natalie Neshama'],
    status: 'pending',
    description: 'Subjects like mathematics for kids can be difficult to learn. Our mobile app makes it fun and engaging.',
    techStack: ['Flutter', 'AI', 'Gamification', 'Dart'],
    sponsors: ['Best Freshman', 'DubHacks NEXT'],
    team: 'Brain-Bloom Team',
    devpostUrl: 'https://devpost.com/brain-bloom',
  },
  {
    id: 19,
    name: 'Sparks',
    table: 'R-21',
    track: 'Web Development',
    assignedJudges: ['Serhii Romanov', 'Fenil Gholani'],
    status: 'judged',
    description: 'Sparks empowers shoppers to find businesses that reflect their values and support local communities.',
    techStack: ['React', 'Node.js', 'Maps API', 'PostgreSQL'],
    sponsors: ['Okanagan', 'Statsig'],
    team: 'Sparks Team',
    devpostUrl: 'https://devpost.com/sparks',
  },
  {
    id: 20,
    name: 'Verity',
    table: 'S-06',
    track: 'AI/ML',
    assignedJudges: ['Nolan'],
    status: 'pending',
    description: 'Everyone is building smarter agents. We\'re building the infrastructure so they can work together seamlessly.',
    techStack: ['React', 'OpenAI', 'Gemini API', 'AI'],
    sponsors: ['MLH - Gemini API', 'MLH - Reach Capital'],
    team: 'Verity Team',
    devpostUrl: 'https://devpost.com/verity',
  },
];

const tracks = ['All Tracks', 'AI/ML', 'Web Development', 'Mobile Apps', 'Hardware', 'Social Good'];
const sponsors = ['All Sponsors', 'VISA', 'Okanagan', 'Statsig', 'MLH - ElevenLabs', 'MLH - GoDaddy', 'MLH - Cloudflare', 'MLH - Gemini API', 'MLH - Reach Capital', 'Best Freshman', 'DubHacks NEXT'];

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