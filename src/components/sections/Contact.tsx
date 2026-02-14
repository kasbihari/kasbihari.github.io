import React, { useState } from 'react';
import { Mail, Send, MessageCircle, Github, Linkedin, Copy, Check, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kas.bihari@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
          Contact <span className="text-bordeaux/80">✦</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Linker kaart – e-mail */}
          <motion.div
            className="glass-card p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:border-bordeaux/50 hover:shadow-[0_0_30px_rgba(94,42,44,0.3)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-16 h-16 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-body text-2xl font-medium text-white mb-2">
              Send me an email
            </h3>
            <p className="text-white/60 mb-6">
              I'm always open for new projects and collaborations.
            </p>
            
            {/* E-mail met kopieerfunctie */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white/80 font-mono text-sm">kas.bihari@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="relative p-2 glass rounded-full hover:bg-bordeaux/20 transition-colors"
                aria-label="Copy email"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white/60" />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs glass px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            <a
              href="mailto:kas.bihari@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg text-white hover:text-bordeaux transition-colors"
            >
              <Send size={18} />
              <span>Send Email</span>
            </a>
          </motion.div>

          {/* Rechter kaart – contactgegevens */}
          <motion.div
            className="glass-card p-8 flex flex-col h-full transition-all duration-300 hover:border-bordeaux/50 hover:shadow-[0_0_30px_rgba(94,42,44,0.3)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <strong className="font-body text-xl text-white">Let's build</strong>
                <p className="text-white/60 text-sm">
                  Open for freelance & collaborations.
                </p>
              </div>
            </div>

            <hr className="border-white/10 my-4" />

            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-bordeaux/70" />
                <a
                  href="mailto:kas.bihari@gmail.com"
                  className="hover:text-bordeaux transition-colors"
                >
                  kas.bihari@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Github size={18} className="text-bordeaux/70" />
                <a
                  href="https://github.com/kasbihari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bordeaux transition-colors"
                >
                  github.com/kasbihari
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin size={18} className="text-bordeaux/70" />
                <a
                  href="https://www.linkedin.com/in/krishna-b-098124339/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bordeaux transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* Social media iconen extra */}
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="https://github.com/kasbihari"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-bordeaux/20 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-b-098124339/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-bordeaux/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Fun fact box – full width onder de twee kolommen */}
        <motion.div
          className="glass-card p-6 w-full transition-all duration-300 hover:border-bordeaux/50 hover:shadow-[0_0_30px_rgba(94,42,44,0.3)]"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux flex-shrink-0">
              <Coffee size={24} />
            </div>
            <div>
              <h3 className="font-body text-xl font-medium text-white">Fun fact</h3>
              <p className="text-white/70">
                I speak three languages (Dutch, English, Spanish) and I'm learning a fourth – 
                because great communication builds great products.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;