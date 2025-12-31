import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Home as HomeIcon, UserCheck, Utensils, Activity, Calendar, CheckCircle2, Star, Phone, Mail, Pill, Shirt, CalendarCheck, Apple, ShowerHead, Moon, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/ContactForm';

import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, ParallaxSection } from '@/components/ScrollReveal';
import SEO from '@/components/SEO';

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Comfort", "Dignity", "Peace", "Family", "Respect", "Home"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: HomeIcon,
      title: "Adult Foster Care",
      description: "Providing a supportive, family-like environment for adults who require assistance with daily living."
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Just AFC has medication management and security. We take our residents health seriously."
    },
    {
      icon: Shirt,
      title: "Laundry",
      description: "We offer laundry machines for our residents and full bathing/showering facilities."
    },
    {
      icon: Utensils,
      title: "Full-service dining",
      description: "Our locations are equipped with Kitchens where residents can prepare their meals."
    },
    {
      icon: CalendarCheck,
      title: "Medical Appointment Assistance",
      description: "We offer help and support for making medical appointments"
    },
    {
      icon: Apple,
      title: "Feeding & Diet",
      description: "We offer the support needed for residents on specialized diets and will assist those that need meal planning and preparation."
    },
    {
      icon: ShowerHead,
      title: "Bathing Assistance",
      description: "Our homes and staff can assist residents with bathing needs."
    },
    {
      icon: Moon,
      title: "Night Time Care",
      description: "We offer night time care and monitoring of residents for their security and ours."
    }];


  return (
    <div className="flex flex-col bg-white">
      <SEO
        title="Just AFC - Premier Adult Foster Care in Lansing, MI"
        description="Providing exceptional adult foster care in a warm, family-like environment in Lansing, Michigan. 24/7 support, medication management, and compassionate care."
        keywords="adult foster care, AFC Lansing, senior care, assisted living, Just AFC" />


      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row bg-cream overflow-hidden">
        {/* Left Column: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:p-12 lg:p-16 xl:p-24 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl">

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-sans font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Spaces Available</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-sans font-bold uppercase tracking-widest">
                <span>Non-Medical Care</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-forest leading-[1.1] mb-8 font-normal">
              Where <br />
              <span className="italic">Compassion</span> <br />
              Meets Respect
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-forest/80 mb-10 font-sans leading-relaxed max-w-md">
              Providing exceptional adult foster care in a warm, family-like environment. Because everyone deserves a place to truly call home.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-forest hover:bg-forest/90 text-white text-sm font-bold uppercase tracking-widest px-8 py-6 rounded-none w-full sm:w-auto transition-all group">
                  Schedule a Tour
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl('Services')}>
                <Button variant="outline" className="border-forest text-forest hover:bg-forest/5 text-sm font-bold uppercase tracking-widest px-8 py-6 rounded-none w-full sm:w-auto transition-all">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual */}
        <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/c53344c5c_Adult-Foster-Care1-AdobeStock_224946364.jpg"
            alt="Compassionate Caregiver"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-forest/10 p-4 flex justify-between items-center text-xs font-sans font-bold uppercase tracking-widest text-forest/70 px-8">
            <span>Lansing, MI</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </section>

      {/* Welcome / About Teaser */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream to-transparent -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <ParallaxSection offset={30} className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-sage/20 rounded-full opacity-50 blur-2xl"></div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/dcab800c8_Untitleddesign.png"
                  alt="Happy residents"
                  loading="lazy"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px] relative z-10 transform hover:scale-[1.02] transition-transform duration-700" />

                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-sage/10 rounded-full -z-10 blur-3xl"></div>
              </ParallaxSection>
            </SlideIn>

            <SlideIn direction="right">
              <div className="inline-flex items-center gap-2 text-sage font-bold uppercase tracking-widest text-sm mb-4">
                <Heart className="w-5 h-5" />
                <span>Welcome to Just AFC</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
                A Sanctuary of Care & Comfort
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Just AFC is a premier adult foster care sanctuary dedicated to providing exceptional care. We specialize in comprehensive, <strong className="text-forest">long-term</strong>, <strong className="text-forest">short stays</strong>, <strong className="text-forest">respite care</strong>, and supportive housing.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our experienced staff delivers personalized care plans tailored to meet the unique needs of each individual in a clean, secure, and nurturing environment.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage/20 rounded-lg text-sage">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest">Expert Staff</h4>
                    <p className="text-sm text-forest/60">Trained professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage/20 rounded-lg text-sage">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest">Homelike</h4>
                    <p className="text-sm text-forest/60">Warm atmosphere</p>
                  </div>
                </div>
              </div>

              <Link to={createPageUrl('About')}>
                <Button variant="outline" className="border-sage/30 text-sage hover:bg-sage/5 hover:text-forest group">
                  Learn More About Us <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/20 text-forest text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" /> Our Expertise
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-forest mb-4">Comprehensive Care Services</h2>
              <p className="text-forest/70 text-lg">Everything your loved one needs to live with dignity and comfort.</p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {features.map((feature, index) =>
              <StaggerItem key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-forest/10 hover:shadow-xl hover:border-sage/30 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 bg-sage/10 rounded-2xl flex items-center justify-center text-sage mb-6 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-sage transition-colors">{feature.title}</h3>
                  <p className="text-forest/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>

          <div className="mt-12 text-center">
            <Link to={createPageUrl('Services')}>
              <Button className="bg-forest text-white hover:bg-forest/90 px-8 py-6 rounded-full text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Why Choose Us */}
      <section className="py-12 md:py-24 bg-forest text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-forest/20 to-forest"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="right" className="order-2 lg:order-2">
              <ParallaxSection offset={40} className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-sage/20 to-sage/10 rounded-3xl transform rotate-6"></div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/1c939d70a_image.png"
                  alt="Caring touch"
                  loading="lazy"
                  className="relative rounded-3xl shadow-2xl w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700" />

              </ParallaxSection>
            </SlideIn>

            <SlideIn direction="left" className="order-1 lg:order-1">
              <h2 className="text-sage font-bold tracking-widest uppercase mb-4">Our Philosophy</h2>
              <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-none">
                More Than Care. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream to-sage">It's Family.</span>
              </h3>
              <p className="text-base sm:text-xl text-cream/80 mb-6 md:mb-8 leading-relaxed font-light">
                At Just AFC, we believe high-quality care transcends medical needs—it's about fostering belonging, dignity, and purpose. We provide a supportive environment where residents maintain independence while receiving the assistance they need.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Personalized Attention", desc: "Low caregiver-to-resident ratios ensure individual focus." },
                  { title: "Holistic Approach", desc: "Focusing on mind, body, and spirit well-being." },
                  { title: "Community Integrated", desc: "Keeping residents connected to the world around them." }].
                  map((item, idx) =>
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 border border-sage/50">
                        <CheckCircle2 className="w-6 h-6 text-sage" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-cream/70">{item.desc}</p>
                      </div>
                    </div>
                  )}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Location / Visit CTA */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScaleIn>
            <div className="bg-cream rounded-2xl md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-forest mb-4 md:mb-6">Visit Our Beautiful Home</h2>
                  <p className="text-lg text-forest/70 mb-8 leading-relaxed">
                    Experience the warmth and comfort of our facilities firsthand. Located at <strong>1416 N MLK Blvd, Lansing, MI 48915</strong>, our home is fully accessible and designed for your loved one's comfort.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['Wheelchair Accessible', 'Secure & Safe', 'Beautiful Outdoor Spaces'].map((item, i) =>
                      <li key={i} className="flex items-center gap-2 text-forest/80">
                        <CheckCircle2 className="w-5 h-5 text-sage" /> {item}
                      </li>
                    )}
                  </ul>
                  <Link to={createPageUrl('Contact')}>
                    <Button className="bg-forest hover:bg-forest/90 text-white h-14 px-8 rounded-full text-lg shadow-lg shadow-forest/20">
                      Schedule Your Visit
                    </Button>
                  </Link>
                </div>
                <ParallaxSection offset={-30} className="relative group">
                  <div className="absolute inset-0 bg-forest rounded-2xl rotate-2 group-hover:rotate-1 transition-transform"></div>
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/db6024d64_1416NMLKBlvdJustAFChome.png"
                    alt="Our Home"
                    loading="lazy"
                    className="relative rounded-2xl shadow-lg w-full h-[400px] object-cover -rotate-2 group-hover:-rotate-1 transition-transform duration-500" />

                </ParallaxSection>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Contact / Footer CTA */}
      <section className="py-12 md:py-24 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">Ready to join our family?</h2>
            <p className="text-cream/90 text-base sm:text-xl max-w-2xl mx-auto mb-8 md:mb-12 font-light">
              We invite you to tour our homes, meet our dedicated caregivers, and see firsthand why families trust Just AFC with their loved ones.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-white text-forest hover:bg-cream text-base md:text-lg px-6 md:px-10 py-5 md:py-8 rounded-full w-full sm:w-auto shadow-2xl font-bold transform hover:-translate-y-1 transition-all">
                  Get in Touch
                </Button>
              </Link>
              <Link to={createPageUrl('Referrals')}>
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest text-base md:text-lg px-6 md:px-10 py-5 md:py-8 rounded-full w-full sm:w-auto transition-all font-bold">
                  Refer a Patient
                </Button>
              </Link>
            </div>

            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sage text-sm sm:text-base">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> (517) 402-1891</div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>);

}