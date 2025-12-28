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
    <div className="min-h-screen bg-stone-50 py-8 md:py-12">
      <SEO 
        title="Refer a Patient | Just AFC"
        description="Submit a patient referral to Just AFC. Secure form for healthcare professionals, social workers, and families seeking adult foster care placement."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-4">Refer a Patient</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            We accept referrals from healthcare professionals, social workers, and family members. 
            Our intake team will review the information and contact you within 24 hours.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "1. Submit Referral", desc: "Complete the secure form below with patient details." },
              { title: "2. Initial Assessment", desc: "We review care needs and verify availability." },
              { title: "3. Admission Plan", desc: "We coordinate a transition plan for the resident." }
            ].map((step, i) => (
              <Card key={i} className="bg-white border-slate-100 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title.split('. ')[1]}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Referral Form */}
          <Card className="shadow-lg border-emerald-100 overflow-hidden">
            <div className="bg-emerald-900 p-6 text-white">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-bold">Secure Referral Form</h2>
              </div>
            </div>
            <CardContent className="p-4 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-900 mb-4">Referral Submitted Successfully</h3>
                  <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8 max-w-md mx-auto">
                    Thank you for trusting Just AFC with this referral. Our admissions team has received the details and will be in touch shortly.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Submit Another Referral
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Referrer Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-900 border-b pb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Referrer Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Your Name</label>
                        <Input 
                          required
                          value={formData.referrer_name}
                          onChange={(e) => setFormData({...formData, referrer_name: e.target.value})}
                          placeholder="Dr. Smith / Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <Input 
                          type="email"
                          required
                          value={formData.referrer_email}
                          onChange={(e) => setFormData({...formData, referrer_email: e.target.value})}
                          placeholder="email@organization.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone Number</label>
                        <Input 
                          value={formData.referrer_phone}
                          onChange={(e) => setFormData({...formData, referrer_phone: e.target.value})}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-900 border-b pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Patient Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Patient Name</label>
                        <Input 
                          required
                          value={formData.patient_name}
                          onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Age</label>
                        <Input 
                          type="number"
                          value={formData.patient_age}
                          onChange={(e) => setFormData({...formData, patient_age: e.target.value})}
                          placeholder="e.g. 75"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium text-slate-700">Care Needs / Diagnosis</label>
                        <Textarea 
                          className="h-32"
                          value={formData.care_needs}
                          onChange={(e) => setFormData({...formData, care_needs: e.target.value})}
                          placeholder="Please describe the patient's condition, required assistance level, and any specific needs..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-auto min-w-[200px]"
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
            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3 text-amber-900 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
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