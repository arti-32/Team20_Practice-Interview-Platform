import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Video, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  User,
  Menu,
  X,
  LogOut,
  Bell,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "interviewee" | "interviewer" | "admin";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const basePath = `/${role}`;

  const navItems = {
    interviewee: [
      { icon: LayoutDashboard, label: "Dashboard", href: `${basePath}/dashboard` },
      { icon: Clock, label: "My Availability", href: `${basePath}/availability` },
      { icon: Calendar, label: "Sessions", href: `${basePath}/sessions` },
      { icon: User, label: "Find Interviewers", href: `${basePath}/interviewers` },
      { icon: BarChart3, label: "Analytics", href: `${basePath}/analytics` },
      { icon: MessageSquare, label: "Feedback", href: `${basePath}/feedback` },
    ],
    interviewer: [
      { icon: LayoutDashboard, label: "Dashboard", href: `${basePath}/dashboard` },
      { icon: Clock, label: "My Availability", href: `${basePath}/availability` },
      { icon: Calendar, label: "Sessions", href: `${basePath}/sessions` },
      { icon: User, label: "Interviewees", href: `${basePath}/interviewees` },
      { icon: BarChart3, label: "Analytics", href: `${basePath}/analytics` },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Dashboard", href: `${basePath}/dashboard` },
      { icon: User, label: "Users", href: `${basePath}/users` },
      { icon: Calendar, label: "All Sessions", href: `${basePath}/sessions` },
      { icon: BarChart3, label: "Analytics", href: `${basePath}/analytics` },
    ],
  };

  const items = navItems[role];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Video className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">InterviewPro</span>
        </div>
        <button className="p-2 relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-foreground/20 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">InterviewPro</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <Link
              to={`${basePath}/settings`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mb-2"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-border bg-card">
          <h1 className="text-lg font-semibold text-foreground capitalize">
            {location.pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 relative hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
