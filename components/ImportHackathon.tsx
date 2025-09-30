'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Link2, 
  Download, 
  CheckCircle, 
  Calendar,
  FolderOpen,
  Target,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface ImportHackathonProps {
  onComplete: () => void;
  userType: 'organizer' | 'judge' | 'sponsor';
}

const mockHackathonData = {
  name: 'ShellHacks 2025',
  dates: {
    start: '2025-09-26',
    end: '2025-09-28',
  },
  projectCount: 247,
  tracks: ['AI/ML', 'Web Development', 'Mobile Apps', 'Blockchain', 'Hardware', 'Social Impact'],
  description: 'The premier hackathon in South Florida bringing together 839 developers to build innovative solutions and compete for amazing prizes.',
  organizer: 'Emely Barcenas',
  location: 'Miami, FL',
  prizes: '$45,650 in prizes',
  participants: 839,
};

export function ImportHackathon({ onComplete, userType }: ImportHackathonProps) {
  const [hackathonUrl, setHackathonUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importComplete, setImportComplete] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [hackathonData, setHackathonData] = useState<typeof mockHackathonData | null>(null);

  const handleImport = async () => {
    if (!hackathonUrl.trim()) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import process
    const progressSteps = [
      { step: 20, message: 'Connecting to platform...' },
      { step: 40, message: 'Fetching hackathon details...' },
      { step: 60, message: 'Loading project submissions...' },
      { step: 80, message: 'Processing tracks and prizes...' },
      { step: 100, message: 'Import complete!' },
    ];
    
    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setImportProgress(step);
    }
    
    setHackathonData(mockHackathonData);
    setImportComplete(true);
    setIsImporting(false);
  };

  const handleConfirm = () => {
    // Simulate final setup
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Import Hackathon</h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your Devpost or Devfolio hackathon to get started with automated project import and judging setup.
          </p>
        </div>

        {!importComplete ? (
          /* Import Form */
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-6 h-6 text-blue-500" />
                Hackathon Platform Link
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your hackathon URL from Devpost, Devfolio, or similar platforms
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hackathon-url">Hackathon URL</Label>
                <div className="relative">
                  <Input
                    id="hackathon-url"
                    type="url"
                    placeholder="https://springhack2024.devpost.com"
                    value={hackathonUrl}
                    onChange={(e) => setHackathonUrl(e.target.value)}
                    className="pl-4 pr-12"
                    disabled={isImporting}
                  />
                  <ExternalLink className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported platforms: Devpost, Devfolio, HackerEarth, MLH
                </p>
              </div>

              {isImporting && (
                <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <span className="font-medium">Importing hackathon data...</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    This may take a few moments while we fetch all project submissions and details.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-sync"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                    disabled={isImporting}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-sync" className="text-sm font-medium">
                      Auto-sync submissions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically update when new projects are submitted
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={handleImport}
                  disabled={!hackathonUrl.trim() || isImporting}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Import Hackathon
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Import Results */
          <div className="space-y-6">
            {/* Success Message */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">Import Successful!</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your hackathon data has been imported and is ready for judging setup.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                  Hackathon Preview
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review the imported hackathon details before proceeding
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Event Name</h4>
                      <p className="text-lg font-semibold">{hackathonData?.name}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Dates</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(hackathonData?.dates.start || '').toLocaleDateString()} - {' '}
                          {new Date(hackathonData?.dates.end || '').toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Location</h4>
                      <p>{hackathonData?.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Organizer</h4>
                      <p>{hackathonData?.organizer}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Prize Pool</h4>
                      <p className="text-green-600 font-medium">{hackathonData?.prizes}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Participants</h4>
                      <p>{hackathonData?.participants} registered</p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderOpen className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-sm">Total Projects</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{hackathonData?.projectCount}</p>
                    <p className="text-xs text-blue-600">Ready for judging</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-sm">Tracks</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{hackathonData?.tracks.length}</p>
                    <p className="text-xs text-purple-600">Competition categories</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {autoSync ? <RefreshCw className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
                      <span className="font-medium text-sm">Auto-sync</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{autoSync ? 'Enabled' : 'Disabled'}</p>
                    <p className="text-xs text-green-600">{autoSync ? 'Live updates' : 'Manual sync'}</p>
                  </div>
                </div>

                {/* Tracks */}
                <div>
                  <h4 className="font-medium mb-3">Competition Tracks</h4>
                  <div className="flex flex-wrap gap-2">
                    {hackathonData?.tracks.map((track, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {track}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{hackathonData?.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Role-specific messaging */}
            {userType === 'organizer' && (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Next Steps for Organizers</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Configure judging type and timing</li>
                    <li>• Assign judges to projects and tracks</li>
                    <li>• Set up prize distribution rules</li>
                    <li>• Monitor live judging progress</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {userType === 'judge' && (
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Welcome, Judge!</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll be able to review project assignments, access scoring criteria, and begin evaluating submissions once the organizer completes the judging setup.
                  </p>
                </CardContent>
              </Card>
            )}

            {userType === 'sponsor' && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Sponsor Dashboard Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Track engagement with your sponsored tracks, monitor project submissions, and access detailed analytics about participant interaction with your challenges.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Confirm Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleConfirm}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
              >
                Confirm & Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Need help?</p>
                <p>
                  If you're having trouble importing your hackathon, make sure the URL is public and accessible. 
                  You can also manually set up your event if automatic import isn't working.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}