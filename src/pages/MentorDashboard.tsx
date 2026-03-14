import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { DollarSign, Users, Percent, LogOut, Eye } from 'lucide-react';

interface Transaction {
  id: string;
  mentorId: string | number;
  userEmail: string;
  amount: number;
  commission: number;
  netEarnings: number;
  date: string;
}

const MentorDashboard: React.FC = () => {
  const { mentor, logout } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!mentor) {
      navigate('/mentor-login');
      return;
    }

    // Load transactions from localStorage
    const allTransactions: Transaction[] = JSON.parse(localStorage.getItem('platform_transactions') || '[]');
    
    // Filter transactions for this specific mentor
    const mentorTransactions = allTransactions.filter(t => String(t.mentorId) === String(mentor.id));
    
    // Sort by date (newest first)
    mentorTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setTransactions(mentorTransactions);
  }, [mentor, navigate]);

  if (!mentor) return null;

  // Calculate Totals
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0);
  const totalEarnings = transactions.reduce((sum, t) => sum + t.netEarnings, 0);
  const totalStudents = new Set(transactions.map(t => t.userEmail)).size;

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, {mentor.name}</h1>
            <p className="text-muted-foreground">Here is your financial overview.</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500/10"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Total Revenue</span>
                <DollarSign size={18} className="text-accent-emerald" />
              </div>
              <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Your Earnings</span>
                <DollarSign size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">After platform fees</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Platform Commission</span>
                <Percent size={18} className="text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">${totalCommission.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Unique Students</span>
                <Users size={18} className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Recent Payments</h2>
            </div>
            
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No payments recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 text-muted-foreground text-sm">
                    <tr>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Student Email</th>
                      <th className="p-4 font-medium">Gross Amount</th>
                      <th className="p-4 font-medium">Commission</th>
                      <th className="p-4 font-medium">Net Earning</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-t border-border hover:bg-muted/20">
                        <td className="p-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                        <td className="p-4 text-sm">{t.userEmail}</td>
                        <td className="p-4 text-sm">${t.amount.toFixed(2)}</td>
                        <td className="p-4 text-sm text-orange-500">-${t.commission.toFixed(2)}</td>
                        <td className="p-4 text-sm font-semibold text-accent-emerald">${t.netEarnings.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-accent-emerald/20 text-accent-emerald">Paid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
};

export default MentorDashboard;