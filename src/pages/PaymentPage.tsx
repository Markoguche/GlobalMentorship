import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Lock, CheckCircle, X, FileText, CreditCard } from 'lucide-react';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are in CLUSTER mode
  const isCluster = location.state?.isCluster && location.state?.mentorIds;
  
  // Single Mentor Logic
  const singleMentor = isCluster ? null : mentors.find(m => String(m.id) === id);
  
  // Cluster Logic
  const clusterMentors = isCluster 
    ? mentors.filter(m => location.state.mentorIds.includes(m.id)) 
    : [];
  
  // Determine Total Amount
  const totalAmount = isCluster 
    ? location.state.totalAmount 
    : (singleMentor?.price || 0) + 5;

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  if (!isCluster && !singleMentor) {
    return <div className="pt-32 text-center text-foreground">Invalid booking session.</div>;
  }

  const handlePayment = () => {
    if (!agreementAccepted) { setShowAgreement(true); return; }
    if (!email) { alert('Please enter your email address.'); return; }
    if (!window.PaystackPop) { alert('Payment system loading...'); return; }

    setProcessing(true);

    const handler = window.PaystackPop.setup({
      key: 'pk_test_9a507b6ab117b2bc9deaddaa7092d1267647dcb7',
      email: email,
      amount: totalAmount * 100, // Convert to Kobo/Cents
      currency: 'NGN',
      ref: 'MNT-' + Math.floor(Math.random() * 1000000000),
      
      callback: function(response: any) {
        setProcessing(false);
        setSuccess(true);
        
        // --- SAVE TRANSACTION LOGIC ---
        const commissionRate = 0.10; // 10% Commission

        if (isCluster) {
          // CLUSTER CALCULATION: Split total equally
          const sharePerMentor = totalAmount / clusterMentors.length;

          clusterMentors.forEach(mentor => {
            const mentorShare = sharePerMentor;
            const commission = mentorShare * commissionRate;
            const netEarnings = mentorShare - commission;

            const transaction = {
              id: `${response.reference}-${mentor.id}`,
              mentorId: mentor.id,
              mentorName: mentor.name,
              userEmail: email,
              amount: mentorShare,
              commission: commission,
              netEarnings: netEarnings,
              date: new Date().toISOString(),
            };

            try {
              const existingTransactions = JSON.parse(localStorage.getItem('platform_transactions') || '[]');
              localStorage.setItem('platform_transactions', JSON.stringify([...existingTransactions, transaction]));
            } catch (e) {
              console.error("Error saving cluster transaction", e);
            }
          });

        } else if (singleMentor) {
          // SOLO CALCULATION
          const commission = totalAmount * commissionRate;
          const netEarnings = totalAmount - commission;

          const transaction = {
            id: response.reference,
            mentorId: singleMentor.id,
            mentorName: singleMentor.name,
            userEmail: email,
            amount: totalAmount,
            commission: commission,
            netEarnings: netEarnings,
            date: new Date().toISOString(),
          };

          try {
            const existingTransactions = JSON.parse(localStorage.getItem('platform_transactions') || '[]');
            localStorage.setItem('platform_transactions', JSON.stringify([...existingTransactions, transaction]));
          } catch (e) {
            console.error("Error saving transaction", e);
          }
        }
      },
      
      onClose: function() {
        setProcessing(false);
      }
    });

    handler.openIframe();
  };

  const pageTitle = isCluster 
    ? `Cluster Session (${clusterMentors.length} Mentors)` 
    : `Booking with ${singleMentor?.name}`;

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-accent-emerald/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-accent-emerald" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-8">Your session has been scheduled.</p>
              <Button className="bg-accent-emerald text-white hover:bg-white hover:text-accent-emerald border border-accent-emerald" onClick={() => navigate('/mentors')}>
                Browse More Mentors
              </Button>
            </motion.div>
          ) : (
            <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Secure Payment</h1>
              <p className="text-muted-foreground mb-8">{pageTitle}</p>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock size={16} className="text-accent-emerald" />
                    <span className="text-sm text-muted-foreground">Secured by Paystack</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none" 
                      />
                    </div>
                    
                    {/* Cluster Info Box */}
                    {isCluster && (
                      <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground border border-dashed border-border">
                        <p className="font-semibold text-foreground mb-2">Cluster Team:</p>
                        <ul className="space-y-1">
                          {clusterMentors.map(m => <li key={m.id}>{m.name} ({m.category})</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4"><span className="text-muted-foreground">Session Type</span><span className="text-foreground capitalize">{isCluster ? 'Cluster Group' : 'Solo'}</span></div>
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${totalAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" onClick={handlePayment} disabled={processing}>
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Pay $${totalAmount}`
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAgreement && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-border">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-2"><FileText size={20} className="text-primary" /><h3 className="font-display text-lg font-semibold text-foreground">Mentorship Agreement</h3></div>
                  <button onClick={() => setShowAgreement(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="p-6 overflow-y-auto h-64 text-sm text-muted-foreground space-y-4">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p>This Agreement is entered into between the Mentor(s) and Mentee.</p>
                  <p><strong>1. Terms:</strong> Payment will be distributed equally among selected mentors.</p>
                </div>
                <div className="p-6 border-t border-border space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreementAccepted} onChange={(e) => setAgreementAccepted(e.target.checked)} className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background" />
                    <span className="text-sm text-muted-foreground">I have read and agree to the Agreement</span>
                  </label>
                  <Button className="w-full" disabled={!agreementAccepted} onClick={() => setShowAgreement(false)}>Accept Agreement</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default PaymentPage;