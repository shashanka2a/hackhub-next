'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Trophy, 
  Plus, 
  Edit3, 
  GripVertical, 
  DollarSign,
  Award,
  Target
} from 'lucide-react';

const prizes = [
  {
    id: 1,
    title: 'Overall Winner',
    sponsor: 'DubHacks',
    track: 'Overall',
    value: '$8,000',
    criteria: 'Best overall hackathon project demonstrating innovation, technical excellence, and potential impact.',
    position: 1,
    type: 'Cash',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 2,
    title: 'Google Cloud Prize',
    sponsor: 'Google Cloud',
    track: 'Cloud Computing',
    value: '$5,000',
    criteria: 'Best use of Google Cloud Platform services and technologies.',
    position: 2,
    type: 'Cash',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Microsoft Innovation Prize',
    sponsor: 'Microsoft',
    track: 'AI Innovation',
    value: '$4,000',
    criteria: 'Most innovative use of Microsoft technologies and Azure services.',
    position: 3,
    type: 'Cash',
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 4,
    title: 'NVIDIA AI Excellence',
    sponsor: 'NVIDIA',
    track: 'AI/ML Excellence',
    value: '$3,500',
    criteria: 'Outstanding AI/ML project leveraging GPU computing and NVIDIA technologies.',
    position: 4,
    type: 'Cash',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Netflix Content Innovation',
    sponsor: 'Netflix',
    track: 'Content & Media',
    value: '$3,000',
    criteria: 'Most innovative content creation or media streaming solution.',
    position: 5,
    type: 'Cash',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 6,
    title: 'Capital One FinTech',
    sponsor: 'Capital One',
    track: 'FinTech Innovation',
    value: '$2,500',
    criteria: 'Best financial technology solution with real-world applicability.',
    position: 6,
    type: 'Cash',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 7,
    title: 'State Farm InsurTech',
    sponsor: 'State Farm',
    track: 'InsurTech',
    value: '$2,000',
    criteria: 'Most innovative insurance technology or risk management solution.',
    position: 7,
    type: 'Cash',
    color: 'from-red-600 to-red-700',
  },
  {
    id: 8,
    title: 'Waymo Autonomous Systems',
    sponsor: 'Waymo',
    track: 'Autonomous Systems',
    value: '$2,000',
    criteria: 'Best autonomous system or self-driving technology implementation.',
    position: 8,
    type: 'Cash',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 9,
    title: 'Assurant Digital Solutions',
    sponsor: 'Assurant',
    track: 'Digital Solutions',
    value: '$1,500',
    criteria: 'Most innovative digital solution for risk management or consumer protection.',
    position: 9,
    type: 'Cash',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 10,
    title: 'Google Developer Tools',
    sponsor: 'Google',
    track: 'Developer Tools',
    value: '$1,500',
    criteria: 'Best developer tool or productivity enhancement solution.',
    position: 10,
    type: 'Cash',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 11,
    title: 'Github Open Source',
    sponsor: 'Github',
    track: 'Open Source',
    value: '$1,000',
    criteria: 'Outstanding open source project with community impact.',
    position: 11,
    type: 'Cash',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 12,
    title: 'Wix.com & Base44 Web Innovation',
    sponsor: 'Wix.com & Base44',
    track: 'Web Innovation',
    value: '$1,000',
    criteria: 'Most innovative web application or website solution.',
    position: 12,
    type: 'Cash',
    color: 'from-blue-400 to-purple-500',
  },
  {
    id: 13,
    title: 'Wolfram Computational Prize',
    sponsor: 'Wolfram',
    track: 'Computational',
    value: '$500',
    criteria: 'Best use of computational thinking and mathematical modeling.',
    position: 13,
    type: 'Cash',
    color: 'from-orange-600 to-red-600',
  },
  {
    id: 14,
    title: 'Best First-Time Hacker',
    sponsor: 'DubHacks',
    track: 'Beginner',
    value: '$1,000',
    criteria: 'Outstanding project by first-time hackathon participants.',
    position: 14,
    type: 'Cash',
    color: 'from-green-400 to-blue-500',
  },
];

const sponsors = ['DubHacks', 'VISA', 'Okanagan', 'Statsig', 'MLH - ElevenLabs', 'MLH - GoDaddy', 'MLH - Cloudflare', 'MLH - Gemini', 'MLH - Reach Capital', 'Best Freshman', 'DubHacks NEXT'];
const tracks = ['Overall', 'Cloud Computing', 'AI Innovation', 'AI/ML Excellence', 'Content & Media', 'FinTech Innovation', 'InsurTech', 'Autonomous Systems', 'Digital Solutions', 'Developer Tools', 'Open Source', 'Web Innovation', 'Computational', 'Beginner'];

export function Prizes() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPrize, setEditingPrize] = useState<typeof prizes[0] | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    sponsor: '',
    track: '',
    value: '',
    criteria: '',
    type: 'Cash',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      sponsor: '',
      track: '',
      value: '',
      criteria: '',
      type: 'Cash',
    });
    setEditingPrize(null);
  };

  const handleSubmit = () => {
    // Handle form submission
    setIsAddModalOpen(false);
    resetForm();
  };

  const totalPrizeValue = prizes.reduce((sum, prize) => 
    sum + parseInt(prize.value.replace(/[$,]/g, '')), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Prizes</h1>
        <p className="text-muted-foreground">
          Manage prize categories, criteria, and distribution across all tracks.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prizes</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prizes.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all tracks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPrizeValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(prizes.map(p => p.track)).size}</div>
            <p className="text-xs text-muted-foreground">
              Prize categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prize Management</CardTitle>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prize
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingPrize ? 'Edit Prize' : 'Add New Prize'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingPrize ? 'Update the prize details below.' : 'Create a new prize category for the hackathon.'}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prize Title</label>
                      <Input
                        placeholder="e.g., Best AI Innovation"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prize Value</label>
                      <Input
                        placeholder="e.g., $5,000"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sponsor</label>
                      <Select value={formData.sponsor} onValueChange={(value) => setFormData({ ...formData, sponsor: value })}>
                        <SelectTrigger>
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
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Track</label>
                      <Select value={formData.track} onValueChange={(value) => setFormData({ ...formData, track: value })}>
                        <SelectTrigger>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Judging Criteria</label>
                    <Textarea
                      placeholder="Describe what judges should look for when evaluating projects for this prize..."
                      value={formData.criteria}
                      onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => { setIsAddModalOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    {editingPrize ? 'Update Prize' : 'Add Prize'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder prize priority. Higher priority prizes appear first in the results.
          </p>
        </CardContent>
      </Card>

      {/* Prizes List */}
      <div className="space-y-4">
        {prizes.map((prize, index) => (
          <Card key={prize.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="cursor-grab hover:cursor-grabbing">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-muted-foreground">
                    #{prize.position}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prize.color} flex items-center justify-center shadow-lg`}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{prize.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{prize.sponsor}</Badge>
                        <Badge variant="secondary">{prize.track}</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {prize.value}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingPrize(prize);
                        setFormData({
                          title: prize.title,
                          sponsor: prize.sponsor,
                          track: prize.track,
                          value: prize.value,
                          criteria: prize.criteria,
                          type: prize.type,
                        });
                        setIsAddModalOpen(true);
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">
                    {prize.criteria}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prize Distribution by Track */}
      <Card>
        <CardHeader>
          <CardTitle>Prize Distribution by Track</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of how prizes are distributed across different tracks
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tracks.filter(track => track !== 'Overall').map((track) => {
              const trackPrizes = prizes.filter(p => p.track === track);
              const trackValue = trackPrizes.reduce((sum, p) => sum + parseInt(p.value.replace(/[$,]/g, '')), 0);
              
              return (
                <div key={track} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{track}</h4>
                    <Award className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{trackPrizes.length}</div>
                    <div className="text-sm text-muted-foreground">prizes</div>
                    <div className="text-lg font-semibold text-green-600">
                      ${trackValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}