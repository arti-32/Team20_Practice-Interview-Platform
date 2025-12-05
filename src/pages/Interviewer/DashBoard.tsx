import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Star, ArrowRight, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const InterviewerDashboard = () => {
  const upcomingSessions = [
    {
      id: 1,
      interviewee: "John Smith",
      type: "System Design",
      date: "Dec 5, 2024",
      time: "2:00 PM",
      avatar: "JS"
    },
    {
      id: 2,
      interviewee: "Anna Lee",
      type: "DSA",
      date: "Dec 7, 2024", 
      time: "10:00 AM",
      avatar: "AL"
    },
    {
      id: 3,
      interviewee: "Mark Wilson",
      type: "Behavioral",
      date: "Dec 8, 2024", 
      time: "3:00 PM",
      avatar: "MW"
    }
  ];

  const pendingBookings = [
    {
      id: 1,
      interviewee: "Lisa Brown",
      type: "System Design",
      proposedDate: "Dec 10, 2024",
      proposedTime: "11:00 AM",
      avatar: "LB"
    }
  ];

  const stats = [
    { label: "Total Sessions", value: "156", icon: Video, color: "text-accent" },
    { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-warning" },
    { label: "This Month", value: "12", icon: Calendar, color: "text-primary" },
    { label: "Completion Rate", value: "98%", icon: CheckCircle, color: "text-success" },
  ];

  return (
    <DashboardLayout role="interviewer">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">You have {upcomingSessions.length} upcoming sessions</p>
          </div>
          <div className="flex gap-3">
            <Link to="/interviewer/availability">
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Manage Availability
              </Button>
            </Link>
            <Link to="/interviewer/interviewees">
              <Button variant="hero">
                <Users className="w-4 h-4 mr-2" />
                View Interviewees
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
              <Link to="/interviewer/sessions" className="text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                    {session.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{session.interviewee}</p>
                    <p className="text-sm text-muted-foreground">{session.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{session.date}</p>
                    <p className="text-xs text-muted-foreground">{session.time}</p>
                  </div>
                  <Link to={`/session/${session.id}`}>
                    <Button size="sm" variant="accent">
                      Start
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Bookings */}
          <div className="bg-card rounded-xl border border-border shadow-soft">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Pending Bookings</h2>
              <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                {pendingBookings.length} new
              </span>
            </div>
            <div className="p-4 space-y-4">
              {pendingBookings.length > 0 ? (
                pendingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning font-semibold">
                        {booking.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{booking.interviewee}</p>
                        <p className="text-sm text-muted-foreground">{booking.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.proposedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.proposedTime}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="success" className="flex-1">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="text-muted-foreground">All caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/interviewer/availability" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <Clock className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">Set Availability</p>
                <p className="text-sm text-muted-foreground">Update your schedule</p>
              </div>
            </Link>
            <Link to="/interviewer/interviewees" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <Users className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">Interviewees</p>
                <p className="text-sm text-muted-foreground">View your students</p>
              </div>
            </Link>
            <Link to="/interviewer/analytics" className="group">
              <div className="bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors">
                <TrendingUp className="w-8 h-8 text-accent mb-3" />
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">Analytics</p>
                <p className="text-sm text-muted-foreground">View your performance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewerDashboard;
