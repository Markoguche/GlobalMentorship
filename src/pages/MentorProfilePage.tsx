import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Star, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';

const MentorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mentor = mentors.find(m => String(m.id) === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Mentor Not Found</h1>
          <Link to="/mentors"><Button>Browse Mentors</Button></Link>
        </div>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <SEO title={mentor.name} description={mentor.bio} image={mentor.image} />
      <div className="max-w-7xl mx-auto px-6">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Mentors
        </motion.button>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" animate="visible">
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-border bg-card shadow-xl">
                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{mentor.name}</h1>
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                    <Star size={14} className="text-amber-500" fill="currentColor" />
                    <span className="text-sm font-medium text-amber-400">{mentor.rating}</span>
                  </div>
                </div>
                <p className="text-primary font-medium mb-2">{mentor.title}</p>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {mentor.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {mentor.sessions} sessions</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">About</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{mentor.fullBio}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm border border-border hover:border-primary/50 transition-colors">{skill}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-24">
              <Card className="border-border shadow-2xl shadow-primary/5">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center pb-6 border-b border-border">
                    <span className="font-display text-4xl font-bold text-foreground">${mentor.price}</span>
                    <span className="text-muted-foreground"> / session</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle size={18} className="text-accent-emerald" /><span>45-minute 1-on-1 session</span></div>
                    <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle size={18} className="text-accent-emerald" /><span>Virtual or Physical meeting</span></div>
                    <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle size={18} className="text-accent-emerald" /><span>Session notes & resources</span></div>
                  </div>

                  <Link to={`/booking/${mentor.id}`} className="block">
                    <Button className="w-full group" size="lg">Book a Session <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" /></Button>
                  </Link>
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