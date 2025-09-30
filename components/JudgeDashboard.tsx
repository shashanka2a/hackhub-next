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
  ExternalLink
} from 'lucide-react';

// Mock project data
const projects = [
  {
    id: 1,
    name: "MiamiTech Navigator",
    team: "Team Alpha",
    description: "A comprehensive platform connecting Miami's tech ecosystem through AI-powered networking, event discovery, and skill matching for professionals, students, and entrepreneurs.",
    track: "AI/ML",
    submittedAt: "Sept 27, 11:45 PM",
    devpostUrl: "https://devpost.com/software/miamitech-navigator",
    techStack: ["React", "Python", "TensorFlow", "FastAPI"],
    members: ["Sarah Chen", "Mike Rodriguez", "Ana Silva"]
  },
  {
    id: 2,
    name: "EcoFlow",
    team: "Green Innovators",
    description: "Smart water management system using IoT sensors and machine learning to optimize water usage in urban environments while reducing waste by 40%.",
    track: "Social Impact",
    submittedAt: "Sept 27, 11:58 PM",
    devpostUrl: "https://devpost.com/software/ecoflow",
    techStack: ["Arduino", "Node.js", "MongoDB", "React"],
    members: ["David Park", "Lisa Wong", "Carlos Mendez", "Emma Johnson"]
  }
];

export function JudgeDashboard() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [scores, setScores] = useState<Record<number, { rating: number; notes: string; completed: boolean }>>({});
  const [currentRating, setCurrentRating] = useState(0);
  const [currentNotes, setCurrentNotes] = useState('');

  const currentProject = projects[currentProjectIndex];
  const totalProjects = projects.length;
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
    if (currentProjectIndex < projects.length - 1) {
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
            <h2 className="text-2xl font-bold mb-2">Judging Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You've successfully judged all {totalProjects} assigned projects. Thank you for your participation!
            </p>
            <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Minimal Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div>
            <h1 className="font-bold text-xl">Your Judging Session</h1>
            <p className="text-sm text-muted-foreground">ShellHacks 2025</p>
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

                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
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

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add your feedback or comments..."
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
                  {currentProjectIndex < projects.length - 1 && (
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
                  <Clock className="w-4 h-4" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">{completedCount}/{totalProjects}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {totalProjects - completedCount} projects remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}