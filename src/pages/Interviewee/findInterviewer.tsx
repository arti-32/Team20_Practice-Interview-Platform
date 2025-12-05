import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, Calendar, Video, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Interviewer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  experience: string;
  location: string;
  availability: string[];
  hourlyRate: number;
}

const mockInterviewers: Interviewer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    title: "Senior Software Engineer",
    company: "Google",
    expertise: ["System Design", "DSA", "Behavioral"],
    rating: 4.9,
    sessions: 156,
    experience: "8 years",
    location: "San Francisco, CA",
    availability: ["Dec 5", "Dec 7", "Dec 10"],
    hourlyRate: 75
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    title: "Engineering Manager",
    company: "Meta",
    expertise: ["System Design", "Leadership", "Behavioral"],
    rating: 4.8,
    sessions: 203,
    experience: "12 years",
    location: "Seattle, WA",
    availability: ["Dec 6", "Dec 8", "Dec 12"],
    hourlyRate: 95
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "ER",
    title: "Staff Engineer",
    company: "Amazon",
    expertise: ["DSA", "System Design", "AWS"],
    rating: 4.7,
    sessions: 89,
    experience: "6 years",
    location: "Austin, TX",
    availability: ["Dec 5", "Dec 6", "Dec 9"],
    hourlyRate: 65
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "DK",
    title: "Principal Engineer",
    company: "Microsoft",
    expertise: ["System Design", "Cloud Architecture", "DSA"],
    rating: 4.9,
    sessions: 312,
    experience: "15 years",
    location: "New York, NY",
    availability: ["Dec 7", "Dec 11", "Dec 14"],
    hourlyRate: 120
  },
];

const expertiseOptions = ["All", "DSA", "System Design", "Behavioral", "Leadership", "Cloud Architecture"];

const FindInterviewers = () => {
  const [search, setSearch] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [interviewers] = useState<Interviewer[]>(mockInterviewers);

  const filteredInterviewers = interviewers.filter(interviewer => {
    const matchesSearch = interviewer.name.toLowerCase().includes(search.toLowerCase()) ||
      interviewer.company.toLowerCase().includes(search.toLowerCase());
    const matchesExpertise = selectedExpertise === "All" || 
      interviewer.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <DashboardLayout role="interviewee">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Interviewers</h1>
          <p className="text-muted-foreground">Browse and book sessions with experienced interviewers</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or company..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {expertiseOptions.map(option => (
              <Button
                key={option}
                variant={selectedExpertise === option ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExpertise(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Interviewers Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredInterviewers.map((interviewer) => (
            <div 
              key={interviewer.id}
              className="bg-card rounded-xl border border-border shadow-soft hover-lift overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {interviewer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{interviewer.name}</h3>
                        <p className="text-sm text-muted-foreground">{interviewer.title}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 rounded-lg shrink-0">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-semibold text-sm">{interviewer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {interviewer.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {interviewer.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {interviewer.expertise.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{interviewer.experience}</p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{interviewer.sessions}</p>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">${interviewer.hourlyRate}/hr</p>
                    <p className="text-xs text-muted-foreground">Rate</p>
                  </div>
                </div>

                {/* Available Dates */}
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Next Available:</p>
                  <div className="flex flex-wrap gap-2">
                    {interviewer.availability.slice(0, 3).map(date => (
                      <span 
                        key={date}
                        className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-md"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                <Link to={`/interviewee/interviewer/${interviewer.id}`}>
                  <Button variant="ghost" size="sm">View Profile</Button>
                </Link>
                <Link to={`/interviewee/book/${interviewer.id}`}>
                  <Button size="sm" variant="accent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredInterviewers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-1">No interviewers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FindInterviewers;
