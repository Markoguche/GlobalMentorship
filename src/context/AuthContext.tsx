import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mentors } from '../data/mentors';

interface Mentor {
  id: string | number;
  name: string;
  email: string;
}

interface AuthContextType {
  mentor: Mentor | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mentor, setMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    const storedMentor = sessionStorage.getItem('currentMentor');
    if (storedMentor) {
      setMentor(JSON.parse(storedMentor));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // 1. Find the mentor. We cast to 'any' to avoid TS error if 'email' is missing in data file
    const foundMentor = mentors.find((m: any) => 
      m.email && m.email.toLowerCase() === email.toLowerCase()
    );
    
    // 2. If found, log them in
    if (foundMentor) {
      const mentorData = { 
        id: foundMentor.id, 
        name: foundMentor.name, 
        email: foundMentor.email 
      };
      setMentor(mentorData);
      sessionStorage.setItem('currentMentor', JSON.stringify(mentorData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setMentor(null);
    sessionStorage.removeItem('currentMentor');
  };

  return (
    <AuthContext.Provider value={{ mentor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};