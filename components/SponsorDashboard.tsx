'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  User,
  Calendar,
  ExternalLink,
  Building2,
  Trophy
} from 'lucide-react';

// Real sponsor data - this would come from auth/props
const sponsorInfo = {
  name: "Microsoft",
  track: "AI Innovation Track",
  logo: "🏢" // In real app, would be an image
};

// Available sponsor options (would be set based on authentication)
const availableSponsors = [
  { name: "Google Cloud", track: "Cloud Computing Track" },
  { name: "Microsoft", track: "AI Innovation Track" },
  { name: "NVIDIA", track: "AI/ML Excellence Track" },
  { name: "Netflix", track: "Content & Media Track" },
  { name: "Capital One", track: "FinTech Innovation Track" },
  { name: "State Farm", track: "InsurTech Track" },
  { name: "Waymo", track: "Autonomous Systems Track" },
  { name: "Assurant", track: "Digital Solutions Track" },
  { name: "Google", track: "Developer Tools Track" },
  { name: "Github", track: "Open Source Track" },
  { name: "Wix.com & Base44", track: "Web Innovation Track" },
  { name: "Wolfram", track: "Computational Track" }
];

// Mock projects for sponsor track
const sponsorProjects = [
  {
    id: 1,
    name: "MiamiTech Navigator",
    team: "Team Alpha",
    description: "A comprehensive platform connecting Miami's tech ecosystem through AI-powered networking, event discovery, and skill matching for professionals, students, and entrepreneurs.",
    track: "AI/ML",
    submittedAt: "Sept 27, 11:45 PM",
    devpostUrl: "https://devpost.com/software/miamitech-navigator",
    techStack: ["React", "Python", "TensorFlow", "FastAPI", "Azure AI"],
    members: ["Sarah Chen", "Mike Rodriguez", "Ana Silva"],
    relevantFeatures: ["Uses Azure AI Services", "Microsoft Cognitive Services", "AI-powered matching algorithm"]
  },
  {
    id: 2,
    name: "SmartStudy AI",
    team: "EduTech Pioneers",
    description: "Personalized learning assistant that adapts to individual learning styles using natural language processing and cognitive learning patterns.",
    track: "AI/ML",
    submittedAt: "Sept 28, 12:15 AM",
    devpostUrl: "https://devpost.com/software/smartstudy-ai",
    techStack: ["Python", "Azure OpenAI", "React", "Node.js", "Azure CosmosDB"],
    members: ["Alex Kim", "Jordan Smith", "Priya Patel"],
    relevantFeatures: ["Azure Cognitive Services", "Microsoft Bot Framework", "Real-time personalization"]
  },
  {
    id: 3,
    name: "CodeMentor AI",
    team: "DevBoost",
    description: "AI-powered code review and mentoring platform that provides real-time feedback and learning suggestions for developers.",
    track: "AI/ML",
    submittedAt: "Sept 28, 1:30 AM",
    devpostUrl: "https://devpost.com/software/codementor-ai",
    techStack: ["Python", "Azure ML", "React", "FastAPI", "Azure Container Instances"],
    members: ["Emma Wilson", "Ryan Chen", "Maya Rodriguez", "Jake Thompson"],
    relevantFeatures: ["Azure DevOps integration", "Microsoft Graph API", "Real-time mentoring"]
  }
];

export function SponsorDashboard() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [scores, setScores] = useState<Record<number, { rating: number; notes: string; completed: boolean }>>({});
  const [currentRating, setCurrentRating] = useState(0);
  const [currentNotes, setCurrentNotes] = useState('');

  const currentProject = sponsorProjects[currentProjectIndex];
  const totalProjects = sponsorProjects.length;
  const completedCount = Object.values(scores).filter(s => s.completed).length;
  const progressPercentage = (completedCount / totalProjects) * 100;

  const handleStarClick = (rating: number) => {
    setCurrentRating(rating);
  };

  const handleMarkComplete = () => {
    if (currentRating === 0) return;

    setScores(prev => ({
      ...prev,
      [currentProject.id]: {
        rating: currentRating,
        notes: currentNotes,
        completed: true
      }
    }));

    // Move to next project or show completion
    if (currentProjectIndex < sponsorProjects.length - 1) {
      setCurrentProjectIndex(prev => prev + 1);
      setCurrentRating(0);
      setCurrentNotes('');
    }
  };

  const isCompleted = completedCount === totalProjects;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Track Judging Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You've successfully judged all {totalProjects} projects in the {sponsorInfo.track}. 
              Thank you for sponsoring ShellHacks 2025!
            </p>
            <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700">
              <Trophy className="w-4 h-4 mr-2" />
              View Results & Winners
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Sponsor Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Judging: {sponsorInfo.track}</h1>
              <p className="text-sm text-muted-foreground">Sponsored by {sponsorInfo.name} • ShellHacks 2025</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="text-right">
            <p className="text-sm font-medium">{completedCount + 1}/{totalProjects} projects</p>
            <div className="w-32 mt-1">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{currentProject.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {currentProject.team}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {currentProject.submittedAt}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 dark:from-violet-900 dark:to-blue-900 dark:text-violet-300">
                    {currentProject.track}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Project Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Sponsor-relevant features */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {sponsorInfo.name} Technology Integration
                  </h3>
                  <div className="space-y-2">
                    {currentProject.relevantFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className={`text-xs ${
                          tech.toLowerCase().includes('azure') || 
                          tech.toLowerCase().includes('microsoft') ||
                          tech.toLowerCase().includes('openai')
                            ? 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300'
                            : ''
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Team Members</h3>
                  <div className="space-y-1">
                    {currentProject.members.map((member) => (
                      <p key={member} className="text-sm text-muted-foreground">
                        {member}
                      </p>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.open(currentProject.devpostUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Devpost
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Scoring Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Rate Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Star Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Overall Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className="focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            star <= currentRating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {currentRating > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {currentRating} out of 5 stars
                    </p>
                  )}
                </div>

                <Separator />

                {/* Sponsor-specific criteria */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Evaluation Criteria</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Innovation in AI/ML implementation</p>
                    <p>• Technical complexity and execution</p>
                    <p>• Potential for real-world impact</p>
                    <p>• Use of {sponsorInfo.name} technologies</p>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes & Feedback</label>
                  <Textarea
                    placeholder="Add feedback for the team and future consideration..."
                    value={currentNotes}
                    onChange={(e) => setCurrentNotes(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleMarkComplete}
                  disabled={currentRating === 0}
                  className="w-full bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Done
                  {currentProjectIndex < sponsorProjects.length - 1 && (
                    <>
                      <ArrowRight className="w-4 h-4 ml-2" />
                      Next Project
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="w-4 h-4" />
                  {sponsorInfo.track} Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Projects Judged</span>
                    <span className="font-medium">{completedCount}/{totalProjects}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {totalProjects - completedCount} projects remaining in your sponsored track
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sponsor Info Card */}
            <Card className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border-violet-200 dark:border-violet-800">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-white dark:bg-slate-800 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{sponsorInfo.name} Sponsor</p>
                    <p className="text-xs text-muted-foreground">Thank you for supporting ShellHacks!</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your evaluation helps identify the most innovative projects using AI/ML technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}