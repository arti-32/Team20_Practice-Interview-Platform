import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, Clock, Video, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sessions = [
  {
    id: 1,
    interviewer: "Sarah Johnson",
    type: "System Design",
    date: "Dec 5, 2024",
    time: "2:00 PM",
    status: "upcoming",
    avatar: "SJ"
  },
  {
    id: 2,
    interviewer: "Mike Chen",
    type: "DSA",
    date: "Dec 7, 2024",
    time: "10:00 AM",
    status: "upcoming",
    avatar: "MC"
  },
  {
    id: 3,
    interviewer: "Alex Rivera",
    type: "Behavioral",
    date: "Dec 1, 2024",
    time: "3:00 PM",
    status: "completed",
    avatar: "AR"
  },
  {
    id: 4,
    interviewer: "Emily Rodriguez",
    type: "DSA",
    date: "Nov 28, 2024",
    time: "11:00 AM",
    status: "completed",
    avatar: "ER"
  },
  {
    id: 5,
    interviewer: "David Kim",
    type: "System Design",
    date: "Nov 25, 2024",
    time: "2:00 PM",
    status: "cancelled",
    avatar: "DK"
  }
];

const IntervieweeSessions = () => {
  const upcomingSessions = sessions.filter(s => s.status === "upcoming");
  const pastSessions = sessions.filter(s => s.status !== "upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" />
            Upcoming
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="interviewee">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Sessions</h1>
            <p className="text-muted-foreground">View and manage your interview sessions</p>
          </div>
          <Link to="/interviewee/interviewers">
            <Button variant="hero">
              Book New Session
            </Button>
          </Link>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-card rounded-xl border border-border shadow-soft">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-border">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                    {session.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{session.interviewer}</p>
                    <p className="text-sm text-muted-foreground">{session.type}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </span>
                  </div>
                  {getStatusBadge(session.status)}
                  <Link to={`/session/${session.id}`}>
                    <Button size="sm" variant="accent">
                      <Video className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No upcoming sessions</p>
                <Link to="/interviewee/interviewers">
                  <Button variant="outline" size="sm" className="mt-4">
                    Book a Session
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Past Sessions */}
        <div className="bg-card rounded-xl border border-border shadow-soft">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Past Sessions</h2>
          </div>
          <div className="divide-y divide-border">
            {pastSessions.map((session) => (
              <div key={session.id} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold shrink-0">
                  {session.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{session.interviewer}</p>
                  <p className="text-sm text-muted-foreground">{session.type}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </span>
                </div>
                {getStatusBadge(session.status)}
                {session.status === "completed" && (
                  <Link to={`/interviewee/feedback/${session.id}`}>
                    <Button size="sm" variant="outline">
                      View Feedback
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntervieweeSessions;
