import React, { useState } from 'react';
import { db, id } from '@/lib/instantdb';
import { sendEmailNotification } from '@/lib/emailApi';
import { Sparkles, Loader2, CheckCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from '@tanstack/react-query';
import { FadeIn } from '@/components/ScrollReveal';
import SEO from '@/components/SEO';

export default function Careers() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      // Save to InstantDB
      const applicationId = id();
      await db.transact([
        db.tx.careerApplications[applicationId].update({
          ...data,
          position_interested: 'other',
          experience_years: 0,
          status: 'new',
          createdAt: Date.now()
        })
      ]);

      // Send email notification via serverless function
      try {
        await sendEmailNotification({
          type: 'career',
          data: data
        });
      } catch (error) {
        console.error("Failed to send email notification", error);
      }

      return { id: applicationId };
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ full_name: '', email: '', phone: '', message: '' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO 
        title="Careers at Just AFC | Join Our Team"
        description="Interested in joining the Just AFC family? Send us a general inquiry. We are always looking for compassionate individuals."
      />

      {/* Hero Section */}
      <div className="relative bg-emerald-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2032"
            alt="Background"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 via-emerald-900/80 to-stone-50"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-700 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 fill-emerald-300" />
              <span>Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Build a Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400">Purpose</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-light">
              We are always looking for compassionate individuals who share our values and want to make a positive impact in the lives of our residents.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        {/* Content Section */}
        <FadeIn>
          <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-900/10 overflow-hidden border border-slate-100">
            <div className="grid md:grid-cols-2">
              {/* Form Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
                <h2 className="text-3xl font-bold text-emerald-950 mb-4">General Inquiry</h2>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Interested in working with us? Fill out the form below to get in touch. We'd love to hear from you.
                </p>
                
                {isSubmitted ? (
                  <div className="bg-emerald-50 p-8 rounded-2xl text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-6">
                      Thanks for reaching out. We'll be in touch shortly.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-emerald-900">Full Name</label>
                      <Input 
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder="Jane Smith"
                        className="bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-emerald-900">Email Address</label>
                      <Input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@example.com"
                        className="bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-emerald-900">Phone Number</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                        className="bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-emerald-900">Message</label>
                      <Textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us a bit about yourself..."
                        className="min-h-[120px] bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 text-lg rounded-xl shadow-lg shadow-emerald-900/10 transition-all mt-4"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
              
              {/* Image Side */}
              <div className="relative h-64 md:h-auto order-1 md:order-2 bg-emerald-100">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team collaboration" 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="font-serif italic text-2xl">"Caring is the essence of nursing."</p>
                  <p className="text-emerald-100 text-sm mt-2">— Jean Watson</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}