import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../../data/mentors';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Star, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

const MentorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mentor = mentors.find(m => String(m.id) === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-4">Mentor Not Found</h1>
          <Link to="/mentors"><Button>Browse Mentors</Button></Link>
        </div>
      </div>
    );
  }

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Mentors
        </motion.button>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-700 bg-slate-800 shadow-xl">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1e293b/ffffff?text=${mentor.name.split(' ').map(n=>n[0]).join('')}`;
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{mentor.name}</h1>
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                    <Star size={14} className="text-amber-400" fill="currentColor" />
                    <span className="text-sm font-medium text-amber-200">{mentor.rating}</span>
                  </div>
                </div>
                <p className="text-brand-400 font-medium mb-2">{mentor.title}</p>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {mentor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {mentor.sessions} sessions
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-white mb-4">About</h2>
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">{mentor.fullBio}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-white mb-4">Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700 hover:border-brand-500/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              variants={itemVariants}
              className="sticky top-24"
            >
              <Card className="border-slate-700 shadow-2xl shadow-brand-500/5">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center pb-6 border-b border-slate-700">
                    <span className="font-display text-4xl font-bold text-white">${mentor.price}</span>
                    <span className="text-slate-400"> / session</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-accent-emerald" />
                      <span>45-minute 1-on-1 session</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-accent-emerald" />
                      <span>Virtual or Physical meeting</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-accent-emerald" />
                      <span>Session notes & resources</span>
                    </div>
                  </div>

                  <Link to={`/booking/${mentor.id}`} className="block">
                    <Button className="w-full group" size="lg">
                      Book a Session
                      <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-slate-500">
                    Instant booking confirmation
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default MentorProfilePage;