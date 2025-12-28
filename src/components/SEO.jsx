import React, { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update Title
    document.title = title ? `${title} | Just AFC` : 'Just AFC - Adult Foster Care';

    // Helper to update meta tags
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOG = (property, content) => {
       let element = document.querySelector(`meta[property="${property}"]`);
       if (!element) {
         element = document.createElement('meta');
         element.setAttribute('property', property);
         document.head.appendChild(element);
       }
       element.setAttribute('content', content);
    };

    // Update Description
    if (description) {
      updateMeta('description', description);
      updateOG('og:description', description);
    }

    // Update Keywords
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Update OG Title
    updateOG('og:title', title || 'Just AFC');
    updateOG('og:type', 'website');

    // Inject JSON-LD Structured Data
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Just AFC",
      "description": description || "Premier Adult Foster Care in Lansing, MI",
      "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/db6024d64_1416NMLKBlvdJustAFChome.png",
      "telephone": "(517) 402-1891",
      "email": "info@justafc.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1416 N MLK Blvd",
        "addressLocality": "Lansing",
        "addressRegion": "MI",
        "postalCode": "48915",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.7491,
        "longitude": -84.5605
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$$"
    };

    script.text = JSON.stringify(structuredData);

  }, [title, description, keywords]);

  return null;
}