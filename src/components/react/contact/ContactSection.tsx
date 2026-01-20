import { Mail, Github, Linkedin } from 'lucide-react';
import '../../../styles/contact.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contactSection">
      <div className="contactContainer">
        <div className="contactHeader">
          <h2 className="contactTitle">Let's Connect</h2>
          <p className="contactSubtitle">
            Available for collaborations and interesting opportunities
          </p>
        </div>

        <div className="contactCard">
          <div className="contactIcon">
            <Mail size={24} />
          </div>
          <h3>Get in Touch</h3>
          <p>
            Have a project in mind or just want to say hello? 
            I'd love to hear from you.
          </p>
          <a href="mailto:hello@krishnabihari.com" className="contactEmail">
            <Mail size={18} />
            hello@krishnabihari.com
          </a>
        </div>

        <div className="contactLinks">
          <a 
            href="https://github.com/kasbihari" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contactLink"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://linkedin.com/in/krishna-bihari" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contactLink"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
