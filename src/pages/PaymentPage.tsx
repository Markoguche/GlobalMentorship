import React, { useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mentors } from '../data/mentors';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { FileText, CheckCircle, X, Upload, Building2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const formRef = useRef<HTMLFormElement>(null);

  const isCluster = location.state?.isCluster && location.state?.mentorIds;
  const singleMentor = isCluster ? null : mentors.find(m => String(m.id) === id);
  const clusterMentors = isCluster 
    ? mentors.filter(m => location.state.mentorIds.includes(m.id)) 
    : [];
  
  const selectedDate = location.state?.date ? new Date(location.state.date) : null;
  const selectedTime = location.state?.time || 'N/A';

  const totalAmount = isCluster 
    ? location.state.totalAmount 
    : (singleMentor?.price || 0) + 5;

  const mentorNames = isCluster 
    ? clusterMentors.map(m => m.name).join(', ') 
    : singleMentor?.name || 'N/A';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>('');
  
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload an image or PDF.');
        return;
      }
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setReceiptPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !receiptFile) {
      toast.error('Please fill all fields and upload your receipt.');
      return;
    }

    // --- DEBUGGING LOGS ---
    // Check your console (F12) to make sure these are your actual IDs, not placeholders!
    console.log("Submitting with Service ID:", "YOUR_SERVICE_ID");
    console.log("Template ID:", "YOUR_TEMPLATE_ID");
    console.log("Public Key:", "YOUR_PUBLIC_KEY");
    // ----------------------

    setIsSubmitting(true);

    try {
      // --- REPLACE THESE STRINGS WITH YOUR ACTUAL KEYS ---
      const serviceID = 'service_yjbtqut'; 
      const templateID = 'template_u719jos';
      const publicKey = 'kwYEiU-nNsK2DnhHT';

      await emailjs.sendForm(
        serviceID, 
        templateID, 
        formRef.current!, 
        publicKey
      );

      // --- SAVE TO LOCALSTORAGE ---
      const commissionRate = 0.10;
      
      if (isCluster) {
        const sharePerMentor = totalAmount / clusterMentors.length;
        clusterMentors.forEach(mentor => {
          const transaction = {
            id: `TXN-${Date.now()}-${mentor.id}`,
            mentorId: mentor.id,
            mentorName: mentor.name,
            userEmail: email,
            amount: sharePerMentor,
            commission: sharePerMentor * commissionRate,
            netEarnings: sharePerMentor - (sharePerMentor * commissionRate),
            date: new Date().toISOString(),
            status: 'Pending Verification',
            receipt: receiptPreview
          };
          const existingTransactions = JSON.parse(localStorage.getItem('platform_transactions') || '[]');
          localStorage.setItem('platform_transactions', JSON.stringify([...existingTransactions, transaction]));
        });
      } else if (singleMentor) {
        const transaction = {
          id: `TXN-${Date.now()}`,
          mentorId: singleMentor.id,
          mentorName: singleMentor.name,
          userEmail: email,
          amount: totalAmount,
          commission: totalAmount * commissionRate,
          netEarnings: totalAmount - (totalAmount * commissionRate),
          date: new Date().toISOString(),
          status: 'Pending Verification',
          receipt: receiptPreview
        };
        const existingTransactions = JSON.parse(localStorage.getItem('platform_transactions') || '[]');
        localStorage.setItem('platform_transactions', JSON.stringify([...existingTransactions, transaction]));
      }

      toast.success('Payment proof submitted successfully!');
      setSuccess(true);

    } catch (error: any) {
      console.error('EMAILJS ERROR DETAILS:', error); // Check this in console!
      
      // More specific error messages
      if (error.text) {
        toast.error(`Failed to send: ${error.text}`);
      } else if (error.status === 400) {
        toast.error("Bad Request: Check your Service/Template IDs.");
      } else {
        toast.error('Failed to send proof. Check console for details.');
      }
    } finally {
      setIsSubmitting(false);
      setShowAgreement(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-accent-emerald/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-accent-emerald" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Submission Successful</h1>
              <p className="text-muted-foreground mb-8 px-4">
                Your payment proof has been submitted. Our team will verify your transfer and confirm your mentorship session shortly.
              </p>
              <Button className="bg-accent-emerald text-white hover:bg-white hover:text-accent-emerald border border-accent-emerald" onClick={() => navigate('/mentors')}>
                Browse More Mentors
              </Button>
            </motion.div>
          ) : (
            <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Secure Payment</h1>
              <p className="text-muted-foreground mb-8">Booking with {mentorNames}</p>

              <form ref={formRef} className="space-y-6">
                
                {/* BANK DETAILS */}
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Building2 size={20} className="text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">Bank Transfer Details</h2>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-dashed border-border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-semibold text-foreground">Zenith Bank PLC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-semibold text-foreground">ServeLead Global</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-bold text-primary text-lg tracking-wider">1228667240</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PAYMENT PROOF FORM */}
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <FileText size={20} className="text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">Payment Proof</h2>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Hidden Inputs for EmailJS to pick up */}
                      <input type="hidden" name="mentor_name" value={mentorNames} />
                      <input type="hidden" name="session_type" value={isCluster ? 'Cluster Session' : 'Solo Session'} />
                      <input type="hidden" name="amount" value={`$${totalAmount}`} />
                      <input type="hidden" name="date" value={selectedDate ? selectedDate.toDateString() : 'N/A'} />
                      <input type="hidden" name="time" value={selectedTime} />

                      {/* Mentor Input (UI Only) */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Selected Mentor(s)</label>
                        <input 
                          type="text" 
                          readOnly 
                          value={mentorNames}
                          className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground cursor-not-allowed focus:outline-none opacity-80"
                        />
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="user_name"
                          placeholder="John Doe" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-primary focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="user_email"
                          placeholder="you@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-primary focus:outline-none"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="user_phone"
                          placeholder="+234 800 000 0000" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-primary focus:outline-none"
                        />
                      </div>

                      {/* Upload Receipt */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Upload Receipt</label>
                        <div className="relative">
                          <input 
                            type="file" 
                            name="receipt" // IMPORTANT: Must match attachment variable in EmailJS
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="hidden" 
                            id="receipt-upload"
                          />
                          <label 
                            htmlFor="receipt-upload"
                            className="w-full flex flex-col items-center justify-center bg-muted/30 border border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            {receiptPreview ? (
                              <div className="text-center">
                                <img src={receiptPreview} alt="Receipt Preview" className="max-h-32 mx-auto rounded-md mb-2 object-contain" />
                                <p className="text-sm text-foreground font-medium">{receiptFile?.name}</p>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">Click to upload</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="button"
                  className="w-full bg-primary text-white" 
                  size="lg" 
                  onClick={() => setShowAgreement(true)}
                  disabled={!fullName || !email || !phone || !receiptFile}
                >
                  Continue
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AGREEMENT MODAL */}
        <AnimatePresence>
          {showAgreement && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-border shadow-xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">Mentorship Agreement</h3>
                  </div>
                  <button onClick={() => setShowAgreement(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto h-64 text-sm text-muted-foreground space-y-4">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  
                  <ul className="list-disc list-inside space-y-2">
                    <li>Payment confirms your booking request.</li>
                    <li>The platform retains a commission from mentor earnings.</li>
                    <li>Refunds are subject to mentor availability.</li>
                    <li>Uploaded receipts will be verified before final confirmation.</li>
                  </ul>
                </div>
                
                <div className="p-6 border-t border-border space-y-4 bg-background">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreementAccepted} 
                      onChange={(e) => setAgreementAccepted(e.target.checked)} 
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-card" 
                    />
                    <span className="text-sm text-muted-foreground">
                      I have read and agree to the Mentorship Agreement
                    </span>
                  </label>
                  
                  <Button 
                    className="w-full bg-accent-emerald text-white hover:bg-accent-emerald/90" 
                    disabled={!agreementAccepted || isSubmitting}
                    onClick={handleSubmitProof}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Submit Payment Proof'
                    )}
                  </Button>
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