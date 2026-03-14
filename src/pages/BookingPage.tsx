import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Calendar, Clock, CheckCircle, Users, Star, X } from 'lucide-react';

const CLUSTER_FEE = 600; 

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // ID is now optional
  const navigate = useNavigate();
  
  // Check if we have a preselected mentor from URL
  const preselectedMentor = id ? mentors.find(m => String(m.id) === id) : null;
  
  const [isClusterMode, setIsClusterMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // State for Solo Mentor (defaults to URL mentor if present)
  const [selectedSoloMentor, setSelectedSoloMentor] = useState<typeof mentors[0] | null>(preselectedMentor || null);
  
  // State for Cluster Mentors - Resets to empty on page refresh
  const [selectedClusterMentors, setSelectedClusterMentors] = useState<typeof mentors>([]);

  const categories = ['CEO', 'CTO', 'CMO', 'Operations', 'Creative'];
  
  const filteredMentors = selectedCategory 
    ? mentors.filter(m => m.category === selectedCategory) 
    : [];

  // --- CLUSTER LOGIC ---
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

  const handleProceedToPayment = () => {
    if (!selectedSoloMentor) return;
    navigate(`/payment/${selectedSoloMentor.id}`);
  };

  const handleClusterPayment = () => {
    navigate(`/payment/cluster`, {
      state: {
        isCluster: true,
        mentorIds: selectedClusterMentors.map(m => m.id),
        totalAmount: CLUSTER_FEE
      }
    });
  };

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
          
          {/* LEFT COLUMN: Selection Logic */}
          <div className="lg:col-span-2 space-y-6">
            
            {!isClusterMode ? (
              // --- SOLO MODE UI ---
              selectedSoloMentor ? (
                // If mentor is selected (either from URL or clicked), show details
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
                          {/* Allow deselecting if they came from Hero/Selection */}
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
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock size={18} /> <span>45 Minutes</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar size={18} /> <span>Flexible Schedule</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <Button 
                        className="w-full bg-accent-emerald text-white" 
                        size="lg"
                        onClick={handleProceedToPayment}
                      >
                        Book Solo Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // If NO mentor selected (came from Hero), show selection grid
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

          {/* RIGHT COLUMN: Summary Sidebar (Only for Cluster or Summary) */}
          {isClusterMode && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-display text-lg font-bold text-foreground">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Session Type</span>
                        <span className="text-foreground font-medium">Group Call</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Mentors</span>
                        <span className="text-foreground font-medium">{selectedClusterMentors.length}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      {/* FIX: Only show price if mentors are selected */}
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
                      disabled={selectedClusterMentors.length < 2}
                      onClick={handleClusterPayment}
                    >
                      {selectedClusterMentors.length < 2 ? `Select ${2 - selectedClusterMentors.length} more` : 'Proceed to Payment'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingPage;