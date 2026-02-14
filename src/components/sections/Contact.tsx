import React from 'react';
import { Mail, Send, MessageCircle, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="section-container-centered scrollable-section">
      <div className="w-full max-w-5xl">
        <h2 className="font-body text-4xl md:text-5xl font-medium mb-10 text-white text-center">
          Contact <span className="text-bordeaux/80">✦</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linker kaart – e-mail */}
          <div className="glass-card p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:border-bordeaux/50">
            <div className="w-16 h-16 rounded-full bg-bordeaux/20 flex items-center justify-center text-bordeaux mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-body text-2xl font-medium text-white mb-2">
              Send me an email
            </h3>
            <p className="text-white/60 mb-6">
              I'm always open for new projects and collaborations.
            </p>
            <a
              href="mailto:kas.bihari@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg text-white hover:text-bordeaux transition-colors"
            >
              <Send size={18} />
              <span>Send Email</span>
            </a>
          </div>

          {/* Rechter kaart – contactgegevens */}
          <div className="glass-card p-8 flex flex-col h-full transition-all duration-300 hover:border-bordeaux/50">
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
          </div>
        </div>

        {/* Extra ruimte onderaan */}
        <div className="h-8" />
      </div>
    </section>
  );
};

export default Contact;