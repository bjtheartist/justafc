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
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> (517) 402-1891</span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="flex items-center gap-2 bg-emerald-800/50 px-2 py-0.5 rounded-full border border-emerald-700/50 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-green-100 font-semibold text-xs">Rooms Available</span>
            </span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="text-emerald-100 font-medium">Now Serving Central and West Michigan!</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
                <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <Heart className="w-8 h-8 text-emerald-700 fill-emerald-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-emerald-900 tracking-tight leading-none">JUST AFC</span>
                  <span className="text-xs font-medium text-emerald-600 tracking-widest uppercase">Adult Foster Care</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) =>
              <Link
                key={item.name}
                to={createPageUrl(item.href)}
                className={`text-sm font-medium transition-colors ${
                isActive(item.href) ?
                'text-emerald-700 font-semibold' :
                'text-slate-600 hover:text-emerald-600'}`
                }>

                  {item.name}
                </Link>
              )}
              <Link to={createPageUrl('Referrals')}>
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  Refer a Patient
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-emerald-700 focus:outline-none">

                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navigation.map((item) =>
            <Link
              key={item.name}
              to={createPageUrl(item.href)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
              isActive(item.href) ?
              'bg-emerald-50 text-emerald-700' :
              'text-slate-600 hover:bg-gray-50 hover:text-emerald-600'}`
              }
              onClick={() => setIsMenuOpen(false)}>

                  {item.name}
                </Link>
            )}
              <div className="pt-4">
                <Link to={createPageUrl('Referrals')} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
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