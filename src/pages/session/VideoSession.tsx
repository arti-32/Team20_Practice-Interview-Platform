import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Clock, 
  FileText,
  Maximize,
  Settings,
  Users,
  X
} from "lucide-react";
import { toast } from "sonner";

const VideoSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [notes, setNotes] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "System", message: "Session started. Good luck!" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Mock session data
  const session = {
    interviewee: "John Smith",
    interviewer: "Sarah Johnson",
    type: "System Design",
    duration: 60,
    startTime: new Date()
  };

  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect would go here in a real implementation
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    toast.success("Session ended");
    navigate("/interviewee/feedback/new");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: "You", message: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="h-screen bg-foreground flex flex-col">
      {/* Header */}
      <header className="h-14 bg-card/10 backdrop-blur border-b border-border/20 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Video className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-primary-foreground">InterviewPro</span>
          </div>
          <div className="h-6 w-px bg-border/30" />
          <div className="text-primary-foreground/90">
            <span className="font-medium">{session.type}</span>
            <span className="text-primary-foreground/60 ml-2">with {session.interviewer}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card/10 rounded-lg">
            <Clock className="w-4 h-4 text-accent" />
            <span className="font-mono text-primary-foreground">{formatTime(elapsedTime)}</span>
            <span className="text-primary-foreground/60">/ {session.duration}:00</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-success text-sm">Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Main video - Interviewer */}
            <div className="relative bg-card/5 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary-foreground">SJ</span>
                </div>
                <p className="text-primary-foreground font-medium">{session.interviewer}</p>
                <p className="text-primary-foreground/60 text-sm">Interviewer</p>
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-card/20 backdrop-blur rounded-lg">
                <span className="text-primary-foreground/80 text-sm">{session.interviewer}</span>
              </div>
            </div>

            {/* Self view - Interviewee */}
            <div className="relative bg-card/5 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20" />
              {isVideoOn ? (
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary-foreground">JS</span>
                  </div>
                  <p className="text-primary-foreground font-medium">{session.interviewee}</p>
                  <p className="text-primary-foreground/60 text-sm">You</p>
                </div>
              ) : (
                <div className="relative z-10 text-center">
                  <VideoOff className="w-16 h-16 text-primary-foreground/50 mx-auto mb-4" />
                  <p className="text-primary-foreground/60">Camera Off</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-card/20 backdrop-blur rounded-lg">
                <span className="text-primary-foreground/80 text-sm">You</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              variant={isMicOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={handleEndCall}
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </Button>
            <div className="w-px h-10 bg-border/30" />
            <Button
              variant={isChatOpen ? "accent" : "secondary"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
            <Button
              variant={isNotesOpen ? "accent" : "secondary"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsNotesOpen(!isNotesOpen)}
            >
              <FileText className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Side Panel - Chat or Notes */}
        {(isChatOpen || isNotesOpen) && (
          <div className="w-80 bg-card/10 backdrop-blur border-l border-border/20 flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-border/20">
              <button
                onClick={() => { setIsChatOpen(true); setIsNotesOpen(false); }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  isChatOpen 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-primary-foreground/60 hover:text-primary-foreground'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => { setIsNotesOpen(true); setIsChatOpen(false); }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  isNotesOpen 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-primary-foreground/60 hover:text-primary-foreground'
                }`}
              >
                Notes
              </button>
            </div>

            {/* Chat Panel */}
            {isChatOpen && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`${msg.sender === "You" ? "text-right" : ""}`}>
                      <p className="text-xs text-primary-foreground/50 mb-1">{msg.sender}</p>
                      <div className={`inline-block px-3 py-2 rounded-lg ${
                        msg.sender === "You" 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-card/20 text-primary-foreground"
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-card/20 border border-border/30 rounded-lg text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <Button size="sm" variant="accent" onClick={sendMessage}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Notes Panel */}
            {isNotesOpen && (
              <div className="flex-1 p-4 flex flex-col">
                <p className="text-xs text-primary-foreground/50 mb-2">Session notes (only visible to you)</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes during the interview..."
                  className="flex-1 p-3 bg-card/20 border border-border/30 rounded-lg text-primary-foreground text-sm placeholder:text-primary-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSession;
