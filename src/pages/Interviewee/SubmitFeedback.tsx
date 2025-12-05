import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface RatingCategory {
  id: string;
  label: string;
  description: string;
  rating: number;
}

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const [overallRating, setOverallRating] = useState(0);
  const [categories, setCategories] = useState<RatingCategory[]>([
    { id: "communication", label: "Communication", description: "Clarity and articulation", rating: 0 },
    { id: "problem-solving", label: "Problem Solving", description: "Analytical approach", rating: 0 },
    { id: "technical", label: "Technical Knowledge", description: "Depth of understanding", rating: 0 },
    { id: "confidence", label: "Confidence", description: "Poise and composure", rating: 0 },
  ]);
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryRating = (categoryId: string, rating: number) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, rating } : cat
    ));
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      toast.error("Please provide an overall rating");
      return;
    }

    const unratedCategories = categories.filter(cat => cat.rating === 0);
    if (unratedCategories.length > 0) {
      toast.error("Please rate all categories");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Feedback submitted successfully!");
    navigate("/interviewee/dashboard");
  };

  const StarRating = ({ rating, onRate, size = "md" }: { rating: number; onRate: (r: number) => void; size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-8 h-8"
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="transition-transform hover:scale-110"
          >
            <Star 
              className={`${sizeClasses[size]} ${
                star <= rating 
                  ? "text-warning fill-warning" 
                  : "text-muted-foreground"
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout role="interviewee">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Session Feedback</h1>
            <p className="text-muted-foreground">Rate your interview session</p>
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            SJ
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">System Design Interview</p>
            <p className="text-sm text-muted-foreground">with Sarah Johnson • Dec 5, 2024</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-sm rounded-lg">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        </div>

        {/* Overall Rating */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Overall Experience</h2>
            <p className="text-muted-foreground text-sm">How would you rate this interview session?</p>
          </div>
          <div className="flex justify-center mb-4">
            <StarRating rating={overallRating} onRate={setOverallRating} size="lg" />
          </div>
          <p className="text-center text-muted-foreground">
            {overallRating === 0 && "Click to rate"}
            {overallRating === 1 && "Poor"}
            {overallRating === 2 && "Fair"}
            {overallRating === 3 && "Good"}
            {overallRating === 4 && "Very Good"}
            {overallRating === 5 && "Excellent"}
          </p>
        </div>

        {/* Category Ratings */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Detailed Ratings</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{category.label}</p>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <StarRating 
                  rating={category.rating} 
                  onRate={(r) => handleCategoryRating(category.id, r)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Written Feedback */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Written Feedback</h2>
          
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              What did the interviewer do well?
            </label>
            <Textarea
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="Share what you appreciated about this session..."
              className="min-h-24"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Areas for improvement
            </label>
            <Textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="Any suggestions for improvement..."
              className="min-h-24"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Skip for Now
          </Button>
          <Button 
            variant="hero" 
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmitFeedback;
