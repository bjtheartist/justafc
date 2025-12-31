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

      {/* Header - Editorial Style */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden border-b border-forest/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-bold uppercase tracking-widest mb-6">
                <Clock className="w-4 h-4 text-forest" />
                <span>Available 24/7</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-forest mb-8 leading-[1.1] font-normal">
                Contact <span className="italic">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
                We're here to answer any questions you may have about our care services.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Contact Info */}
          <SlideIn direction="left">
            <h2 className="text-3xl font-serif font-normal text-forest mb-6">Get In Touch</h2>
            <p className="text-forest/70 mb-10 text-lg font-sans leading-relaxed">
              Whether you're interested in our services, want to schedule a tour, or have general inquiries, our team is ready to assist you.
            </p>

            <div className="space-y-10 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 border border-forest/20 flex items-center justify-center text-forest flex-shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest text-sm uppercase tracking-widest mb-1">Our Location</h3>
                  <p className="text-forest/80 font-sans">1416 N MLK Blvd<br />Lansing, MI 48915</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 border border-forest/20 flex items-center justify-center text-forest flex-shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest text-sm uppercase tracking-widest mb-1">Phone Number</h3>
                  <p className="text-forest/80 font-sans mb-1">(517) 402-1891</p>
                  <p className="text-xs text-forest/50 uppercase tracking-wide">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 border border-forest/20 flex items-center justify-center text-forest flex-shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest text-sm uppercase tracking-widest mb-1">Office Hours</h3>
                  <p className="text-forest/80 font-sans">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-forest/80 font-sans">Visiting Hours: Daily 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <SlideIn direction="right">
            <div className="bg-cream p-10 border border-forest/10">
              <h2 className="text-2xl font-serif font-normal text-forest mb-8">Send a Message</h2>
              <ContactForm />
            </div>
          </SlideIn>
        </div>

        {/* Map Section */}
        <FadeIn>
          <div className="mt-24 rounded-none overflow-hidden h-[400px] bg-slate-100 relative z-0 border border-forest/10">
            <Map position={[42.7491, -84.5605]} popupText="Just AFC - 1416 N MLK Blvd, Lansing, MI 48915" />
          </div>
        </FadeIn>
      </div>
    </div>);

}