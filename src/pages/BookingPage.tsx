import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowLeft, Video, MapPin, Clock } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mentor = mentors.find(m => String(m.id) === id);
  const [sessionType, setSessionType] = useState<'virtual' | 'physical'>('virtual');

  if (!mentor) {
    return <div className="pt-32 text-center text-foreground">Mentor not found</div>;
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back to Profile
        </button>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-foreground mb-8"
        >
          Book Session with {mentor.name}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Session Type Selection */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Select Session Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSessionType('virtual')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      sessionType === 'virtual' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-muted'
                    }`}
                  >
                    <Video className={`mb-2 ${sessionType === 'virtual' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="font-medium text-foreground">Virtual</div>
                    <div className="text-sm text-muted-foreground">Zoom / Google Meet</div>
                  </button>
                  <button
                    onClick={() => setSessionType('physical')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      sessionType === 'physical' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-muted'
                    }`}
                  >
                    <MapPin className={`mb-2 ${sessionType === 'physical' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="font-medium text-foreground">Physical</div>
                    <div className="text-sm text-muted-foreground">{mentor.location}</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Date Picker Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Select Date & Time</h2>
                <div className="border border-border rounded-lg p-8 text-center text-muted-foreground">
                  <Clock className="mx-auto mb-2" size={32} />
                  <p>Calendar integration would go here</p>
                  <p className="text-sm">Available slots shown in real-time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-12 h-12 rounded-lg object-cover bg-muted"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/1e293b/ffffff?text=${mentor.name[0]}`; }}
                  />
                  <div>
                    <div className="font-medium text-foreground">{mentor.name}</div>
                    <div className="text-sm text-muted-foreground">45 min session</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Session Fee</span>
                    <span className="text-foreground">${mentor.price}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Fee</span>
                    <span className="text-foreground">$5</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border text-base">
                    <span>Total</span>
                    <span>${mentor.price + 5}</span>
                  </div>
                </div>

                <Link to={`/payment/${mentor.id}?type=${sessionType}`}>
                  <Button className="w-full">Continue to Payment</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;