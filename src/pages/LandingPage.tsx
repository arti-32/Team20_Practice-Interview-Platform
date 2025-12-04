import { User, Briefcase, Calendar, Video, Star, BarChart3, Shield, Clock, Users, CheckCircle, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">InterviewPro</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Trusted by 10,000+ professionals
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Ace Your Next Interview with{" "}
              <span className="gradient-text">Real Practice</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with experienced interviewers, practice live sessions, and receive structured feedback to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup&role=interviewee">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Practicing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup&role=interviewer">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Become an Interviewer
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-elevated">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Video Call Preview */}
                  <div className="bg-card rounded-xl p-4 shadow-soft">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10" />
                        <div>
                          <p className="font-medium text-sm">Mock Interview Session</p>
                          <p className="text-xs text-muted-foreground">System Design</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <Video className="w-4 h-4 text-destructive" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="space-y-4">
                    <div className="bg-card rounded-xl p-4 shadow-soft">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <span className="font-medium text-sm">Session Complete</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-2xl font-bold text-foreground">4.8</p>
                          <p className="text-xs text-muted-foreground">Overall Rating</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-2xl font-bold text-foreground">45m</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card rounded-xl p-4 shadow-soft">
                      <p className="text-sm font-medium mb-2">Feedback Received</p>
                      <p className="text-xs text-muted-foreground">"Great problem-solving approach. Consider explaining your thought process more clearly..."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Practice Sessions" },
              { value: "2,000+", label: "Expert Interviewers" },
              { value: "95%", label: "Success Rate" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and features to help you prepare for and ace your interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Smart Matching",
                description: "Get matched with interviewers based on your target role, skills, and experience level."
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Set your availability and book sessions that fit your schedule."
              },
              {
                icon: Video,
                title: "Live Video Sessions",
                description: "Practice with real-time video calls, screen sharing, and collaborative coding."
              },
              {
                icon: Star,
                title: "Structured Feedback",
                description: "Receive detailed feedback on communication, problem-solving, and technical skills."
              },
              {
                icon: BarChart3,
                title: "Progress Analytics",
                description: "Track your improvement over time with detailed performance insights."
              },
              {
                icon: Shield,
                title: "Verified Interviewers",
                description: "All interviewers are verified professionals from top companies."
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and begin your journey to interview success.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Create Profile", description: "Sign up and tell us about your skills and target roles." },
              { step: "02", title: "Set Availability", description: "Choose times that work for your practice sessions." },
              { step: "03", title: "Get Matched", description: "We'll connect you with the perfect interviewer." },
              { step: "04", title: "Practice & Improve", description: "Attend sessions, get feedback, and track progress." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Practicing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of professionals who have improved their interview skills with InterviewPro.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="xl">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Video className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">InterviewPro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 InterviewPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
