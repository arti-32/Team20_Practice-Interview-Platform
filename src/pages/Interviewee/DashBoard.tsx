import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Star, ArrowRight, Plus, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const IntervieweeDashboard = () => {
  const upcomingSessions = [
    {
      id: 1,
      interviewer: "Sarah Johnson",
      type: "System Design",
      date: "Dec 5, 2024",
      time: "2:00 PM",
      avatar: "SJ"
    },
    {
      id: 2,
      interviewer: "Mike Chen",
      type: "DSA",
      date: "Dec 7, 2024", 
      time: "10:00 AM",
      avatar: "MC"
    }
  ];

  const recentFeedback = [
    {
      interviewer: "Alex Rivera",
      type: "Behavioral",
      rating: 4.5,
      comment: "Great communication skills. Work on structuring your answers with STAR method.",
      date: "Dec 1, 2024"
    }
  ];

  const stats = [
    { label: "Total Sessions", value: "12", icon: Video, color: "text-accent" },
    { label: "Avg. Rating", value: "4.6", icon: Star, color: "text-warning" },
    { label: "This Month", value: "3", icon: Calendar, color: "text-primary" },
    { label: "Improvement", value: "+18%", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <DashboardLayout role="interviewee">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">Ready for your next practice session?</p>
          </div>
          <div className="flex gap-3">
            <Link to="/interviewee/availability">
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Set Availability
              </Button>
            </Link>
            <Link to="/interviewee/interviewers">
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Book Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Upcoming Sessions</h2>
              <Link to="/interviewee/sessions" className="text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {session.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{session.interviewer}</p>
                      <p className="text-sm text-muted-foreground">{session.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{session.date}</p>
                      <p className="text-xs text-muted-foreground">{session.time}</p>
                    </div>
                    <Link to={`/session/${session.id}`}>
                      <Button size="sm" variant="accent">
                        Join
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                  <Link to="/interviewee/interviewers">
                    <Button variant="outline" size="sm">
                      Book a Session
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Recent Feedback</h2>
              <Link to="/interviewee/feedback" className="text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {recentFeedback.length > 0 ? (
                recentFeedback.map((feedback, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-foreground">{feedback.interviewer}</p>
                        <p className="text-sm text-muted-foreground">{feedback.type} • {feedback.date}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 rounded-lg">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-semibold text-foreground">{feedback.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No feedback yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/interviewee/availability" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <Clock className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">Set Availability</p>
                <p className="text-sm text-muted-foreground">Update your available time slots</p>
              </div>
            </Link>
            <Link to="/interviewee/interviewers" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <Users className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">Find Interviewers</p>
                <p className="text-sm text-muted-foreground">Browse and book sessions</p>
              </div>
            </Link>
            <Link to="/interviewee/analytics" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <TrendingUp className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">View Progress</p>
                <p className="text-sm text-muted-foreground">Track your improvement</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntervieweeDashboard;
