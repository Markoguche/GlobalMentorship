import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, MapPin, LogIn } from 'lucide-react';
import SEO from '../components/common/SEO';

const MentorCard = ({ mentor }: { mentor: typeof mentors[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Link to={`/mentor/${mentor.id}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col">
        {/* Changed aspect ratio to 4/5 for better portrait fit */}
        <div className="aspect-[4/5] overflow-hidden relative bg-card">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-lg font-semibold text-foreground">{mentor.name}</h3>
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <Star size={14} fill="currentColor" />
              {mentor.rating}
            </div>
          </div>
          <p className="text-primary text-sm mb-2">{mentor.title}</p>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{mentor.bio}</p>

          <div className="mt-auto">
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin size={14} className="mr-1" />
              {mentor.location}
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-display font-bold text-foreground">${mentor.price}</span>
              <span className="text-muted-foreground text-sm">/ session</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const MentorsPage: React.FC = () => {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <SEO 
        title="Find a Mentor" 
        description="Browse our diverse roster of expert mentors. Filter by expertise, industry, and location to find your perfect match." 
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Mentors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with industry leaders ready to guide you to success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {/* NEW SECTION: Mentor Login Access */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="max-w-xl mx-auto text-center">
            <Card className="bg-card border-border shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <LogIn size={28} className="text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Mentor Portal</h2>
                <p className="text-muted-foreground mb-6">
                  Are you a mentor? Log in to access your dashboard, view your earnings, and track your sessions.
                </p>
                <Link to="/mentor-login">
                  <Button 
                    size="lg" 
                    className="bg-accent-emerald text-white hover:bg-white hover:text-accent-emerald border border-accent-emerald transition-colors duration-200"
                  >
                    Login to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </main>
  );
};

export default MentorsPage;