import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Check, Phone, Heart, Users, Clock, Shield, Car, Utensils, Activity, Shirt, CalendarCheck, Apple, ShowerHead, Moon, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ScrollReveal';
import SEO from '@/components/SEO';

export default function Services() {
  const servicesList = [
    {
      id: "afc",
      title: "Adult Foster Care",
      icon: Heart,
      description: "Our core service provides a safe, supportive, and family-like living environment for adults who are unable to live independently.",
      details: [
        "24/7 supervision and assistance",
        "Private or semi-private furnished rooms",
        "Housekeeping and laundry services",
        "Assistance with daily living activities",
        "Emergency response planning"
      ]
    },
    {
      id: "medication",
      title: "Medication Management",
      icon: Shield,
      description: "Just AFC has medication management and security. We take our residents health seriously.",
      details: [
        "Secure medication storage",
        "Administration by trained staff",
        "Refill coordination with pharmacies",
        "Documentation of all doses",
        "Regular medication reviews"
      ]
    },
    {
      id: "laundry",
      title: "Laundry",
      icon: Shirt,
      description: "We offer laundry machines for our residents and full bathing/showering facilities.",
      details: [
        "Laundry machines available",
        "Assistance with laundry if needed",
        "Full bathing facilities",
        "Showering assistance available",
        "Clean linens provided"
      ]
    },
    {
      id: "dining",
      title: "Full-service dining",
      icon: Utensils,
      description: "Our locations are equipped with Kitchens where residents can prepare their meals.",
      details: [
        "Full kitchen facilities",
        "Meal preparation assistance",
        "Dietary accommodations",
        "Cooking support available",
        "Nutritious meal options"
      ]
    },
    {
      id: "medical_appointments",
      title: "Medical Appointment Assistance",
      icon: CalendarCheck,
      description: "We offer help and support for making medical appointments",
      details: [
        "Scheduling assistance",
        "Transportation coordination",
        "Appointment reminders",
        "Medical records management",
        "Follow-up care support"
      ]
    },
    {
      id: "feeding",
      title: "Feeding & Diet",
      icon: Apple,
      description: "We offer the support needed for residents on specialized diets and will assist those that need meal planning and preparation.",
      details: [
        "Specialized diet support",
        "Meal planning assistance",
        "Meal preparation help",
        "Nutritional guidance",
        "Feeding assistance as needed"
      ]
    },
    {
      id: "bathing",
      title: "Bathing Assistance",
      icon: ShowerHead,
      description: "Our homes and staff can assist residents with bathing needs.",
      details: [
        "Bathing assistance",
        "Showering support",
        "Personal hygiene help",
        "Safety equipment available",
        "Respectful and dignified care"
      ]
    },
    {
      id: "nightcare",
      title: "Night Time Care",
      icon: Moon,
      description: "We offer night time care and monitoring of residents for their security and ours.",
      details: [
        "24/7 overnight supervision",
        "Night time assistance",
        "Safety monitoring",
        "Emergency response available",
        "Peace of mind for families"
      ]
    }
  ];

  return (
    <div className="bg-cream flex flex-col min-h-screen">
      <SEO
        title="Our Services | Just AFC - Adult Foster Care & Support"
        description="Comprehensive care services including 24/7 supervision, medication management, meal preparation, laundry, and medical appointment assistance at Just AFC."
      />
      {/* Hero Section - Editorial Style */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4 text-forest" />
                <span>Comprehensive Care Solutions</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-forest mb-8 md:mb-12 leading-[1.1] font-normal">
                Our <span className="italic">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
                We provide a full spectrum of care services designed to support independence, health, and happiness in a warm, family-like setting.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <div className="flex-grow relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-forest to-cream -z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-24 pt-8">
          <StaggerContainer className="grid gap-6 md:gap-10" staggerDelay={0.15}>
            {servicesList.map((service, index) => (
              <StaggerItem key={service.id}>
                <div className="group bg-white rounded-3xl shadow-xl shadow-forest/5 overflow-hidden border border-forest/10 hover:shadow-2xl hover:shadow-forest/10 transition-all duration-500 transform hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row min-h-0 md:min-h-[320px]">
                    {/* Icon Side */}
                    <div className="md:w-1/3 bg-gradient-to-br from-sage/10 to-sage/5 p-6 md:p-10 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-forest/10 relative overflow-hidden">
                      {/* Background blob */}
                      <div className="absolute inset-0 bg-sage/20 rounded-full blur-3xl transform scale-150 translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      <div className="relative z-10 w-24 h-24 bg-white rounded-2xl shadow-lg shadow-sage/20 flex items-center justify-center text-sage mb-6 group-hover:scale-110 group-hover:bg-forest group-hover:text-white transition-all duration-500">
                        <service.icon className="w-12 h-12" />
                      </div>
                      <h3 className="relative z-10 text-2xl font-bold text-forest mb-2">{service.title}</h3>
                      <div className="w-12 h-1 bg-sage rounded-full mt-4 group-hover:w-20 transition-all duration-500"></div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6 md:p-10 md:w-2/3 flex flex-col justify-center">
                      <p className="text-lg md:text-xl text-forest/70 mb-6 md:mb-8 leading-relaxed font-light">
                        {service.description}
                      </p>
                      <h4 className="text-sm font-bold text-sage uppercase tracking-widest mb-4">What's Included</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item">
                            <div className="mt-1 p-0.5 bg-sage/20 rounded-full text-sage group-hover/item:bg-forest group-hover/item:text-white transition-colors duration-300">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-forest/80 group-hover/item:text-forest transition-colors duration-300">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA Section */}
          <FadeIn>
            <div className="mt-12 md:mt-24 bg-forest rounded-2xl md:rounded-[2.5rem] p-6 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-forest/30">
              {/* Background Patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">Not sure which care level is right?</h2>
                <p className="text-cream/90 text-base sm:text-xl mb-8 md:mb-10 leading-relaxed font-light">
                  Our experienced team is here to help assess your loved one's needs and recommend the most appropriate care plan. Contact us today for a free, no-obligation consultation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Link to={createPageUrl('Contact')}>
                    <Button className="bg-white text-forest hover:bg-cream text-base md:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold w-full sm:w-auto">
                      Contact Us Today
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center gap-3 text-cream font-medium bg-white/10 backdrop-blur-md px-6 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 w-full sm:w-auto">
                    <Phone className="w-5 h-5" />
                    <span className="text-base md:text-lg tracking-wide">(517) 402-1891</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}