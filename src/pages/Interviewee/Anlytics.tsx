// import DashboardLayout from "@/components/layout/DashboardLayout";
// import { TrendingUp, TrendingDown, Star, Calendar, Clock, Target } from "lucide-react";

// const IntervieweeAnalytics = () => {
//   const overallStats = {
//     totalSessions: 12,
//     avgRating: 4.6,
//     improvement: 18,
//     hoursSpent: 15
//   };

  const skillProgress = [
    { skill: "Communication", current: 4.5, previous: 4.0, change: 12.5 },
    { skill: "Problem Solving", current: 4.2, previous: 3.8, change: 10.5 },
    { skill: "Technical Knowledge", current: 4.8, previous: 4.5, change: 6.7 },
    { skill: "Confidence", current: 4.0, previous: 3.5, change: 14.3 },
  ];

//   const sessionHistory = [
//     { month: "Aug", sessions: 2, avgRating: 4.0 },
//     { month: "Sep", sessions: 3, avgRating: 4.2 },
//     { month: "Oct", sessions: 4, avgRating: 4.4 },
//     { month: "Nov", sessions: 3, avgRating: 4.6 },
//   ];

//   return (
//     <DashboardLayout role="interviewee">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
//           <p className="text-muted-foreground">Track your interview practice progress</p>
//         </div>

//         {/* Overview Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
//             <div className="flex items-center justify-between mb-3">
//               <Calendar className="w-5 h-5 text-accent" />
//               <span className="text-xs text-success flex items-center gap-1">
//                 <TrendingUp className="w-3 h-3" />
//                 +25%
//               </span>
//             </div>
//             <p className="text-2xl font-bold text-foreground">{overallStats.totalSessions}</p>
//             <p className="text-sm text-muted-foreground">Total Sessions</p>
//           </div>

//           <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
//             <div className="flex items-center justify-between mb-3">
//               <Star className="w-5 h-5 text-warning" />
//               <span className="text-xs text-success flex items-center gap-1">
//                 <TrendingUp className="w-3 h-3" />
//                 +0.3
//               </span>
//             </div>
//             <p className="text-2xl font-bold text-foreground">{overallStats.avgRating}</p>
//             <p className="text-sm text-muted-foreground">Avg. Rating</p>
//           </div>

//           <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
//             <div className="flex items-center justify-between mb-3">
//               <Target className="w-5 h-5 text-success" />
//             </div>
//             <p className="text-2xl font-bold text-foreground">+{overallStats.improvement}%</p>
//             <p className="text-sm text-muted-foreground">Improvement</p>
//           </div>

//           <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
//             <div className="flex items-center justify-between mb-3">
//               <Clock className="w-5 h-5 text-primary" />
//             </div>
//             <p className="text-2xl font-bold text-foreground">{overallStats.hoursSpent}h</p>
//             <p className="text-sm text-muted-foreground">Practice Time</p>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Skill Progress */}
//           <div className="bg-card rounded-xl border border-border shadow-soft">
//             <div className="p-4 border-b border-border">
//               <h2 className="font-semibold text-foreground">Skill Progress</h2>
//             </div>
//             <div className="p-4 space-y-4">
//               {skillProgress.map((skill) => (
//                 <div key={skill.skill}>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-medium text-foreground">{skill.skill}</span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-muted-foreground">{skill.current}/5</span>
//                       <span className={`text-xs flex items-center gap-1 ${skill.change >= 0 ? 'text-success' : 'text-destructive'}`}>
//                         {skill.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
//                         {skill.change}%
//                       </span>
//                     </div>
//                   </div>
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-accent rounded-full transition-all duration-500"
//                       style={{ width: `${(skill.current / 5) * 100}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Session History */}
//           <div className="bg-card rounded-xl border border-border shadow-soft">
//             <div className="p-4 border-b border-border">
//               <h2 className="font-semibold text-foreground">Monthly Progress</h2>
//             </div>
//             <div className="p-4">
//               <div className="space-y-4">
//                 {sessionHistory.map((month) => (
//                   <div key={month.month} className="flex items-center gap-4">
//                     <span className="w-10 text-sm font-medium text-muted-foreground">{month.month}</span>
//                     <div className="flex-1">
//                       <div className="h-8 bg-muted rounded-lg overflow-hidden flex">
//                         <div 
//                           className="h-full bg-accent/80 rounded-lg flex items-center justify-end px-2"
//                           style={{ width: `${(month.sessions / 5) * 100}%` }}
//                         >
//                           <span className="text-xs text-accent-foreground font-medium">{month.sessions}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1 w-16 justify-end">
//                       <Star className="w-3 h-3 text-warning fill-warning" />
//                       <span className="text-sm font-medium">{month.avgRating}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Interview Type Breakdown */}
//         <div className="bg-card rounded-xl border border-border shadow-soft">
//           <div className="p-4 border-b border-border">
//             <h2 className="font-semibold text-foreground">Interview Type Breakdown</h2>
//           </div>
//           <div className="p-4 grid sm:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-muted/50 rounded-lg">
//               <div className="text-3xl mb-2">🏗️</div>
//               <p className="font-semibold text-foreground">5</p>
//               <p className="text-sm text-muted-foreground">System Design</p>
//               <p className="text-xs text-success mt-1">Avg: 4.7 ⭐</p>
//             </div>
//             <div className="text-center p-4 bg-muted/50 rounded-lg">
//               <div className="text-3xl mb-2">💻</div>
//               <p className="font-semibold text-foreground">4</p>
//               <p className="text-sm text-muted-foreground">DSA / Coding</p>
//               <p className="text-xs text-success mt-1">Avg: 4.5 ⭐</p>
//             </div>
//             <div className="text-center p-4 bg-muted/50 rounded-lg">
//               <div className="text-3xl mb-2">💬</div>
//               <p className="font-semibold text-foreground">3</p>
//               <p className="text-sm text-muted-foreground">Behavioral</p>
//               <p className="text-xs text-success mt-1">Avg: 4.6 ⭐</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default IntervieweeAnalytics;
