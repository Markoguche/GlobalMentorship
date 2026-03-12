import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Lock, CreditCard, CheckCircle, X, FileText } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const mentor = mentors.find(m => String(m.id) === id);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const sessionType = queryParams.get('type') || 'virtual';

  if (!mentor) return <div className="pt-32 text-center text-white">Mentor not found</div>;

  const handlePayment = () => {
    if (!agreementAccepted) { setShowAgreement(true); return; }
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setSuccess(true); }, 2000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-accent-emerald/20 flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-accent-emerald" /></div>
              <h1 className="font-display text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
              <p className="text-slate-400 mb-8">Your session with {mentor.name} has been scheduled.</p>
              <Button variant="outline" onClick={() => navigate('/mentors')}>Browse More Mentors</Button>
            </motion.div>
          ) : (
            <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl font-bold text-white mb-2">Secure Payment</h1>
              <p className="text-slate-400 mb-8">Complete your booking with {mentor.name}</p>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6"><Lock size={16} className="text-accent-emerald" /><span className="text-sm text-slate-400">Secured by 256-bit encryption</span></div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none" />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4"><span className="text-slate-400">Session Type</span><span className="text-white capitalize">{sessionType}</span></div>
                  <div className="flex justify-between mb-4"><span className="text-slate-400">Duration</span><span className="text-white">45 minutes</span></div>
                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold"><span className="text-white">Total</span><span className="text-white">${mentor.price + 5}</span></div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" onClick={handlePayment} disabled={processing}>
                {processing ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</span> : `Pay $${mentor.price + 5}`}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAgreement && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface-900 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                  <div className="flex items-center gap-2"><FileText size={20} className="text-brand-400" /><h3 className="font-display text-lg font-semibold text-white">Mentorship Agreement</h3></div>
                  <button onClick={() => setShowAgreement(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                
                <div className="p-6 overflow-y-auto h-64 text-sm text-slate-300 space-y-4">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p>This Agreement is entered into between the Mentor and Mentee.</p>
                  <p><strong>1. Terms:</strong> The mentor agrees to provide mentorship as described.</p>
                  <p><strong>2. Confidentiality:</strong> Both parties agree to keep discussions confidential.</p>
                </div>
                
                <div className="p-6 border-t border-slate-700 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreementAccepted} onChange={(e) => setAgreementAccepted(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-600 text-brand-500 focus:ring-brand-500 bg-slate-800" />
                    <span className="text-sm text-slate-300">I have read and agree to the Mentorship Agreement</span>
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