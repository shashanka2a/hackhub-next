'use client'
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Users, 
  Trophy, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Play,
  Target,
  BarChart3,
  Gift
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export function LandingPage({ onGetStarted, onExploreDemo }: LandingPageProps) {
  const features = [
    {
      icon: Users,
      title: 'Judging Management',
      description: 'Judge allocation, live scoring, conflict-free assignments.',
    },
    {
      icon: Building2,
      title: 'Sponsor Tracking',
      description: 'Engagement dashboards + prize attribution.',
    },
    {
      icon: Gift,
      title: 'Prize Distribution',
      description: 'Automated track winners and award management.',
    },
  ];

  const faqs = [
    {
      question: 'How do I import projects?',
      answer: 'Simply paste a Devpost/Devfolio link to auto-import details.'
    },
    {
      question: 'Can I use HackHub for offline judging?',
      answer: 'Yes, set demo and Q&A timers and assign judges to tables.'
    },
    {
      question: 'How does sponsor judging work?',
      answer: 'Sponsors see only their track projects for fairness.'
    },
    {
      question: 'Is HackHub free to try?',
      answer: 'Yes, the MVP is free for organizers.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>HackHub</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onExploreDemo}>
                <Play className="w-4 h-4 mr-2" />
                Explore Demo
              </Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>
                  Streamline Hackathon{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Judging
                  </span>{' '}
                  with Ease
                </h1>
                
                <p className="text-xl text-gray-600 max-w-2xl">
                  Simplify hackathon evaluation with judge management, real-time scoring, 
                  sponsor tracking, and automated fairness checks.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700 text-lg px-8 py-4 h-auto"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onExploreDemo}
                  className="text-lg px-8 py-4 h-auto hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 dark:hover:from-violet-950/20 dark:hover:to-blue-950/20"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Explore Demo
                </Button>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-2xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625335534303-a3c1a3744694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwanVkZ2VzJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc1OTIyNDMyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Hackathon team presenting innovative project to judges"
                  className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Enhanced Floating Cards with Animation */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float-in-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-medium text-gray-700">Judge Assignment</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float-in-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Live Scoring</span>
                  </div>
                </div>
                
                {/* New Floating Card */}
                <div className="absolute top-1/2 -left-6 bg-white rounded-lg p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float-in-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Prize Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>
              Everything you need to run{' '}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                seamless judging
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From setup to final results, HackHub covers every aspect of hackathon judging.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white dark:bg-slate-900 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground text-lg">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-xl text-gray-900" style={{ fontFamily: 'ClashDisplay, Plus Jakarta Sans, sans-serif' }}>HackHub</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Built for Organizers, Sponsors, and Judges.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">Features</button></li>
                <li><button className="hover:text-foreground transition-colors">Pricing</button></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">About</button></li>
                <li><button className="hover:text-foreground transition-colors">Contact</button></li>
                <li><button className="hover:text-foreground transition-colors">Blog</button></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">Documentation</button></li>
                <li><button className="hover:text-foreground transition-colors">Support</button></li>
                <li><button className="hover:text-foreground transition-colors">Community</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for the hackathon community
            </p>
          </div>
        </div>
      </footer>
      
      {/* Custom CSS for floating animations */}
      <style jsx>{`
        @keyframes float-in-1 {
          0% {
            opacity: 0;
            transform: translateY(-20px) translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes float-in-2 {
          0% {
            opacity: 0;
            transform: translateY(20px) translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes float-in-3 {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        .animate-float-in-1 {
          animation: float-in-1 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-float-in-2 {
          animation: float-in-2 0.8s ease-out 1s forwards;
          opacity: 0;
        }
        
        .animate-float-in-3 {
          animation: float-in-3 0.8s ease-out 1.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}