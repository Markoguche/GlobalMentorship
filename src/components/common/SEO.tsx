import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "mentorship, global leaders, career growth, startups, business development",
  image = "https://placehold.co/1200x630/020617/ffffff?text=Global+Mentorship" 
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title} | Global Mentorship Program</title>
      <meta name="title" content={`${title} | Global Mentorship Program`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://globalmentorship.org/" />
      <meta property="og:title" content={`${title} | Global Mentorship Program`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://globalmentorship.org/" />
      <meta property="twitter:title" content={`${title} | Global Mentorship Program`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;