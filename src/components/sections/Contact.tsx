import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="section-container-centered">
      <div className="content-card max-w-md text-center">
        <h2 className="font-body text-4xl md:text-5xl font-medium mb-4 text-white">
          Let's Connect
        </h2>
        <p className="text-white/60 mb-8">
          Have a project in mind? I'd love to hear about it.
        </p>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-body text-2xl text-white mb-2">Message Sent!</h3>
            <p className="text-white/60">I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/70">Name</Label>
              <Input 
                type="text" 
                id="name" 
                placeholder="Your name"
                required
                className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30 focus:border-bordeaux focus:ring-bordeaux/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@example.com"
                required
                className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30 focus:border-bordeaux focus:ring-bordeaux/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/70">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell me about your project..."
                rows={4}
                required
                className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30 focus:border-bordeaux focus:ring-bordeaux/20"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-bordeaux hover:bg-bordeaux-light text-white border-none py-6 text-lg transition-all duration-300"
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;