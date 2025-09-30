'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Star, 
  Clock, 
  User, 
  MapPin,
  ExternalLink,
  CheckCircle,
  Timer,
  Monitor,
  AlertCircle,
  Save,
  Send
} from 'lucide-react';

const currentProject = {
  id: 1,
  name: 'EcoTracker',
  team: 'Green Innovators',
  table: 'A-12',
  track: 'AI/ML',
  description: 'An AI-powered app that helps users track their carbon footprint and suggests eco-friendly alternatives based on their daily activities.',
  techStack: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
  devpostUrl: 'https://devpost.com/ecotracker',
  demoVideoUrl: 'https://example.com/demo-video',
  members: ['Alice Johnson', 'Bob Chen', 'Carol Davis'],
};

const scoringCriteria = [
  { id: 'innovation', label: 'Innovation', description: 'Originality and creativity', max: 25 },
  { id: 'technical', label: 'Technical Difficulty', description: 'Complexity and implementation', max: 25 },
  { id: 'design', label: 'UI/UX Design', description: 'User interface and experience', max: 25 },
  { id: 'impact', label: 'Potential Impact', description: 'Real-world applicability', max: 25 },
];

export function JudgingSession() {
  const [mode, setMode] = useState<'online' | 'offline'>('offline');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes = 480 seconds
  const [phase, setPhase] = useState<'demo' | 'qa'>('demo');
  const [demoTime] = useState(300); // 5 minutes
  const [qaTime] = useState(180); // 3 minutes
  
  const [scores, setScores] = useState<Record<string, number>>({
    innovation: 20,
    technical: 18,
    design: 22,
    impact: 19,
  });
  const [isStarred, setIsStarred] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1;
          
          // Switch from demo to Q&A
          if (newTime === qaTime && phase === 'demo') {
            setPhase('qa');
          }
          
          // Auto-submit when time expires
          if (newTime === 0) {
            setSubmitted(true);
            setIsActive(false);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, qaTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentPhaseTime = () => {
    if (phase === 'demo') {
      return demoTime - (demoTime + qaTime - timeLeft);
    } else {
      return qaTime - (qaTime - timeLeft);
    }
  };

  const getPhaseProgress = () => {
    const currentPhaseTime = getCurrentPhaseTime();
    const maxTime = phase === 'demo' ? demoTime : qaTime;
    return ((maxTime - currentPhaseTime) / maxTime) * 100;
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  const handleSubmit = () => {
    setSubmitted(true);
    setIsActive(false);
  };

  const handleNext = () => {
    // Reset for next project
    setTimeLeft(480);
    setPhase('demo');
    setIsActive(false);
    setSubmitted(false);
    setScores({ innovation: 15, technical: 15, design: 15, impact: 15 });
    setIsStarred(false);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Judging Session</h1>
        <p className="text-muted-foreground">
          Evaluate hackathon projects and provide scores and feedback.
        </p>
      </div>

      {/* Mode Toggle */}
      <Tabs value={mode} onValueChange={(value) => setMode(value as 'online' | 'offline')}>
        <TabsList>
          <TabsTrigger value="offline">Offline Mode</TabsTrigger>
          <TabsTrigger value="online">Online Mode</TabsTrigger>
        </TabsList>

        {/* Timer and Progress */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Timer className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}`} />
                  <span className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-foreground'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Badge variant={phase === 'demo' ? 'default' : 'secondary'}>
                  {phase === 'demo' ? 'Demo Phase' : 'Q&A Phase'}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsActive(!isActive)}
                  disabled={submitted}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                
                {!submitted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSubmit}
                  >
                    Submit Early
                  </Button>
                )}
              </div>
            </div>
            
            <Progress value={getPhaseProgress()} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{phase === 'demo' ? 'Demo' : 'Q&A'} Progress</span>
              <span>{formatTime(getCurrentPhaseTime())} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Offline Mode Content */}
        <TabsContent value="offline" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Project Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {currentProject.name}
                  </CardTitle>
                  <button
                    onClick={() => setIsStarred(!isStarred)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-6 h-6 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Table {currentProject.table}</span>
                  <Badge variant="outline">{currentProject.track}</Badge>
                  <span>Team: {currentProject.team}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{currentProject.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.members.map((member) => (
                      <div key={member} className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Scoring</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total: {totalScore}/100
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {scoringCriteria.map((criteria) => (
                  <div key={criteria.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{criteria.label}</Label>
                      <span className="text-sm font-medium">{scores[criteria.id]}/{criteria.max}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{criteria.description}</p>
                    <Slider
                      value={[scores[criteria.id]]}
                      onValueChange={([value]) => setScores(prev => ({ ...prev, [criteria.id]: value }))}
                      max={criteria.max}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes</Label>
                  <Textarea
                    placeholder="Add your notes and feedback..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Online Mode Content */}
        <TabsContent value="online" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Project Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  Project Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Demo Video</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Play Demo
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={currentProject.devpostUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Devpost
                    </a>
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {currentProject.name}</p>
                    <p><strong>Team:</strong> {currentProject.team}</p>
                    <p><strong>Track:</strong> {currentProject.track}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{currentProject.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Scoring Panel - Same as offline */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scoring</CardTitle>
                  <button
                    onClick={() => setIsStarred(!isStarred)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-5 h-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total: {totalScore}/100
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {scoringCriteria.map((criteria) => (
                  <div key={criteria.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{criteria.label}</Label>
                      <span className="text-sm font-medium">{scores[criteria.id]}/{criteria.max}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{criteria.description}</p>
                    <Slider
                      value={[scores[criteria.id]]}
                      onValueChange={([value]) => setScores(prev => ({ ...prev, [criteria.id]: value }))}
                      max={criteria.max}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes</Label>
                  <Textarea
                    placeholder="Add your notes and feedback..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Submit Actions */}
      <Card className={submitted ? 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20' : ''}>
        <CardContent className="pt-6">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Evaluation Submitted Successfully!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total Score: {totalScore}/100 • {isStarred ? 'Starred for special recognition' : 'Not starred'}
              </p>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Next Project
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {timeLeft < 60 && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Time running out!</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit & Next Project
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}