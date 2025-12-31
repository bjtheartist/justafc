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
    <div className="min-h-screen bg-white">
      <SEO
        title="Careers at Just AFC | Join Our Team"
        description="Interested in joining the Just AFC family? Send us a general inquiry. We are always looking for compassionate individuals."
      />

      {/* Hero Section - Editorial Style */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden border-b border-forest/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4 text-forest" />
                <span>Join Our Team</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-forest mb-8 leading-[1.1] font-normal">
                Build a Career with <span className="italic">Purpose</span>
              </h1>
              <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
                We are always looking for compassionate individuals who share our values and want to make a positive impact in the lives of our residents.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        {/* Content Section */}
        <FadeIn>
          <div className="bg-cream border border-forest/10 overflow-hidden shadow-2xl shadow-forest/5">
            <div className="grid md:grid-cols-2">
              {/* Form Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1 border-t md:border-t-0 md:border-r border-forest/10">
                <h2 className="text-3xl font-serif font-normal text-forest mb-4">General Inquiry</h2>
                <p className="text-forest/70 mb-8 text-lg leading-relaxed font-sans">
                  Interested in working with us? Fill out the form below to get in touch. We'd love to hear from you.
                </p>

                {isSubmitted ? (
                  <div className="bg-white p-8 border border-forest/10 text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-forest/5 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-forest" />
                    </div>
                    <h3 className="text-xl font-bold text-forest mb-2">Message Sent!</h3>
                    <p className="text-forest/70 mb-6">
                      Thanks for reaching out. We'll be in touch shortly.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-forest text-forest hover:bg-forest/5 rounded-none uppercase tracking-widest text-xs font-bold"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-forest">Full Name</label>
                      <Input
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Jane Smith"
                        className="bg-white border-forest/20 focus:border-forest rounded-none h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-forest">Email Address</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="bg-white border-forest/20 focus:border-forest rounded-none h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-forest">Phone Number</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="bg-white border-forest/20 focus:border-forest rounded-none h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-forest">Message</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us a bit about yourself..."
                        className="min-h-[120px] bg-white border-forest/20 focus:border-forest rounded-none p-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-forest hover:bg-forest/90 text-white h-14 text-sm font-bold uppercase tracking-widest rounded-none shadow-none mt-4"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
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
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-forest/20 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                  <p className="font-serif italic text-2xl md:text-3xl leading-tight">"Caring is the essence of nursing."</p>
                  <p className="text-white/80 text-sm mt-4 font-sans uppercase tracking-widest">— Jean Watson</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}