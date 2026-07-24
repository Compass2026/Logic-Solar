import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  schema?: object;
  noindex?: boolean;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
}

export const SEO = ({ 
  title, 
  description = "Logic Solar | Premium Solar Energy Solutions for Home & Business. Custom engineered, high-performance solar installations with luxury service aesthetics.",
  schema,
  noindex = false,
  canonicalUrl,
  ogImage = "https://logicsolar.com/images/missouri-hero.jpg",
  ogType = "website",
  ogUrl
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Prevent duplicating "| Logic Solar" if title already includes it
    const formattedTitle = title.includes("Logic Solar") ? title : `${title} | Logic Solar`;
    document.title = formattedTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Handle Canonical URL
    const currentCanonicalUrl = canonicalUrl || `${window.location.origin}${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonicalUrl);

    // Handle Open Graph Meta Tags
    const setOgMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    };

    setOgMeta('og:title', formattedTitle);
    setOgMeta('og:description', description);
    setOgMeta('og:image', ogImage);
    setOgMeta('og:type', ogType);
    setOgMeta('og:url', ogUrl || currentCanonicalUrl);

    // Handle noindex
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // Handle Schema
    const existingSchema = document.getElementById('json-ld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, schema, location, canonicalUrl, ogImage, ogType, ogUrl, noindex]);

  return null;
};
