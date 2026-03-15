import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Calendar, Clock, Users, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CLUSTER_FEE = 600; 

// Helper to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) { // 9 AM to 5 PM
    slots.push(`${i}:00`);
    slots.push(`${i}:30`);
  }
  return slots;
};

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const preselectedMentor = id ? mentors.find(m => String(m.id) === id) : null;
  
  const [isClusterMode, setIsClusterMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // State for Mentor Selection
  const [selectedSoloMentor, setSelectedSoloMentor] = useState<typeof mentors[0] | null>(preselectedMentor || null);
  const [selectedClusterMentors, setSelectedClusterMentors] = useState<typeof mentors>([]);
  
  // --- NEW: State for Date & Time ---
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const categories = ['CEO', 'CTO', 'CMO', 'Operations', 'Creative'];
  const timeSlots = generateTimeSlots();
  
  const filteredMentors = selectedCategory 
    ? mentors.filter(m => m.category === selectedCategory) 
    : [];

  // --- Calendar Logic ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today; // Disable past dates
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return;
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setSelectedTime(null); // Reset time when date changes
  };

  // --- Cluster Logic ---
  const handleSelectClusterMentor = (mentorToAdd: typeof mentors[0]) => {
    if (selectedClusterMentors.find(m => m.id === mentorToAdd.id)) return;
    if (selectedClusterMentors.length >= 4) {
      alert('Maximum 4 mentors per cluster.');
      return;
    }
    setSelectedClusterMentors([...selectedClusterMentors, mentorToAdd]);
    setSelectedCategory(null); 
  };

  const handleRemoveClusterMentor = (mentorId: number) => {
    setSelectedClusterMentors(selectedClusterMentors.filter(m => m.id !== mentorId));
  };

  // --- Payment Navigation ---
  const handleProceedToPayment = () => {
    if (!selectedSoloMentor || !selectedDate || !selectedTime) {
      alert('Please select a mentor, date, and time.');
      return;
    }
    navigate(`/payment/${selectedSoloMentor.id}`, {
      state: {
        date: selectedDate.toISOString(),
        time: selectedTime
      }
    });
  };

  const handleClusterPayment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time for the session.');
      return;
    }
    if (selectedClusterMentors.length < 2) {
      alert('Please select at least 2 mentors for a cluster session.');
      return;
    }
    
    navigate(`/payment/cluster`, {
      state: {
        isCluster: true,
        mentorIds: selectedClusterMentors.map(m => m.id),
        totalAmount: CLUSTER_FEE,
        date: selectedDate.toISOString(),
        time: selectedTime
      }
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {isClusterMode ? "Book a Cluster Session" : "Book a Session"}
          </h1>
          <p className="text-muted-foreground">
            {isClusterMode 
              ? "Select multiple experts for a comprehensive strategy session." 
              : "Choose your mentor and confirm your booking."}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex gap-2 mb-8 p-1 bg-card rounded-lg border border-border w-fit">
          <Button 
            variant={!isClusterMode ? 'default' : 'ghost'}
            onClick={() => setIsClusterMode(false)}
            className={!isClusterMode ? 'bg-primary text-white' : ''}
          >
            Solo Session
          </Button>
          <Button 
            variant={isClusterMode ? 'default' : 'ghost'}
            onClick={() => setIsClusterMode(true)}
            className={isClusterMode ? 'bg-primary text-white' : ''}
          >
            Cluster Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Mentor Selection */}
          <div className="lg:col-span-2 space-y-6">
            
            {!isClusterMode ? (
              // --- SOLO MODE UI ---
              selectedSoloMentor ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img src={selectedSoloMentor.image} alt={selectedSoloMentor.name} className="w-32 h-32 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-xl font-bold text-foreground">{selectedSoloMentor.name}</h3>
                            <p className="text-primary text-sm mb-2">{selectedSoloMentor.title}</p>
                          </div>
                          {!preselectedMentor && (
                             <Button variant="ghost" size="sm" onClick={() => setSelectedSoloMentor(null)}>
                               <X size={16} />
                             </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 text-sm mb-2">
                          <Star size={14} fill="currentColor" />
                          {selectedSoloMentor.rating}
                        </div>
                        <p className="text-foreground font-bold text-lg">${selectedSoloMentor.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">Select a Mentor</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mentors.map(m => (
                        <motion.div
                          key={m.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedSoloMentor(m)}
                          className="cursor-pointer border border-border rounded-lg p-3 hover:border-primary transition-colors text-center"
                        >
                          <img src={m.image} alt={m.name} className="w-full h-28 object-cover rounded-md mb-2" />
                          <p className="text-sm font-semibold text-foreground">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.title}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            ) : (
              // --- CLUSTER MODE UI ---
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">1. Choose by Role</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map(cat => (
                        <Button 
                          key={cat} 
                          variant="outline"
                          className={selectedCategory === cat ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>

                    {selectedCategory && (
                      <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in">
                        {filteredMentors.map(m => (
                          <motion.div
                            key={m.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSelectClusterMentor(m)}
                            className="cursor-pointer border border-border rounded-lg p-2 hover:border-primary transition-colors"
                          >
                            <img src={m.image} alt={m.name} className="w-full h-24 object-cover rounded-md mb-2" />
                            <p className="text-xs font-semibold text-foreground truncate">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.category}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">2. Selected Team</h3>
                    {selectedClusterMentors.length === 0 ? (
                      <div className="text-center py-8 border border-dashed border-border rounded-lg">
                        <Users className="mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">Select roles above to build your team.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedClusterMentors.map(m => (
                          <div key={m.id} className="flex items-center justify-between bg-background p-3 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                              <img src={m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{m.name}</p>
                                <p className="text-xs text-primary">{m.category}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400" onClick={() => handleRemoveClusterMentor(m.id)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Schedule & Summary */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* DATE & TIME SELECTION CARD */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="text-primary" size={20} /> Schedule
                </h3>

                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-4">
                  <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                    <ChevronLeft size={18} />
                  </Button>
                  <span className="font-semibold text-foreground">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRight size={18} />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-medium text-muted-foreground py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the 1st */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-9 w-9" />
                  ))}
                  
                  {/* Actual Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const disabled = isDateDisabled(day);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        disabled={disabled}
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors
                          ${isSelected ? 'bg-primary text-white' : 'hover:bg-muted'}
                          ${disabled ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-foreground'}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 border-t border-border pt-4"
                  >
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Clock className="text-primary" size={16} /> Available Times
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(slot => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? 'default' : 'outline'}
                          size="sm"
                          className={selectedTime === slot ? 'bg-primary text-white' : 'border-border text-foreground'}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* SUMMARY CARD (Only shows content when ready) */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-foreground">Summary</h3>
                
                {/* Selected Date/Time Display */}
                {selectedDate && selectedTime ? (
                  <div className="text-sm space-y-1 mb-4 text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Date:</span> 
                      <span className="text-foreground font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Time:</span> 
                      <span className="text-foreground font-medium">{selectedTime}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mb-4 text-center border border-dashed border-border p-2 rounded-lg">
                    Select a date and time above
                  </p>
                )}

                {/* Cluster Pricing (If in Cluster Mode) */}
                {isClusterMode && (
                  <>
                    <div className="border-t border-border pt-4">
                      {selectedClusterMentors.length > 0 ? (
                        <>
                          <div className="flex justify-between font-bold text-foreground text-lg">
                            <span>Total</span>
                            <span>${CLUSTER_FEE}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 text-right">
                            (${(CLUSTER_FEE / selectedClusterMentors.length).toFixed(2)} per mentor)
                          </p>
                        </>
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-4">
                          Select mentors to calculate total
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-primary text-white" 
                      disabled={selectedClusterMentors.length < 2 || !selectedDate || !selectedTime}
                      onClick={handleClusterPayment}
                    >
                      Proceed to Payment
                    </Button>
                  </>
                )}

                {/* Solo Pricing (If in Solo Mode) */}
                {!isClusterMode && selectedSoloMentor && (
                  <>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-bold text-foreground text-lg">
                        <span>Total</span>
                        <span>${selectedSoloMentor.price + 5}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-accent-emerald text-white" 
                      disabled={!selectedDate || !selectedTime}
                      onClick={handleProceedToPayment}
                    >
                      Book Solo Session
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;