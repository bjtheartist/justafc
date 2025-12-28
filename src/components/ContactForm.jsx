import React, { useState } from 'react';
import { db, id } from '@/lib/instantdb';
import { sendEmailNotification } from '@/lib/emailApi';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from '@tanstack/react-query';

export default function ContactForm({ className }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      // Save to InstantDB
      const contactId = id();
      await db.transact([
        db.tx.contactMessages[contactId].update({
          ...data,
          createdAt: Date.now()
        })
      ]);

      // Send email notification via serverless function
      try {
        await sendEmailNotification({
          type: 'contact',
          data: data
        });
      } catch (error) {
        console.error("Failed to send email notification", error);
      }

      return { id: contactId };
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-emerald-50 border border-emerald-100 rounded-lg p-8 text-center animate-in fade-in zoom-in duration-300 ${className}`}>
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
        <p className="text-emerald-700">
          Thank you for contacting us. We will get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="mt-6"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name</label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          placeholder="Inquiry about services..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
        <Textarea
          id="message"
          required
          className="h-32"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="How can we help you?"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
