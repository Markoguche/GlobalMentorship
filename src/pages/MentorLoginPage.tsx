import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { LogIn } from 'lucide-react';

const MentorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple simulation: Any password works if email matches a mentor
    if (login(email, 'password')) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use a mentor\'s email from the data.');
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <LogIn className="mx-auto mb-4 text-primary" size={32} />
            <h1 className="font-display text-2xl font-bold text-foreground">Mentor Portal</h1>
            <p className="text-muted-foreground text-sm">Access your earnings dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mentor@example.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Demo: Use mentor email, any password.</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full bg-accent-emerald text-white hover:opacity-90">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default MentorLoginPage;