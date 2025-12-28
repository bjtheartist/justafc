import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { FadeIn, SlideIn, ScaleIn } from '@/components/ScrollReveal';
import SEO from '@/components/SEO';
import Map from '@/components/Map';

export default function Contact() {

  return (
    <div className="bg-white">
      <SEO
        title="Contact Us | Just AFC - Schedule a Tour"
        description="Contact Just AFC to schedule a tour or inquire about our adult foster care services in Lansing, MI. We are here to answer your questions." />

      {/* Header */}
      <div className="bg-emerald-900 py-12 md:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) =>
          <div
            key={i}
            className="absolute rounded-full bg-emerald-700/20"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              left: `${i * 20}%`,
              top: `${-20 + i * 10}%`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }} />

          )}
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
        <div className="relative z-10 container mx-auto px-4">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto px-4">We're here to answer any questions you may have about our care services.</p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Contact Info */}
          <SlideIn direction="left">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">Get In Touch</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Whether you're interested in our services, want to schedule a tour, or have general inquiries, our team is ready to assist you.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Our Location</h3>
                  <p className="text-slate-600">1416 N MLK Blvd<br />Lansing, MI 48915</p>
                  </div>
                  </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Phone Number</h3>
                  <p className="text-slate-600">(517) 402-1891
                  </p>
                  <p className="text-sm text-slate-500">Available 24/7 for emergencies</p>
                </div>
              </div>



              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Office Hours</h3>
                  <p className="text-slate-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-slate-600">Visiting Hours: Daily 10:00 AM - 7:00 PM</p>
                  </div>
                  </div>
                  </div>
                  </SlideIn>

                  {/* Contact Form */}
                  <SlideIn direction="right">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">Send a Message</h2>
            <ContactForm />
            </div>
            </SlideIn>
            </div>
        
        {/* Map Section */}
        <FadeIn>
          <div className="mt-16 rounded-2xl overflow-hidden shadow-md h-[400px] bg-slate-100 relative z-0">
             <Map position={[42.7491, -84.5605]} popupText="Just AFC - 1416 N MLK Blvd, Lansing, MI 48915" />
          </div>
        </FadeIn>
            </div>
            </div>);

}