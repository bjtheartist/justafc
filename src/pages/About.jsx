import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Heart, Award, Clock, Shield, Users, CheckCircle2, Star, Smile } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import SEO from '@/components/SEO';

export default function About() {
  return (
    <div className="bg-white flex flex-col">
      <SEO
        title="About Us | Just AFC - Our Mission & Values"
        description="Learn about Just AFC's mission to provide dignity, respect, and a true sense of home. Our experienced staff delivers personalized care in Lansing, MI."
      />
      {/* Hero Section */}
      {/* Hero Section - Editorial Style */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-forest/30 text-forest text-xs font-bold uppercase tracking-widest mb-6">
                <Star className="w-4 h-4 text-forest" />
                <span>Excellence in Adult Foster Care</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-forest mb-8 md:mb-12 leading-[1.1] font-normal">
                About <span className="italic">Just AFC</span>
              </h1>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans">
                  We are more than just a care facility. We are a family dedicated to providing dignity, respect, and a true sense of home for every resident.
                </p>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage/20 rounded-full blur-2xl"></div>
                  <p className="text-forest/60 text-sm md:text-base leading-relaxed relative z-10">
                    "Our goal is to create an environment where residents don't just live, but thrive."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage/20 rounded-full -z-10 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage/10 rounded-full -z-10 blur-xl"></div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/1c939d70a_image.png"
                  alt="Caring Staff"
                  loading="lazy"
                  className="rounded-2xl shadow-2xl w-full object-cover h-[500px] transform hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50">
                  <p className="text-forest font-medium italic">
                    "Our goal is to create an environment where residents don't just live, but thrive."
                  </p>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <h2 className="text-sm font-bold text-sage uppercase tracking-widest mb-3">Our Story</h2>
              <h3 className="text-2xl sm:text-4xl font-bold text-forest mb-4 md:mb-6 leading-tight">Founded on Compassion,<br />Built on Trust.</h3>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-forest/70 leading-relaxed">
                <p>
                  Just AFC began with a simple yet powerful vision: to reimagine adult foster care. We recognized that many facilities felt clinical and impersonal, lacking the warmth that makes a house a home.
                </p>
                <p>
                  We set out to change that. By combining professional care support with a nurturing residential environment, we've created a community where residents receive top-tier non-medical care while retaining their independence and dignity.
                </p>
                <p>
                  Today, our homes are sanctuaries of comfort, staffed by dedicated professionals who treat every resident like their own family member.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-sage">24/7</span>
                  <span className="text-forest/60 mt-1">Care & Support</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-sage">100%</span>
                  <span className="text-forest/60 mt-1">Dedication</span>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-24 bg-cream relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-4">Our Purpose</h2>
            <p className="text-forest/70 text-lg">Guided by a commitment to excellence in everything we do.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <ScaleIn>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-forest/10 h-full hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center text-sage mb-6 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-forest mb-4">Our Mission</h3>
                <p className="text-forest/70 leading-relaxed text-lg">
                  To provide exceptional, personalized adult foster care services that enhance the quality of life for our residents through compassionate support, safe environments, and active community integration.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.1}>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-forest/10 h-full hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center text-sage mb-6 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-forest mb-4">Our Vision</h3>
                <p className="text-forest/70 leading-relaxed text-lg">
                  To be the most trusted partner in adult care, setting the gold standard for residential living where every individual feels valued, respected, safe, and truly at home.
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-24 bg-forest text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="mb-8 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto">The principles that guide our care and define our community.</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {[
              { title: "Respect", desc: "Honoring the dignity and unique story of every resident.", icon: Users },
              { title: "Integrity", desc: "Operating with transparency, honesty, and unwavering ethics.", icon: Shield },
              { title: "Excellence", desc: "Striving for the highest standards in safety and care quality.", icon: Award },
              { title: "Compassion", desc: "Leading with kindness and empathy in every interaction.", icon: Heart },
              { title: "Community", desc: "Fostering deep connections and a sense of belonging.", icon: Smile },
              { title: "Reliability", desc: "Being there when it matters most, 24 hours a day.", icon: Clock },
            ].map((value, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-sage/20 backdrop-blur-sm p-8 rounded-2xl border border-sage/30 hover:bg-sage/30 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-sage/30 rounded-lg">
                      <value.icon className="w-6 h-6 text-sage" />
                    </div>
                    <h4 className="text-xl font-bold text-white">{value.title}</h4>
                  </div>
                  <p className="text-cream/80 leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <SlideIn direction="left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-4 md:mb-6">A Place You Can Call Home</h2>
                <p className="text-lg text-forest/70 mb-8 leading-relaxed">
                  Located at <strong>1416 N MLK Blvd, Lansing, MI 48915</strong>. Each home is thoughtfully designed to be fully accessible while maintaining a warm, inviting atmosphere.
                </p>
                <div className="space-y-4 mb-8">
                  {['Wheelchair Accessible', 'Spacious Common Areas', 'Beautiful Gardens', 'Secure Environment'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage" />
                      <span className="text-forest/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-forest hover:bg-forest/90 text-white h-12 px-8 rounded-full text-lg shadow-lg shadow-forest/20">
                    Schedule a Tour
                  </Button>
                </Link>
              </SlideIn>

              <SlideIn direction="right">
                <div className="relative group">
                  <div className="absolute inset-0 bg-forest rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/db6024d64_1416NMLKBlvdJustAFChome.png"
                    alt="Our Home Location"
                    loading="lazy"
                    className="relative rounded-3xl shadow-xl w-full h-[400px] object-cover transform group-hover:-translate-y-2 transition-transform duration-500"
                  />
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}