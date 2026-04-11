import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Home, Calendar, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const ThankYouPage = () => {
  return (
    <InternalFormPageTemplate
      title="Submission Received"
      subtitle="Thank you for choosing Logic Solar. Your request has been successfully transmitted to our engineering team."
      eyebrow="Success"
    >
      <div className="flex flex-col items-center text-center">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3 
          }}
          className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-brand-dark mb-4">We're on it!</h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-12">
            A Logic Solar specialist will review your details and reach out within 24 business hours to discuss the next steps for your project.
          </p>
        </motion.div>

        {/* What's Next Section */}
        <div className="w-full grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Calendar className="w-6 h-6" />,
              title: "Review",
              desc: "Our engineers analyze your energy needs."
            },
            {
              icon: <Phone className="w-6 h-6" />,
              title: "Contact",
              desc: "We'll call you to confirm project details."
            },
            {
              icon: <Mail className="w-6 h-6" />,
              title: "Proposal",
              desc: "Receive your custom solar engineering plan."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center group hover:border-brand-gold/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-brand-dark mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-teal transition-all group"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-brand-dark text-brand-dark rounded-full font-bold hover:bg-gray-50 transition-all group"
          >
            How Solar Works
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </InternalFormPageTemplate>
  );
};
