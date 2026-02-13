import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out. (Demo)');
  };

  return (
    <section className="section-container max-w-2xl">
      <h2 className="font-body text-5xl font-medium mb-8 text-white">Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/70">Name</Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="Your name"
            className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/70">Email</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="you@example.com"
            className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white/70">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Your message..."
            rows={4}
            className="bg-anthracite/50 border-white/20 text-white placeholder:text-white/30"
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-bordeaux hover:bg-bordeaux/80 text-white border-none"
        >
          Send Message
        </Button>
      </form>
    </section>
  );
};

export default Contact;