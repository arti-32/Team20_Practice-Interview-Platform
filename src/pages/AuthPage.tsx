import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Mail, Lock, User, Briefcase, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [role, setRole] = useState<"interviewee" | "interviewer">(
    searchParams.get("role") as "interviewee" | "interviewer" || "interviewee"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    
    // Navigate to appropriate dashboard
    if (role === "interviewer") {
      navigate("/interviewer/dashboard");
    } else {
      navigate("/interviewee/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">InterviewPro</span>
          </Link>

          <h1 className="text-4xl font-bold text-primary-foreground mb-6">
            {isLogin ? "Welcome Back" : "Start Your Journey"}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
            {isLogin
              ? "Sign in to continue practicing interviews and tracking your progress."
              : "Join thousands of professionals improving their interview skills."}
          </p>

          <div className="space-y-4">
            {[
              "Connect with experienced interviewers",
              "Practice live video sessions",
              "Get structured feedback & analytics",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 lg:hidden">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">InterviewPro</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>

          {/* Role Selection (only for signup) */}
          {!isLogin && (
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">I want to:</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("interviewee")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "interviewee"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <User className={`w-6 h-6 mx-auto mb-2 ${role === "interviewee" ? "text-accent" : "text-muted-foreground"}`} />
                  <p className={`font-medium text-sm ${role === "interviewee" ? "text-foreground" : "text-muted-foreground"}`}>
                    Practice Interviews
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("interviewer")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "interviewer"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <Briefcase className={`w-6 h-6 mx-auto mb-2 ${role === "interviewer" ? "text-accent" : "text-muted-foreground"}`} />
                  <p className={`font-medium text-sm ${role === "interviewer" ? "text-foreground" : "text-muted-foreground"}`}>
                    Conduct Interviews
                  </p>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-accent hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
