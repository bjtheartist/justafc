import React, { useState } from 'react';
import { db, id } from '@/lib/instantdb';
import { sendEmailNotification } from '@/lib/emailApi';
import { ClipboardList, User, Phone, Mail, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SEO from '@/components/SEO';

export default function Referrals() {
  const [formData, setFormData] = useState({
    referrer_name: '',
    referrer_email: '',
    referrer_phone: '',
    patient_name: '',
    patient_age: '',
    care_needs: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      // Save to InstantDB
      const referralId = id();
      await db.transact([
        db.tx.referrals[referralId].update({
          ...data,
          patient_age: parseInt(data.patient_age) || 0,
          status: 'new',
          createdAt: Date.now()
        })
      ]);

      // Send email notification via serverless function
      try {
        await sendEmailNotification({
          type: 'referral',
          data: data
        });
      } catch (error) {
        console.error("Failed to send email notification", error);
      }

      return { id: referralId };
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({
        referrer_name: '',
        referrer_email: '',
        referrer_phone: '',
        patient_name: '',
        patient_age: '',
        care_needs: '',
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Refer a Patient | Just AFC"
        description="Submit a patient referral to Just AFC. Secure form for healthcare professionals, social workers, and families seeking adult foster care placement."
      />

      {/* Editorial Header */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden border-b border-forest/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-bold uppercase tracking-widest mb-6 bg-white/50">
              <ClipboardList className="w-4 h-4 text-forest" />
              <span>Professionals & Families</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-forest mb-8 leading-[1.1] font-normal">
              Refer a <span className="italic">Patient</span>
            </h1>
            <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl mx-auto">
              We accept referrals from healthcare professionals, social workers, and family members. Our intake team will review the information and contact you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 md:py-24">
        <div className="grid gap-12">
          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "1. Submit Referral", desc: "Complete the secure form below with patient details." },
              { title: "2. Initial Assessment", desc: "We review care needs and verify availability." },
              { title: "3. Admission Plan", desc: "We coordinate a transition plan for the resident." }
            ].map((step, i) => (
              <div key={i} className="bg-cream border border-forest/10 p-8 text-center">
                <div className="w-10 h-10 border border-forest/20 flex items-center justify-center text-forest font-bold mx-auto mb-4 bg-white font-sans">
                  {i + 1}
                </div>
                <h3 className="font-bold text-forest mb-2 font-serif text-lg">{step.title.split('. ')[1]}</h3>
                <p className="text-sm text-forest/70 font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Referral Form */}
          <div className="border border-forest/10 bg-white">
            <div className="bg-forest p-6 text-white border-b border-forest/10">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-cream" />
                <h2 className="text-lg font-bold uppercase tracking-widest text-cream">Secure Referral Form</h2>
              </div>
            </div>
            <div className="p-6 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-forest/5 flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-forest" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-forest mb-4 font-serif">Referral Submitted Successfully</h3>
                  <p className="text-sm md:text-base text-forest/70 mb-6 md:mb-8 max-w-md mx-auto font-sans">
                    Thank you for trusting Just AFC with this referral. Our admissions team has received the details and will be in touch shortly.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-forest hover:bg-forest/90 text-white rounded-none uppercase tracking-widest font-bold"
                  >
                    Submit Another Referral
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Referrer Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-forest border-b border-forest/10 pb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Referrer Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Your Name</label>
                        <Input
                          required
                          value={formData.referrer_name}
                          onChange={(e) => setFormData({ ...formData, referrer_name: e.target.value })}
                          placeholder="Dr. Smith / Jane Doe"
                          className="bg-cream border-forest/10 focus:border-forest rounded-none h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Email Address</label>
                        <Input
                          type="email"
                          required
                          value={formData.referrer_email}
                          onChange={(e) => setFormData({ ...formData, referrer_email: e.target.value })}
                          placeholder="email@organization.com"
                          className="bg-cream border-forest/10 focus:border-forest rounded-none h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Phone Number</label>
                        <Input
                          value={formData.referrer_phone}
                          onChange={(e) => setFormData({ ...formData, referrer_phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="bg-cream border-forest/10 focus:border-forest rounded-none h-11"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-forest border-b border-forest/10 pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Patient Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Patient Name</label>
                        <Input
                          required
                          value={formData.patient_name}
                          onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                          placeholder="Full Name"
                          className="bg-cream border-forest/10 focus:border-forest rounded-none h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Age</label>
                        <Input
                          type="number"
                          value={formData.patient_age}
                          onChange={(e) => setFormData({ ...formData, patient_age: e.target.value })}
                          placeholder="e.g. 75"
                          className="bg-cream border-forest/10 focus:border-forest rounded-none h-11"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-forest/70">Care Needs / Diagnosis</label>
                        <Textarea
                          className="min-h-[120px] bg-cream border-forest/10 focus:border-forest rounded-none p-4"
                          value={formData.care_needs}
                          onChange={(e) => setFormData({ ...formData, care_needs: e.target.value })}
                          placeholder="Please describe the patient's condition, required assistance level, and any specific needs..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-forest hover:bg-forest/90 text-white w-full md:w-auto min-w-[200px] rounded-none uppercase tracking-widest font-bold h-14"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                        </>
                      ) : (
                        "Submit Referral"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="bg-cream border border-forest/10 p-6 flex items-start gap-3 text-forest/70 text-sm">
            <AlertCircle className="w-5 h-5 text-forest/50 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Privacy Notice:</strong> All information submitted via this form is handled with strict confidentiality in compliance with HIPAA regulations.
              If this is a medical emergency, please dial 911 immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}