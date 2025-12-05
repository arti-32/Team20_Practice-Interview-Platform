// import { useState } from "react";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Calendar, Clock, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
// import { toast } from "sonner";

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const timeSlots = [
//   "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
//   "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
// ];

// interface AvailabilitySlot {
//   id: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// }

// const IntervieweeAvailability = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [availability, setAvailability] = useState<AvailabilitySlot[]>([
//     { id: "1", date: "2024-12-05", startTime: "09:00", endTime: "12:00" },
//     { id: "2", date: "2024-12-05", startTime: "14:00", endTime: "17:00" },
//     { id: "3", date: "2024-12-07", startTime: "10:00", endTime: "15:00" },
//   ]);
//   const [addingSlot, setAddingSlot] = useState(false);
//   const [newSlot, setNewSlot] = useState({ startTime: "09:00", endTime: "10:00" });

//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];
    
//     // Add empty days for alignment
//     for (let i = 0; i < firstDay.getDay(); i++) {
//       days.push(null);
//     }
    
//     // Add actual days
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }
    
//     return days;
//   };

//   const formatDate = (date: Date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const hasAvailability = (date: Date) => {
//     const dateStr = formatDate(date);
//     return availability.some(slot => slot.date === dateStr);
//   };

//   const getAvailabilityForDate = (dateStr: string) => {
//     return availability.filter(slot => slot.date === dateStr);
//   };

//   const addSlot = () => {
//     if (!selectedDate) return;
    
//     const id = Date.now().toString();
//     setAvailability([...availability, { id, date: selectedDate, ...newSlot }]);
//     setAddingSlot(false);
//     setNewSlot({ startTime: "09:00", endTime: "10:00" });
//     toast.success("Availability slot added!");
//   };

//   const removeSlot = (id: string) => {
//     setAvailability(availability.filter(slot => slot.id !== id));
//     toast.success("Slot removed");
//   };

//   const navigateMonth = (direction: number) => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
//   };

//   const days = getDaysInMonth(currentDate);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   return (
//     <DashboardLayout role="interviewee">
//       <div className="space-y-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">My Availability</h1>
//             <p className="text-muted-foreground">Set your available time slots for interview sessions</p>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Calendar */}
//           <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-soft">
//             <div className="p-4 border-b border-border flex items-center justify-between">
//               <h2 className="font-semibold text-foreground">
//                 {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//               </h2>
//               <div className="flex gap-2">
//                 <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
//                   <ChevronLeft className="w-4 h-4" />
//                 </Button>
//                 <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
            
//             <div className="p-4">
//               {/* Day headers */}
//               <div className="grid grid-cols-7 mb-2">
//                 {daysOfWeek.map(day => (
//                   <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
//                     {day}
//                   </div>
//                 ))}
//               </div>
              
//               {/* Calendar grid */}
//               <div className="grid grid-cols-7 gap-1">
//                 {days.map((date, i) => {
//                   if (!date) {
//                     return <div key={i} className="aspect-square" />;
//                   }
                  
//                   const dateStr = formatDate(date);
//                   const isSelected = selectedDate === dateStr;
//                   const hasSlots = hasAvailability(date);
//                   const isPast = date < today;
//                   const isToday = date.toDateString() === today.toDateString();
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => !isPast && setSelectedDate(dateStr)}
//                       disabled={isPast}
//                       className={`
//                         aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors relative
//                         ${isPast ? 'text-muted-foreground/50 cursor-not-allowed' : 'hover:bg-muted cursor-pointer'}
//                         ${isSelected ? 'bg-accent text-accent-foreground' : ''}
//                         ${isToday && !isSelected ? 'ring-2 ring-accent ring-inset' : ''}
//                       `}
//                     >
//                       <span className="font-medium">{date.getDate()}</span>
//                       {hasSlots && (
//                         <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-accent-foreground' : 'bg-accent'}`} />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Selected Date Details */}
//           <div className="bg-card rounded-xl border border-border shadow-soft">
//             <div className="p-4 border-b border-border">
//               <h2 className="font-semibold text-foreground">
//                 {selectedDate 
//                   ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
//                       weekday: 'long',
//                       month: 'long', 
//                       day: 'numeric' 
//                     })
//                   : 'Select a Date'}
//               </h2>
//             </div>
            
//             <div className="p-4">
//               {selectedDate ? (
//                 <div className="space-y-4">
//                   {/* Existing slots */}
//                   {getAvailabilityForDate(selectedDate).map(slot => (
//                     <div 
//                       key={slot.id}
//                       className="flex items-center justify-between p-3 bg-accent/10 rounded-lg"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4 text-accent" />
//                         <span className="font-medium text-foreground">
//                           {slot.startTime} - {slot.endTime}
//                         </span>
//                       </div>
//                       <Button 
//                         variant="ghost" 
//                         size="icon"
//                         className="text-destructive hover:bg-destructive/10"
//                         onClick={() => removeSlot(slot.id)}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   ))}

//                   {/* Add new slot */}
//                   {addingSlot ? (
//                     <div className="p-4 bg-muted/50 rounded-lg space-y-3">
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="text-xs text-muted-foreground mb-1 block">Start</label>
//                           <select 
//                             value={newSlot.startTime}
//                             onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
//                             className="w-full p-2 bg-background border border-border rounded-lg text-sm"
//                           >
//                             {timeSlots.map(time => (
//                               <option key={time} value={time}>{time}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div>
//                           <label className="text-xs text-muted-foreground mb-1 block">End</label>
//                           <select 
//                             value={newSlot.endTime}
//                             onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
//                             className="w-full p-2 bg-background border border-border rounded-lg text-sm"
//                           >
//                             {timeSlots.map(time => (
//                               <option key={time} value={time}>{time}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button size="sm" onClick={addSlot} className="flex-1">
//                           Add Slot
//                         </Button>
//                         <Button size="sm" variant="ghost" onClick={() => setAddingSlot(false)}>
//                           Cancel
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <Button 
//                       variant="outline" 
//                       className="w-full"
//                       onClick={() => setAddingSlot(true)}
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Time Slot
//                     </Button>
//                   )}

//                   {getAvailabilityForDate(selectedDate).length === 0 && !addingSlot && (
//                     <p className="text-sm text-muted-foreground text-center py-4">
//                       No availability set for this date
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
//                   <p className="text-muted-foreground">
//                     Select a date to view or add availability
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Quick Tips */}
//         <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
//           <h3 className="font-medium text-foreground mb-2">Tips for Setting Availability</h3>
//           <ul className="text-sm text-muted-foreground space-y-1">
//             <li>• Set multiple time slots to increase your chances of getting matched</li>
//             <li>• Interviewers will see your available slots when booking sessions</li>
//             <li>• You'll receive notifications when someone books a session with you</li>
//           </ul>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default IntervieweeAvailability;
