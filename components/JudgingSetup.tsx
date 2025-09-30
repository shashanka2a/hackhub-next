'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { 
  Monitor, 
  Users2, 
  Presentation, 
  MapPin, 
  Clock, 
  Calculator,
  Save,
  CheckCircle,
  AlertCircle,
  Timer
} from 'lucide-react';

export function JudgingSetup() {
  const [judgingType, setJudgingType] = useState<'online' | 'offline' | ''>('');
  const [offlineMode, setOfflineMode] = useState<'stage' | 'table' | ''>('');
  const [demoTime, setDemoTime] = useState(5);
  const [qaTime, setQaTime] = useState(3);
  const [saved, setSaved] = useState(false);

  const totalPerProject = demoTime + qaTime;
  const totalHours = Math.ceil((250 * totalPerProject) / 60);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Judging Setup</h1>
        <p className="text-muted-foreground">
          Configure how judges will evaluate projects during the hackathon.
        </p>
      </div>

      {/* Judging Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-blue-500" />
            Select Judging Type
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose whether judges will review projects online or offline
          </p>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={judgingType} 
            onValueChange={(value: 'online' | 'offline') => setJudgingType(value)}
            className="grid gap-4 lg:grid-cols-2"
          >
            {/* Online Judging Card */}
            <div className="relative">
              <RadioGroupItem value="online" id="online" className="sr-only" />
              <Label 
                htmlFor="online" 
                className={`block cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  judgingType === 'online' 
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Card className="border-0 shadow-none">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        <Monitor className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Completely Online</h3>
                        <p className="text-sm text-muted-foreground">Remote evaluation</p>
                      </div>
                      {judgingType === 'online' && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Review Devpost/Devfolio submissions</li>
                      <li>• Watch demo videos</li>
                      <li>• Score projects remotely</li>
                      <li>• Flexible timing for judges</li>
                    </ul>
                  </CardContent>
                </Card>
              </Label>
            </div>

            {/* Offline Judging Card */}
            <div className="relative">
              <RadioGroupItem value="offline" id="offline" className="sr-only" />
              <Label 
                htmlFor="offline" 
                className={`block cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  judgingType === 'offline' 
                    ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Card className="border-0 shadow-none">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <Users2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Completely Offline</h3>
                        <p className="text-sm text-muted-foreground">In-person evaluation</p>
                      </div>
                      {judgingType === 'offline' && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Live team presentations</li>
                      <li>• Direct judge interaction</li>
                      <li>• Real-time Q&A sessions</li>
                      <li>• Immediate feedback</li>
                    </ul>
                  </CardContent>
                </Card>
              </Label>
            </div>
          </RadioGroup>

          {/* Offline Sub-options */}
          {judgingType === 'offline' && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3">Offline Judging Format</h4>
              <RadioGroup 
                value={offlineMode} 
                onValueChange={(value: 'stage' | 'table') => setOfflineMode(value)}
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-background transition-colors">
                  <RadioGroupItem value="stage" id="stage" />
                  <div className="flex items-center gap-2 flex-1">
                    <Presentation className="w-4 h-4 text-orange-500" />
                    <Label htmlFor="stage" className="cursor-pointer">Stage Presentation</Label>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-background transition-colors">
                  <RadioGroupItem value="table" id="table" />
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <Label htmlFor="table" className="cursor-pointer">Table Judging</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-500" />
            Time Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure time allocation per project evaluation
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="demo-time">Demo Time (minutes)</Label>
              <Input
                id="demo-time"
                type="number"
                value={demoTime}
                onChange={(e) => setDemoTime(parseInt(e.target.value) || 0)}
                min="1"
                max="20"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Time for team presentation/demo</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qa-time">Q&A Time (minutes)</Label>
              <Input
                id="qa-time"
                type="number"
                value={qaTime}
                onChange={(e) => setQaTime(parseInt(e.target.value) || 0)}
                min="1"
                max="15"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Time for judge questions</p>
            </div>
          </div>

          {/* Auto-calculated totals */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-medium">Total per Project</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{totalPerProject} min</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="w-4 h-4 text-purple-500" />
                <p className="text-sm font-medium">Total Time Needed</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">~{totalHours}h</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users2 className="w-4 h-4 text-green-500" />
                <p className="text-sm font-medium">Projects to Judge</p>
              </div>
              <p className="text-2xl font-bold text-green-600">250</p>
            </div>
          </div>

          {/* Info preview */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Time Calculation Preview</p>
                <p className="text-amber-700 dark:text-amber-300">
                  <strong>250 projects</strong> × <strong>{totalPerProject} minutes</strong> = <strong>~{totalHours} hours total</strong>
                </p>
                <p className="text-amber-600 dark:text-amber-400 mt-1">
                  With multiple judges, actual time will be distributed across the judging team.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 px-8"
          disabled={!judgingType}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Judging Configuration
            </>
          )}
        </Button>
      </div>

      {judgingType && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-200">Configuration Summary</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {judgingType === 'online' ? 'Online judging' : `Offline judging with ${offlineMode} format`} • 
                  {demoTime + qaTime} minutes per project • 
                  Estimated {totalHours} hours total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}