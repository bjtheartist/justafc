import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigation = [
    { name: 'Home', href: 'Home' },
    { name: 'About Us', href: 'About' },
    { name: 'Services', href: 'Services' },
    { name: 'Careers', href: 'Careers' },
    { name: 'Contact', href: 'Contact' }];


  const isActive = (path) => {
    return location.pathname === createPageUrl(path) || location.pathname === '/' && path === 'Home';
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-[rgba(10,34,24,0.15)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
                <div className="bg-transparent p-0">
                  <Heart className="w-6 h-6 text-forest fill-forest" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-serif tracking-tight text-forest">JUST AFC</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Minimal/Utility Style */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) =>
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`text-xs font-sans font-bold uppercase tracking-widest transition-colors ${isActive(item.href) ?
                      'text-forest' :
                      'text-slate-500 hover:text-forest'}`
                  }>

                  {item.name}
                </Link>
              )}
              <Link to={createPageUrl('Referrals')}>
                <Button className="bg-forest hover:bg-forest/90 text-white rounded-none uppercase tracking-widest text-xs font-bold px-6 py-5 shadow-none transition-all">
                  Refer a Patient
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-forest hover:text-forest/80 focus:outline-none">

                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
          <div className="md:hidden bg-white border-b border-[rgba(10,34,24,0.15)] absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navigation.map((item) =>
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`block px-3 py-3 text-sm font-sans font-bold uppercase tracking-widest ${isActive(item.href) ?
                      'text-forest bg-cream' :
                      'text-slate-500 hover:text-forest hover:bg-cream'}`
                  }
                  onClick={() => setIsMenuOpen(false)}>

                  {item.name}
                </Link>
              )}
              <div className="pt-4">
                <Link to={createPageUrl('Referrals')} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-forest text-white rounded-none uppercase tracking-widest text-xs font-bold py-6">
                    Refer a Patient
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#013220] text-white pt-12 pb-8 md:pt-20 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-16">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                <span className="text-xl font-bold tracking-wide">JUST AFC</span>
              </div>
              <p className="text-gray-300 leading-relaxed pr-4">
                Providing compassionate, dignified, and personalized adult foster care services. Your family is our family.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4 text-gray-300">
                <li><Link to={createPageUrl('Home')} className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link to={createPageUrl('About')} className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link to={createPageUrl('Services')} className="hover:text-emerald-400 transition-colors">Services</Link></li>
                <li><Link to={createPageUrl('Contact')} className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                <li><Link to={createPageUrl('Careers')} className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                <li><Link to={createPageUrl('Referrals')} className="hover:text-emerald-400 transition-colors">Referral Center</Link></li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="font-bold text-lg mb-6">Our Services</h3>
              <ul className="space-y-4 text-gray-300">
                <li>Adult Foster Care</li>
                <li>Medication Management</li>
                <li>Laundry</li>
                <li>Full-service dining</li>
                <li>Medical Appointment Assistance</li>
                <li>Feeding & Diet</li>
                <li>Bathing Assistance</li>
                <li>Night Time Care</li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>1416 N MLK Blvd,<br />Lansing, MI 48915</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>(517) 402-1891</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-emerald-400/60">
            <p>&copy; 2025 Just AFC Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}