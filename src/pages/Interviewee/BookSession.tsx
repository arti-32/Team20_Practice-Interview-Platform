import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock interviewer data
const mockInterviewer = {
  id: "1",
  name: "Sarah Johnson",
  avatar: "SJ",
  title: "Senior Software Engineer",
  company: "Google",
  expertise: ["System Design", "DSA", "Behavioral"],
  availability: {
    "2024-12-05": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "2024-12-07": ["10:00", "11:00", "13:00", "14:00"],
    "2024-12-10": ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
    "2024-12-12": ["11:00", "13:00", "14:00", "15:00"],
  } as Record<string, string[]>
};

const sessionTypes = [
  { id: "system-design", label: "System Design", duration: "60 min", icon: "🏗️" },
  { id: "dsa", label: "DSA / Coding", duration: "60 min", icon: "💻" },
  { id: "behavioral", label: "Behavioral", duration: "45 min", icon: "💬" },
];

const BookSession = () => {
  const { interviewerId } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<"video" | "audio">("video");

  const interviewer = mockInterviewer;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const hasAvailability = (date: Date) => {
    const dateStr = formatDate(date);
    return interviewer.availability[dateStr]?.length > 0;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedType) {
      toast.error("Please select all required options");
      return;
    }

    toast.success("Session booked successfully!");
    navigate("/interviewee/sessions");
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DashboardLayout role="interviewee">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/interviewee/interviewers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Book a Session</h1>
            <p className="text-muted-foreground">with {interviewer.name}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-soft">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-foreground">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-7 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, i) => {
                    if (!date) {
                      return <div key={i} className="aspect-square" />;
                    }
                    
                    const dateStr = formatDate(date);
                    const isSelected = selectedDate === dateStr;
                    const hasSlots = hasAvailability(date);
                    const isPast = date < today;
                    const isToday = date.toDateString() === today.toDateString();
                    
                    return (
                      <button
                        key={i}
                        onClick={() => hasSlots && !isPast && setSelectedDate(dateStr)}
                        disabled={isPast || !hasSlots}
                        className={`
                          aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors relative
                          ${isPast || !hasSlots ? 'text-muted-foreground/50 cursor-not-allowed' : 'hover:bg-muted cursor-pointer'}
                          ${isSelected ? 'bg-accent text-accent-foreground' : ''}
                          ${isToday && !isSelected ? 'ring-2 ring-accent ring-inset' : ''}
                        `}
                      >
                        <span className="font-medium">{date.getDate()}</span>
                        {hasSlots && (
                          <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-accent-foreground' : 'bg-success'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-card rounded-xl border border-border shadow-soft p-4 animate-fade-in">
                <h3 className="font-semibold text-foreground mb-4">
                  Available Times for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {interviewer.availability[selectedDate]?.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-3 rounded-lg border-2 text-sm font-medium transition-colors
                        ${selectedTime === time 
                          ? 'border-accent bg-accent/10 text-foreground' 
                          : 'border-border hover:border-accent/50 text-muted-foreground'}
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Session Type */}
            {selectedTime && (
              <div className="bg-card rounded-xl border border-border shadow-soft p-4 animate-fade-in">
                <h3 className="font-semibold text-foreground mb-4">Interview Type</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {sessionTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`
                        p-4 rounded-xl border-2 text-left transition-all
                        ${selectedType === type.id 
                          ? 'border-accent bg-accent/10' 
                          : 'border-border hover:border-accent/50'}
                      `}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="text-sm text-muted-foreground">{type.duration}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Session Mode */}
            {selectedType && (
              <div className="bg-card rounded-xl border border-border shadow-soft p-4 animate-fade-in">
                <h3 className="font-semibold text-foreground mb-4">Session Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSessionMode("video")}
                    className={`
                      p-4 rounded-xl border-2 flex items-center gap-3 transition-all
                      ${sessionMode === "video" 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'}
                    `}
                  >
                    <Video className={`w-6 h-6 ${sessionMode === "video" ? 'text-accent' : 'text-muted-foreground'}`} />
                    <div className="text-left">
                      <p className="font-medium text-foreground">Video Call</p>
                      <p className="text-sm text-muted-foreground">Face-to-face session</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSessionMode("audio")}
                    className={`
                      p-4 rounded-xl border-2 flex items-center gap-3 transition-all
                      ${sessionMode === "audio" 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'}
                    `}
                  >
                    <Phone className={`w-6 h-6 ${sessionMode === "audio" ? 'text-accent' : 'text-muted-foreground'}`} />
                    <div className="text-left">
                      <p className="font-medium text-foreground">Audio Only</p>
                      <p className="text-sm text-muted-foreground">Voice call session</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-card rounded-xl border border-border shadow-soft">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Booking Summary</h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Interviewer Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {interviewer.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{interviewer.name}</p>
                    <p className="text-sm text-muted-foreground">{interviewer.title}</p>
                  </div>
                </div>

                {/* Selected Options */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedDate 
                        ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric' 
                          })
                        : 'Select a date'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{selectedTime || 'Select a time'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {sessionMode === "video" ? (
                      <Video className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-sm capitalize">{sessionMode} Call</span>
                  </div>
                </div>

                {selectedType && (
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Session type</span>
                      <span className="font-medium text-foreground">
                        {sessionTypes.find(t => t.id === selectedType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">
                        {sessionTypes.find(t => t.id === selectedType)?.duration}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  variant="hero" 
                  className="w-full"
                  disabled={!selectedDate || !selectedTime || !selectedType}
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookSession;
