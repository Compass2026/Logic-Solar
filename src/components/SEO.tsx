import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  schema?: object;
}

export const SEO = ({ 
  title, 
  description = "Logic Solar | Premium Solar Energy Solutions for Home & Business. Custom engineered, high-performance solar installations with luxury service aesthetics.",
  schema
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | Logic Solar`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

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
  }, [title, description, schema, location]);

  return null;
};
